const connection = require("./connection");
const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

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
        switch(userAnswers.userChoices) {
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
                employees();
                break;
            case "Update":
                update();
                break;
            default:
                quit();
        }
    })
}