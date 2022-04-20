INSERT INTO departments (name)
VALUES
    ("UX/UI"),
    ("Software Engineering"),
    ("HR"),
    ("Legal")
;

INSERT INTO roles (title, salary, department_id)
VALUES
    ("UX Lead", 100000, 1),
    ("UI Lead", 100000, 1),
    ("Lead Engineer", 180000, 2),
    ("Software Engineer", 145000, 2),
    ("Human Resource Specialist", 60000, 3),
    ("Human Resource Assistant", 50000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, NULL),
    ("Timothy", "Keller", 2, 1),
    ("Paul", "Pak", 3, NULL),
    ("Jonah", "Poler", 4, 3),
    ("Scott", "Renner", 5, NULL),
    ("Malia", "Brown", 6, 5),
    ("Sarah", "Yeo", 7, NULL),
    ("Tom", "Allen", 8, 7);