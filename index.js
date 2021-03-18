const { prompt } = require("inquirer");
const mysql2 = require("mysql2");
const mysql = require("mysql");
require("console.table");

const connectMYSQL = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "staff_db"
});

connectMYSQL.connect((err) => {
    if (err) throw err;
    mainList();
})
console.log("\n");
console.log("\n");
console.log("LET'S HAVE A LOOK AT THE COMPANY'S STAFF!");
console.log("\n");
console.log("\n");

function mainList() {
    prompt([{
        type: "list",
        name: "userChoices",
        message: "Select what you'd like to do:",
        choices: [
            "Add Departments",
            "Add Roles",
            "Add Employees",
            "See Departments",
            "See Roles",
            "See Employees",
            "Employee Role Update",
            "Quit"
        ]
    }]).then(result => {
        switch (result.userChoices) {
            case "Add Departments":
                addDepartments();
                break;
            case "Add Roles":
                addRoles();
                break;
            case "Add Employees":
                addEmployees();
                break;
            case "See Departments":
                allDepartments();
                break;
            case "See Roles":
                allRoles();
                break;
            case "See Employees":
                allEmployees();
                break;
            case "Employee Role Update":
                updateEmployee();
                break;
            case "Quit":
                process.exit();
        }
    })
}

function addDepartments() {
    prompt([
        {
            name: "department",
            type: "input",
            message: "Please enter department name."
        }
    ]).then((answer) => {
        const query_str = "INSERT INTO department (name) VALUES (?);";
        connectMYSQL.query(query_str, [answer.department], (err, res) => {
            if (err) throw err;
        });
    })
        .then(() => mainList())

};

function addRoles(roles) {
    let query_str = "SELECT department.id, department.name FROM department;";
    connectMYSQL.query(query_str, (err, res) => {
        if (err) throw err;
        let dptChoices = res.map(department => ({ name: department.name, value: department.id }));
        prompt([
            {
                name: "title",
                type: "input",
                message: "Please enter role's title name."
            }, {
                name: "salary",
                type: "input",
                message: "Please enter role's salary."
            }, {
                name: "departmentID",
                type: "list",
                message: "Please enter the department this role belongs to.",
                choices: dptChoices
            },

        ]).then((answer) => {
            const query_str = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?);";
            connectMYSQL.query(query_str, [answer.title, answer.salary, answer.departmentID], (err, res) => {
                if (err) throw err;
            });
        })
            .then(() => mainList())
    })

}

function addEmployees() {
    let query_str = "SELECT role.id, role.title, role.salary, role.department_id FROM role;";
    connectMYSQL.query(query_str, (err, res1) => {
        if (err) throw err;
        let roleChoice = res1.map(a => ({ name: a.title, value: a.id }));
        let query_str2 = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee;";
        connectMYSQL.query(query_str2, (err, res2) => {
            if (err) throw err;
            let managerChoice = res2.map(a => ({ name: a.first_name + " " + a.last_name, value: a.id }));
            prompt([
                {
                    name: "first_name",
                    message: "Please enter employee's first name."
                }, {
                    name: "last_name",
                    message: "Please enter employee's last name."
                }, {
                    name: "role_id",
                    type: "list",
                    message: "Please select the employee's role.",
                    choices: roleChoice
                }, {
                    name: "manager_id",
                    type: "list",
                    message: "Please select the employee's manager.",
                    choices: managerChoice
                }
            ]).then((answer) => {
                const query_str = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);";
                connectMYSQL.query(query_str, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
                    if (err) throw err;
                });

            })

                .then(() => mainList())
        });
    })
};

function allDepartments(department) {
    var query_str = "SELECT department.id, department.name FROM department;";
    var query = connectMYSQL.query(query_str, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            let department = rows;
            console.table("\n");
            console.table(department);
        }
        mainList();
    })
}

function allRoles(role) {
    var query_str = "SELECT role.id, role.title, role.salary, role.department_id FROM role;";
    var query = connectMYSQL.query(query_str, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            let role = rows;
            console.table("\n");
            console.table(role)

        }
        mainList();
    })
}

function allEmployees(employee) {
    var query_str = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee;";
    var query = connectMYSQL.query(query_str, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            let employee = rows;
            console.table("\n");
            console.table(employee)

        }
        mainList();
    })
}

function updateEmployee() {
    let query_str = "SELECT role.id, role.title, role.salary, role.department_id FROM role;";
    connectMYSQL.query(query_str, (err, res1) => {
        if (err) throw err;
        let roleChoice = res1.map(a => ({ name: a.title, value: a.id }));
        let query_str2 = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee;";
        connectMYSQL.query(query_str2, (err, res2) => {
            if (err) throw err;
            let employeeChoices = res2.map(a => ({ name: a.first_name + " " + a.last_name, value: a.id }));
            prompt([
                {
                    name: "employeeSelect",
                    type: "list",
                    message: "Please select the employee to update.",
                    choices: employeeChoices
                }, {
                    name: "roleSelect",
                    type: "list",
                    message: "Please select the new role selection.",
                    choices: roleChoice
                }
            ]).then((answer) => {
                const query_str = "UPDATE employee SET role_id = ? WHERE id = ?";
                connectMYSQL.query(query_str, [answer.employeeSelect, answer.roleSelect], (err, res) => {
                    if (err) throw err;
                });

            })

                .then(() => mainList())
        });
    })

}