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
                "+Departments",
                "+Roles",
                "+Employees",
                "Departments",
                "Roles",
                "Employees",
                "Update",
                "Done!"
            ]
        }]).then(result => {
        switch(result.userChoices) {
            case "+Departments":
                addDepartments();
                break;
            case "+Roles":
                addRoles();
                break;
            case "+Employees":
                addEmployees();
                break;
            case "Departments":
                allDepartments();
                break;
            case "Roles":
                allRoles();
                break;
            case "Employees":
                allEmployees();
                break;
            case "Update":
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

function allEmployees(){
   
}

function update() {

}