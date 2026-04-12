-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "supabase_vault";

-- Create Sequences
CREATE SEQUENCE IF NOT EXISTS "app_user_code_seq";
CREATE SEQUENCE IF NOT EXISTS "app_sab_code_seq";
CREATE SEQUENCE IF NOT EXISTS "app_sp_code_seq";
CREATE SEQUENCE IF NOT EXISTS "app_sah_code_seq";
