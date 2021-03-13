const connection = require("./db/connection");
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
                "Employee Role Update"
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
            case "Employee Role Update":
                update();
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
                console.log(answer);
            });
        })
    .then(() => mainList())

};

function addRoles() {
    prompt([
        {
            name: "title",
            message: "Please enter role title."
        }
    ]).then(res => {
        let name = res;
          console.log(name);
        })
    .then(() => mainList())
}

function addEmployees() {
    prompt([
        {
            name: "first_name",
            message: "Please enter employee's first name."
        },{
            name: "last_name",
            message: "Please enter employee's last name."
        },
    ]).then(result => {
        
        })
    
    .then(() => mainList())
}

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

function allEmployees(employee){
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

function update() {

};