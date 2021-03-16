DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

USE staff_db;

CREATE TABLE employee(
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR (30),
    role_id INTEGER,
    manager_id INTEGER
);

CREATE TABLE role(
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
);

CREATE TABLE department(
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);