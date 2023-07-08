-- CREATE DATABASE loginreg_01;

-- CREATE TABLE users(
--   user_id uuid DEFAULT uuid_generate_v4(),
--   user_name VARCHAR(255) NOT NULL,
--   user_email VARCHAR(255) NOT NULL UNIQUE,
--   user_password VARCHAR(255) NOT NULL,
--   PRIMARY KEY(user_id)
-- );

-- CREATE TABLE todos(
--   todo_id SERIAL,
--   user_id UUID ,
--   description VARCHAR(255) NOT NULL,
--   PRIMARY KEY (todo_id),
--   FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );


-- INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');

CREATE DATABASE authtodolist2;

--users

CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);
   
--todos

CREATE TABLE todos(
  todo_id SERIAL,
  user_id UUID,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

--fake users data

insert into users (user_name, user_email, user_password) values ('Jacob', 'jacob@test.com', 'jacob');

insert into users (user_name, user_email, user_password) values ('Peter', 'peter@test.com', 'peter');

insert into users (user_name, user_email, user_password) values ('Henry', 'henry@test.com', 'henry');

--fake todos data

insert into todos (user_id, description) values ('eb5bdf51-6cba-432f-ba76-433120a3ba89', 'clean room');

insert into todos (user_id, description) values ('a5fdf424-1d16-4c19-8bc1-d7772832b85b', 'clean car');

insert into todos (user_id, description) values ('a5fdf424-1d16-4c19-8bc1-d7772832b85b', 'clean garage');