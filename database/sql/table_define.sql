-- Table: branch
CREATE TABLE branch (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  address VARCHAR NOT NULL UNIQUE
);

-- Table: class_room
CREATE TABLE class_room (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  branch_id INTEGER NOT NULL REFERENCES branch(id),
  CONSTRAINT unique_branch_id_name UNIQUE (branch_id, name)
);

CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR,
  role VARCHAR,
  branch_id INTEGER REFERENCES branch(id)
  confirmation VARCHAR
  -- Create a unique constraint on (id, branch_id) combination
  CONSTRAINT unique_id_branch UNIQUE (id, branch_id)
);

  -- Table: student
CREATE TABLE student (
  id SERIAL PRIMARY KEY,
  grade VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  enroll_date VARCHAR,
  dob VARCHAR,
  birth_year VARCHAR,
  sex VARCHAR,
  ethnic VARCHAR,
  birth_place VARCHAR,
  temp_res VARCHAR,
  perm_res_province VARCHAR,
  perm_res_district VARCHAR,
  perm_res_commune VARCHAR,
  class_room_id INTEGER NOT NULL REFERENCES class_room(id),
  CONSTRAINT unique_student_name_dob UNIQUE (first_name, last_name, dob)
);
-- Index: composite_key
CREATE INDEX composite_key ON student (first_name, last_name, dob);

-- Table: parent
CREATE TABLE parent (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES student(id),
  name VARCHAR,
  dob VARCHAR,
  sex VARCHAR,
  phone_number VARCHAR,
  zalo VARCHAR,
  occupation VARCHAR,
  landlord VARCHAR,
  roi VARCHAR,
  birthplace VARCHAR,
  res_registration VARCHAR,
  CONSTRAINT unique_student_id_name UNIQUE (student_id, name, sex)
);


  -- Table: support
  CREATE TABLE support (
    id SERIAL PRIMARY KEY,
    parent_name VARCHAR,
    student_name VARCHAR,
    phone_number VARCHAR,
    student_dob VARCHAR,
    student_grade VARCHAR,
    description VARCHAR
  );


CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  class_room_id INTEGER NOT NULL REFERENCES class_room(id),
  start_date VARCHAR NOT NULL,
  end_date VARCHAR NOT NULL,
  CONSTRAINT unique_attendance_classroom_time UNIQUE (class_room_id, start_date, end_date)
);

CREATE TABLE attendance_event (
  id SERIAL PRIMARY KEY,
  attendance_id INTEGER NOT NULL REFERENCES attendance(id),
  student_id INTEGER NOT NULL REFERENCES student(id),
  date VARCHAR NOT NULL,
  status VARCHAR NOT NULL,
  CONSTRAINT unique_attendance_event_student_status UNIQUE (attendance_id, student_id, date, status)
);
