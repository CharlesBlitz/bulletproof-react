/*
# Create todos table (single-tenant, no auth)

1. New Tables
- `todos`
  - `id` (uuid, primary key, generated automatically)
  - `title` (text, required, 1 to 500 characters)
  - `completed` (boolean, defaults to false)
  - `created_at` (timestamp, defaults to now)

2. Security
- Row Level Security is enabled on `todos`.
- `anon` and `authenticated` roles receive SELECT, INSERT, UPDATE and DELETE grants, because the app has no sign-in and all todos are shared.
- Policies allow the anon and authenticated roles to read, create, update and delete todos.

3. Notes
- Title length is enforced by the database so invalid rows cannot be saved even if the app is bypassed.
*/

CREATE TABLE IF NOT EXISTS todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 500),
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON todos TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_todos" ON todos;
CREATE POLICY "anon_select_todos" ON todos FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_todos" ON todos;
CREATE POLICY "anon_insert_todos" ON todos FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_todos" ON todos;
CREATE POLICY "anon_update_todos" ON todos FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_todos" ON todos;
CREATE POLICY "anon_delete_todos" ON todos FOR DELETE
  TO anon, authenticated USING (true);
