-- Drop table "support" (since it has no foreign key references)
DROP TABLE IF EXISTS support;
-- Drop table "parent" (it references "student" table)
DROP TABLE IF EXISTS parent;
DROP TABLE IF EXISTS attendance_event;
DROP TABLE IF EXISTS attendance;
-- Drop table "student" (it references "class_room" table)
DROP TABLE IF EXISTS student;
-- Drop table "class_room" (it references "branch" table)
DROP TABLE IF EXISTS class_room;
-- Drop table "branch"
DROP TABLE IF EXISTS branch;
-- Drop table "account"
DROP TABLE IF EXISTS account;