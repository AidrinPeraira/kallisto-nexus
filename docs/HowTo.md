# How to instructions.

### 1. Creating Custom sequence for a new customCode field in a table

- Shell Command to create a tabgle for "customCode" counter:

  ```
  pnpm dlx prisma migrate dev --name new-migration-name --create-only
  ```

- This will creaate a new migration under `prisma/migrations` folder. Edit the latest migration file (`.sql`) file **_at the top_** and add the follwing create sequence command, to create a custom sequence used in the table.

  ```
  CREATE SEQUENCE IF NOT EXISTS custom_code_seq START WITH 1000;
  ```
