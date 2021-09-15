-- Clean up
DROP TABLE IF EXISTS counter_table;
DROP FUNCTION IF EXISTS increment_counter(); 

-- The objects being tested
CREATE TABLE counter_table(counter int);
CREATE FUNCTION increment_counter() RETURNS void AS 
$$
BEGIN
  INSERT INTO counter_table SELECT count(*) FROM counter_table;
END;
$$
LANGUAGE plpgsql;

-- Test script starts here
\set ECHO
\set QUIET 1
-- Turn off echo and keep things quiet.

-- Format the output for nice TAP.
\pset format unaligned
\pset tuples_only true
\pset pager

-- Revert all changes on failure.
\set ON_ERROR_ROLLBACK 1
\set ON_ERROR_STOP true
\set QUIET 1

-- Separate test scenario in its own transaction
BEGIN;
-- report 2 tests will be run
SELECT plan(2);
-- Test 1. Call increment function
SELECT lives_ok('SELECT increment_counter()','Call increment function');
-- Test 2. Test results
SELECT is( (SELECT ARRAY [COUNT(*), MAX(counter)]::text FROM counter_table), ARRAY [1, 0]::text,'Check first record');
-- Report finish
SELECT finish();
-- Rollback changes made by the test
ROLLBACK;
