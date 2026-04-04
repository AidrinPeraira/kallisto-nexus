## 1. Summary

We are going to build a construction management and marketing super app to bring together all kinds of users. The parent system which encapsulates all features and modules will be called Kallisto-Nexus
The whole system is divided as follows. (this is the business logic)

## 2. Core Modules (Business Logic)

The ecosystem is partitioned into eight specialized modules, orchestrated by a central "brain."

| Module       | Purpose      | Key Responsibilities                                                                 |
| :----------- | :----------- | :----------------------------------------------------------------------------------- |
| **Hive**     | Orchestrator | The central intelligence and coordinator for all inter-module communication.         |
| **Hands**    | Execution    | Manages labor contractors and workers (both contract-based and daily wage).          |
| **Hub**      | Procurement  | Processes site requirements to purchase and dispatch materials from optimal sources. |
| **Wheels**   | Logistics    | Manages the vehicle fleet and all transportation/movement logistics.                 |
| **Basics**   | Planning     | Integrates freelancers and internal teams for design and technical planning.         |
| **Greens**   | Landscaping  | Dedicated module for exterior works and landscaping management.                      |
| **Payments** | Finance      | Centralized accounting and payment processing for the entire ecosystem.              |
| **Bridge**   | Matchmaking  | Connects project owners with service provider portfolios to initiate projects.       |

## 3. Workflow (Example)

- Imagine a owner. he wants to build a house. he opens the app. and searches for the right person. and initiates a request.
- The owner can chose from a list of service providers. Service providers are anyone who is responsible for a site. It can be registered firms, freelancing professionals and contractors who take up whole projects.
- Now Hive is going to get this request and it is going to send the info to Basics. Basics is going to talk with both the service provider the owner has selscted and also send a field to for site recon. If both the owner and the service provider agrees the service provider can do the part of the work they have agreed to do.
- For example: The owner chose a freelance architect. He has good design. He wiil do the design. Other aspects of the project will be taken over and implemented by the system. The freelancer may not know a good plumber. so we give the plumber. we plan schedule everything from BOQ to material purchase to quality control. This is done by Hands.
- Acording to the schedule when a stage is about to be completed hands will send a team to check the work and on updating the system will dispatch an order to hub for the materials for the next stage. and wheels will get it there.
- so on.

## 4. System Architecture

### 4.1 System Overview

![Kallisto System](./images/Kallisto%20System.svg)

### 4.2 App Diagram (Kallisto Nexus)

![Kallisto-Nexus App Diagram](./images/Kallisto-Nexus%20App%20Diagram.svg)

## 5. Technical Constraints & Architecture

To ensure long-term scalability and maintainability, the following technical mandates are in place:

- **Clean Architecture:** Each module must implement Clean Architecture principles to ensure business logic remains independent of external frameworks and extensible at any stage.
- **Modular Monolith:** The system will be built as a modular monolith. This provides the simplicity of a single codebase while maintaining strict boundaries, allowing any module to be refactored into a standalone microservice if required.
- **Event-Driven Communication:** All inter-module interactions must be asynchronous and event-driven to ensure loose coupling.
- **Database Isolation:** \* Each module must maintain its own dedicated tables or collections.
  - **Strict Rule:** No inter-module database joins are permitted. Data consistency must be managed via events.
