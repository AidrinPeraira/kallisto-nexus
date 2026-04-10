# Developer Notes

> This file is used to document architectural decisions, ideas, discussions, and known issues.
> Always include **Author** and **Date** for every entry.

---

## Architecture Decisions

- Aidrin | 05/04/2026
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
  - Refactor user module based on actions — needs discussion.

- Aidrin | 10/04/2026
  - What are the final list of enums for project type and project scope?

---

## Ideas

- Aidrin | 05/04/2026
  - Portfolio: manual creation + auto-import from Projects module via events.
  - Search / Discovery feature for providers.

---

## Known Issues

- Aidrin | 07/04/2026
  - Adding a service provider currently updates existing SP
    - Should this be prevented?

---

## Notes / Observations

- General: Aidrin | 05/04/2026
  - Configure database to store data in Firebase Postgres DB.
  - Set up domain in resend.com to use the business domain for emails.
  - Reconfigure Postgres with a strong password (change the default).
  - Add DB fields to handle blocking of users on login and session verification.

- Future Considerations: Aidrin | 05/04/2026
  - Data backup strategy
  - Testing (unit, integration, e2e)
  - CI/CD pipeline

- ToDo: Aidrin | 08/04/2026
  - Banking details update from payment module to bridge module
  - get profile details SP
  - addmin user mangement
  - admin SP management
  - portfolio edit
  - portfolio listing
  - portflio matching
  - SA Onboarding
  - Is SP Type in onboarding redundant with user role already checking type?
  - SP id taken in onboarding is redundant for ord identity
  - Refactor to not use db id in sp onboarding queries. use sp code
  - token expiration is returning 500 error. NEED IMMEDIATE CHANGE.

---
