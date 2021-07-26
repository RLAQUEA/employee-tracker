DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

CREATE TABLE employee (
id:INT AUTO_INCREMENT PRIMARY KEY,
first_name:VARCHAR(30),
last_name:VARCHAR(30), 
role_id:INT,
manager_id:INT
);

CREATE TABLE role (
id:INT AUTO_INCREMENT PRIMARY KEY, 
title:VARCHAR(30),
salary:DECIMAL,
department_id:INT
);

CREATE TABLE department (
  id:INT AUTO_INCREMENTPRIMARY KEY,
  name:VARCHAR(30) NOT NULL
);
