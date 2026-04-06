# Developer Notes

> This file is used to document architectural decisions, ideas, discussions, and known issues.
> Always include **Author** and **Date** for every entry.

---

## Architecture Decisions

- Aidrin | 05/04/2026
  - Move interfaces from domain to application — DTOs are breaking the flow.
  - Rename worker/labourer mismatch across the codebase.
  - Move notification/email service to a shared `packages` module — centralise instead of per-module.
  - Modify repositories to use a base repository to reduce code duplication.
  - Publish events with project data and user data for any future ML server that may need it.

---

## Open Questions

- Aidrin | 05/04/2026
  - Should sessions be kept alive indefinitely while the user remains active? Check better-auth docs.
  - Move resend notification service to packages — is it a common service or should it remain module-scoped?
  - Refactor user module based on actions — needs discussion.

---

## Ideas

- Aidrin | 05/04/2026
  - Set up email HTML templates for a proper UI.
  - Portfolio: manual creation + auto-import from Projects module via events.
  - Search / Discovery feature for providers.

---

## Known Issues

- Aidrin | 05/04/2026
  - When email is not verified, login fails with an internal server error message to the frontend. Revisit after polishing error handling.

---

## Notes / Observations

- Auth Module: Aidrin | 06/04/2024
  - Move resend notification service to packages (is it a common service, or should it be separate?)
  - Check auth middleware working with updated token type

- General: Aidrin | 05/04/2026
  - Add validation for all input data and throw corresponding errors. Recheck regex and move patterns to a common enum in shared.
  - Configure database to store data in Firebase Postgres DB.
  - Set up domain in resend.com to use the business domain for emails.
  - Convert backend to Docker containers for dev and prod separately. Add corresponding scripts to package.json.
  - Reconfigure Postgres with a strong password (change the default).
  - Add DB fields to handle blocking of users on login and session verification.
  - Migrate from hard delete to soft delete.
  - Improve custom error handling.

- Future Considerations: Aidrin | 05/04/2026
  - Data backup strategy
  - Testing (unit, integration, e2e)
  - CI/CD pipeline

---
