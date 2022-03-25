# Postgresql & PgAdmin powered by compose

## SQL-script
CREATE TABLE department (
dep_num INT GENERATED ALWAYS AS IDENTITY,
dep_name TEXT NOT NULL,
PRIMARY KEY(dep_num)
);

CREATE TABLE employee (
employee_id INT GENERATED ALWAYS AS IDENTITY,
dep_num INT NOT NULL,
employee_name TEXT NOT NULL,
PRIMARY KEY (employee_id), 
CONSTRAINT fk_department
	FOREIGN KEY(dep_num)
		REFERENCES department(dep_num)
);

CREATE TABLE project (
project_id INT GENERATED ALWAYS AS IDENTITY,
project_name TEXT NOT NULL,
project_leader TEXT NOT NULL,
project_budget INT NOT NULL,
PRIMARY KEY (project_id)
);


CREATE TABLE employee_project (
employee_id INT NOT NULL,
project_id INT NOT NULL,
CONSTRAINT fk_employee
	FOREIGN KEY(employee_id)
		REFERENCES employee(employee_id) ON DELETE CASCADE,
CONSTRAINT fk_project
	FOREIGN KEY(project_id)
		REFERENCES project(project_id) ON DELETE CASCADE,
hourly_rate INT NOT NULL,
PRIMARY KEY(employee_id, project_id)
);

INSERT INTO department(dep_name)
VALUES
	('IT'),
	('TESTING'),
	('DATABAS');

INSERT INTO employee(employee_name, dep_num)
VALUES 
	('Eriksson', 3),
	('Shirvani', 2),
 	('Hansson', 1),
 	('Jansson', 3),
	('Muller', 2),
 	('Larsson', 1),
 	('Olsson', 3),
 	('Perez', 2),
	('Torsson', 1);

INSERT INTO project(project_name, project_leader, project_budget)
VALUES
	('Booking-system',  'Smith', 100000),
	('HR-system',  'Bengtsson', 200000),
	('Accounting-system',  'Antonov', 300000);

INSERT INTO employee_project(employee_id, project_id, hourly_rate)
VALUES
	(1, 1, 600),
	(2, 1, 550),
	(3, 1, 450),
	(4, 2, 600),
	(5, 2, 575),
	(6, 2, 475),
	(7, 3, 625),
	(8, 3, 550),
	(9, 3, 450);

## Requirements:
* docker >= 17.12.0+
* docker-compose

## Quick Start
* Clone or download this repository
* Go inside of directory,  `cd compose-postgres`
* Run this command `docker-compose up -d`


## Environments
This Compose file contains the following environment variables:

* `POSTGRES_USER` the default value is **postgres**
* `POSTGRES_PASSWORD` the default value is **changeme**
* `PGADMIN_PORT` the default value is **5050**
* `PGADMIN_DEFAULT_EMAIL` the default value is **pgadmin4@pgadmin.org**
* `PGADMIN_DEFAULT_PASSWORD` the default value is **admin**

## Access to postgres: 
* `localhost:5432`
* **Username:** postgres (as a default)
* **Password:** changeme (as a default)

## Access to PgAdmin: 
* **URL:** `http://localhost:5050`
* **Username:** pgadmin4@pgadmin.org (as a default)
* **Password:** admin (as a default)

## Add a new server in PgAdmin:
* **Host name/address** `postgres`
* **Port** `5432`
* **Username** as `POSTGRES_USER`, by default: `postgres`
* **Password** as `POSTGRES_PASSWORD`, by default `changeme`