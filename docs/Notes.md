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

- Bridge: Aidrin | 06/04/2026
  - Added a service area sub table for joins
  - Initially, every provider entity has two fields for location:

    ```
    location geography(Point, 4326)   // where they are based
    serviceRadius float                // how far they travel
    ```

  - That single point + radius model works fine if a provider operates from one city with a uniform coverage circle. But the design doc specifies something more complicated:

    ```
    Current Location : City / Service Area
      - Primary Service City
      - Secondary Service Cities    ← plural
      - Service Radius
    ```

  - So a contractor might be based in Kochi, but also willing to take projects in Trivandrum and Kozhikode. Those are not covered by a single radius around one point — they are discrete, separate zones.

    ```
    ServiceArea
      ownerId → SP_Professional.id
      city = "Kochi"
      isPrimary = true
      centerPoint = geography(9.93, 76.26)
      radiusKm = 20

    ServiceArea
      ownerId → SP_Professional.id
      city = "Trivandrum"
      isPrimary = false
      centerPoint = geography(8.52, 76.93)
      radiusKm = 15
    ```

  - Now we can query this sub table first and then show the right SPs to the project owners

- Payments: Aidrin | 06/04/2026
  - Payment module will be responsible for account details
  - Other modules will only have a boolean to simplfy checking for account details
  - Use a synchronous internal API call for adding/updating bank details. This ensures the user gets immediate feedback if the data is invalid (e.g., wrong IFSC format).
  - Modules like Bridge or Hands will store a local "cached" snippet (e.g., is_verified: true, masked_acc: \*\*\*\*6789) updated via RabbitMQ events. This ensures the profile page loads even if the Payments service is offline.

- Hive (Projects): Aidrin | 06/04/2026
  - Hive will store master project data
  - Other modules will only have a small copy of what is needed

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

- Database: Aidrin | 07/04/2026
  - Now expertise and skills and types etc are fixed enums.
  - adding new ones will need a server restart.
  - OK for beta. Change for production. Make it tables that the admin can modify from.

---
