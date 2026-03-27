-- Run this in the Nhost Hasura SQL tab to create the leads table
-- Go to: Nhost Dashboard > Hasura > Data > SQL

CREATE TABLE IF NOT EXISTS cymru_leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  school TEXT DEFAULT '',
  plan_type TEXT DEFAULT 'pdf',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
