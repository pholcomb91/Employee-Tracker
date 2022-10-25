INSERT INTO departments (dept_name)
VALUES  ("Sales"),
        ("Service"),
        ("Facilities");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales manager", 250000.00, 1),
        ("Facilities manager", 100000.00, 3),
        ("Service manager", 150000.00, 2),
        ("Salesman", 80000.00, 1),
        ("Service tech", 60000.00, 2),
        ("Service writer", 70000.00, 2),
        ("Sanitation engineer", 40000.00, 3);

INSERT INTO employees (first_name, last_name, role_id)
VALUES  ("John", "Pratt", 1),
        ("Barret", "Germundson", 4),
        ("Luke", "Flesch", 6),
        ("Robert", "Sisk", 1);
        