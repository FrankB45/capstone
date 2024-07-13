\echo "Delete and recreate db?"
\prompt "Return to continue, or ctrl-c to quit" foo

DROP DATABASE IF EXISTS archshot;
CREATE DATABASE archshot;

\connect archshot;

\i archshot-schema.sql;
\i archshot-seed.sql;

\echo "Delete and recreate db_test?"
\prompt "Return to continue, or ctrl-c to quit" foo

DROP DATABASE IF EXISTS archshot_test;
CREATE DATABASE archshot_test;

\connect archshot_test;

\i archshot-schema.sql;
