DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tutors CASCADE;
DROP TABLE IF EXISTS tutorsCourses CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS courseItems CASCADE;
DROP TABLE IF EXISTS courseRooms CASCADE;
DROP TABLE IF EXISTS courseRoomsMessages CASCADE;


CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  "firstName" VARCHAR(255) NOT NULL,
  "lastName" VARCHAR(255) NOT NULL,
  program VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  is_tutor BOOLEAN DEFAULT false
);

CREATE TABLE courseItems (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(4) NOT NULL,
  year INTEGER,
  description VARCHAR
);

CREATE TABLE courseRooms (
  id SERIAL PRIMARY KEY NOT NULL,
  courseItem_id INTEGER REFERENCES courseItems(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  participants INTEGER DEFAULT 0,
  last_activity TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  color_main VARCHAR(7),
  color_gradient VARCHAR(7)
);

CREATE TABLE courseRoomsMessages (
  id SERIAL PRIMARY KEY NOT NULL,
  course_id INTEGER REFERENCES courseRooms(id) ON DELETE CASCADE,
  sender_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  body TEXT,
  is_edited BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE tutors (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  course_list text[]
);

CREATE TABLE tutorsCourses (
  id SERIAL PRIMARY KEY NOT NULL,
  course_id INTEGER REFERENCES courseItems(id) ON DELETE CASCADE,
  tutor_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE programs (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

