INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES ("John", "Smith", 1, 1), 
        ("Michaela", "Beardall", 2, 2),
        ("Frank", "Steward", 3, NULL),
        ("Ashlyn", "Bond", 4, 4),
        ("Nicole", "Forsyth", 5, 5),
        ("Justine", "Wadsworth", 6, 6),
        ("Centennia", "Brown", 7, 7),
        ("Brice", "Lipira", 8, 8),
        ("Kramer", "Just", 9, 9);

INSERT INTO role (title, salary, department_id)

VALUES ("Systems Engineer", 100000, 1), 
        ("Database Manager", 95000, 2, 1),
        ("Automation Engineer", 90000, 1),
        ("Accountant", "Bond", 75000, 2),
        ("HR Manager", "Forsyth", 5, 2);


INSERT INTO department (name) 

VALUES ("Engineering"),
        ("Administration");