const connection = require("./db/connection");
const { prompt } = require("inquirer");
const mysql = require("mysql2");
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

console.log("Let's have a look at the company's staff!")

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
                "Employee Update"
            ]
        }]).then(result => {
        switch(result.userChoices) {
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
            case "Employee Update":
                update();
        }
    })
}

function addDepartments() {

}

function addRoles() {

}

function addEmployees() {

}

function allDepartments(department) {
    var query_str = "SELECT department.id, department.name FROM department;";
    var query = connectMYSQL.query(query_str, function (err, rows, fields) {
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
    var query = connectMYSQL.query(query_str, function (err, rows, fields) {
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

function allEmployees(employee){
    var query_str = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee;";
    var query = connectMYSQL.query(query_str, function (err, rows, fields) {
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

function update() {

}