DROP DATABASE IF EXISTS employeeManager_db;
CREATE DATABASE employeeManager_db;

USE employeeManager_db;
CREATE TABLE departments (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL
);

USE employeeManager_db;
CREATE TABLE roles (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT,
FOREIGN KEY(department_id)
REFERENCES departments(id)
ON DELETE SET NULL
);

USE employeeManager_db;
CREATE TABLE employees (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY(manager_id) REFERENCES employees(id)
ON DELETE SET NULL
);