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
                addRoles();
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

function allDepartments() {

}

function addRoles() {

}

function allEmployees(){

}

function update() {

}