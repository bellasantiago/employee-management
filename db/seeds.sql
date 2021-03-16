USE staff_db;

INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role ( title, salary, department_id)
VALUES ('Sales Manager', '90000', '1'), ('Sales', '45000', '1');

INSERT INTO employee (name, role_id, manager_id)
VALUES ('John Appleseed', 1, NULL), ('Mary Appleseed', 2, 1);