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

---

### 2. Database Workflow — Local Postgres ↔ Supabase

We use **local Postgres for development** and **Supabase for production**. No manual `.env` editing needed — just use the right script.

#### Daily development (local Postgres)

```bash
# Make a schema change in schema.prisma, then:
pnpm db:migrate          # creates + applies migration to local DB

# Or, to write the SQL yourself before applying:
pnpm db:migrate:create-only   # creates migration file only, doesn't apply it
```

#### Deploy to production (Supabase)

```bash
pnpm db:deploy:prod      # applies all pending migrations to Supabase
```

> ⚠️ Never run `db:migrate` against Supabase. Always use `db:deploy:prod`.

#### Open Prisma Studio

```bash
pnpm db:studio           # local Postgres
pnpm db:studio:prod      # Supabase
```

#### Reset local database (wipes all data)

```bash
pnpm db:reset            # local only — will NOT touch Supabase
```

#### One-time setup — first time pointing Supabase at this repo

If Supabase has never been baselined (e.g. fresh project or migration history is out of sync):

```bash
pnpm db:baseline:prod    # run once, then never again
```

This tells Supabase "all existing migrations are already applied" so `db:deploy:prod` works cleanly.
