# Kallisto-Nexus: Folder Structure Guide

## 1. Overview

This file shows how the files and folders are organised. Make sure modules don't have cross dependencies.
Also for the DB. No cross joins between modules. Redundancy in tables is allowed
Try to keep all communication between modules event driven.

---

## 2. Folder & File Structure

```text
kallisto-nexus/
├── apps/
│   └── api/                    # The Runner (Presentation Entry Point)
│       ├── src/
│       │   ├── server.ts       # Boots the server
│       │   ├── app.ts          # Middleware, Global Error Handling
│       │   └── routes.ts       # Master Router (Mounts Module Routes)
│       └── package.json
├── packages/                   # Shared Infrastructure
│   ├── database/               # Single Source of Truth for Data Access
│   │   ├── prisma/schema.prisma
│   │   └── index.ts            # Exports instantiated Prisma Client
│   ├── event-bus/              # Internal Node.js EventEmitter
│   │   └── index.ts            # Pub/Sub logic for inter-module sync
│   └── common/                 # Shared DTOs, Errors, and Utils
└── src/
    └── modules/                # The 8 Core Business Domains
        ├── [module-name]/      # e.g., kallisto-hands
        │   ├── domain/         # Entities & Repository Interfaces (Pure TS)
        │   ├── application/    # Use Cases (Business Logic / MVP logic)
        │   ├── infrastructure/ # External Adapters (Prisma Repos, Controllers)
        │   │   ├── persistence/# Prisma implementations
        │   │   ├── http/       # Controllers & Express Routes
        │   │   └── subscribers/# Event Listeners for Redundancy
        │   ├── [name].module.ts# COMPOSITION ROOT (Manual DI)
        │   └── index.ts        # Public API / Exports
```

---

## 3. Manual Dependency Injection (The Glue)

Each module has a `[module].module.ts` file that acts as the **Composition Root**. It instantiates all classes and wires them together.

```typescript
// Example: src/modules/kallisto-hands/hands.module.ts

import { prisma } from "@kallisto/database";
import { eventBus } from "@kallisto/event-bus";
import { PrismaTaskRepo } from "./infrastructure/persistence/PrismaTaskRepo";
import { CreateTaskUseCase } from "./application/use-cases/CreateTask";
import { HandsController } from "./infrastructure/http/HandsController";

// 1. Adapters
const taskRepo = new PrismaTaskRepo(prisma);

// 2. Use Cases
const createTaskUseCase = new CreateTaskUseCase(taskRepo, eventBus);

// 3. Controller
const handsController = new HandsController(createTaskUseCase);

export { handsController, taskRepo };
```

---

## 4. Data Redundancy Strategy

To avoid joins, we replicate minimal data.

1.  **Module A (Basics)** changes a Project Title.
2.  **Basics** emits `PROJECT_UPDATED` via the `eventBus`.
3.  **Module B (Hands)** has a `BasicsSubscriber` listening for that event.
4.  **Hands** updates its local table `Hands_BasicsProjectCache` with the new title.

---

## 5. Development Workflow

1.  **Define the Schema:** Add namespaced models to `packages/database/prisma/schema.prisma`.
2.  **Define Domain:** Create Entities and Repository Interfaces.
3.  **Implement Logic:** Create Use Cases (migrate MVP code here).
4.  **Implement Repo:** Write the Prisma queries in the Infrastructure layer.
5.  **Wire it up:** Update the `.module.ts` file.
6.  **Expose:** Add the controller to the Master Router in `apps/api/src/routes.ts`.

---
