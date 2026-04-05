# Kallisto Nexus: Backend APIs

## Description

Kallisto Nexus is a construction management and marketing super app backend designed to unify project owners, service providers, contractors, and logistics into a single platform.

The system is built as a **modular monolith** using **Clean Architecture**, ensuring scalability, maintainability, and a smooth transition to microservices in the future.

It follows an **event-driven architecture**, where independent modules communicate asynchronously while maintaining strict boundaries.

---

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Reference Docs](#reference-docs)
- [Git Flow](#git-flow)
- [Commit Guidelines](#commit-guidelines)
- [PR Guidelines](#pr-guidelines)
- [Issue Guidelines](#issue-guidelines)
- [Tests](#tests)
- [License](#license)

---

## Reference Docs

- Architecture: [Architecture.md](./docs/Architecture.md)
- Project Structure: [ProjectStructure.md](./docs/ProjectStructure.md)
- Features List: [Features.md](./docs/Features.md)
- Developer Notes: [Notes.md](./docs/Notes.md)
- How To: [HowTo.md](./docs/HowTo.md)
- API Reference: [API.md](./docs/API.md)

---

## Installation

### Prerequisites

- Node.js (LTS)
- pnpm
- PostgreSQL

### Steps

1. Clone the repository

```bash
git clone <repo-url>
cd kallisto-nexus
```

2. Install dependencies

```bash
pnpm install
```

3. Setup environment variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/kallisto"
```

4. Run database migrations

```bash
pnpm prisma migrate dev
```

5. Start the development server

```bash
pnpm dev
```

---

## Features

- Modular Monolith Architecture
- Clean Architecture (layered separation of concerns)
- Event-Driven Communication between modules
- Scalable and microservice-ready design
- Central orchestration via Hive module
- Workforce management (Hands)
- Procurement system (Hub)
- Logistics tracking (Wheels)
- Planning and design workflows (Basics)
- Landscaping module (Greens)
- Financial system (Payments)
- Service provider matchmaking (Bridge)

---

## Git Flow

1. Create Issue → `#12`
2. Create branch → `feature/12-worker-assignment` (include issue number)
3. Commit → `(refs #12)`
4. Create PR → `Closes #12`
5. Merge → Issue auto-closed

---

## Commit Guidelines

- Use clear and descriptive commit messages  
  Example:  
  `feat(hands): implement worker assignment logic (refs #12)`

- Use feature-based branching:
  - `feature/module-name`
  - `fix/module-name`

- Keep commits small and meaningful
- Ensure no cross-module coupling is introduced
- Maintain Clean Architecture boundaries

---

## PR Guidelines

- Every PR must be linked to an Issue  
  Use:
  - `Closes #<issue-number>` (for completion)
  - `Refs #<issue-number>` (for reference)

### Example

**Title**

```
[Hands] Implement worker assignment system
```

**Description**

```markdown
## Summary

Implements worker assignment logic based on:

- Availability
- Skill
- Location

## Changes

- Added assignment service in Hands module
- Created domain logic for worker selection
- Emitted assignment event after allocation

## Related Issue

Closes #12

## Notes

- Follows event-driven approach
- No direct coupling with other modules
```

---

## Issue Guidelines

```
Title: [module_name] Implement worker assignment system

Description:
Task Description
- Point 1
- Point 2

Constraints:
- Constraint 1
- Constraint 2

Acceptance Criteria:
- Criteria 1
- Criteria 2

Labels:
- module:module_name
- type:feature
```

---

## Tests

- Unit tests should cover core business logic (domain layer)
- Integration tests should validate module interactions via events
- Avoid testing implementation details — focus on behavior

_(To be expanded as testing setup evolves)_

---

## License

This repository belongs to Kallisto
