//link to creation
const generateHTML = require("./src/generateHTML");

// profiles
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//node modules
const fs = require("fs");
const inquirer = require("inquirer");
const Employee = require("./lib/Employee");

let teamArray = [];

//start of manager prompts
const addManager = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Who is the manager of the team?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please input the manager's name here.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Input the manager's ID here please.",
        validate: (idInput) => {
          if (isNaN(idInput)) {
            console.log("Please input the manager's ID.");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please input the manager's email here.",
        validate: (emailInput) => {
          valid = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;(
            emailInput
          );
          if (valid) {
            return true;
          } else {
            console.log("Please input an email");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please input the manager's office number here",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Please input an office number.");
            return false;
          } else {
            return true;
          }
        },
      },
    ])
    .then((managerInput) => {
      const { name, id, email, officeNumber } = managerInput;
      const manager = new Manager(name, id, email, officeNumber);

      teamArray.push(manager);
      console.log(manager);
    });
};
const addEmployee = () => {
  console.log(`
    
// Adding employees to the team
    
    `);
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Please choose employee's role.",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What's the name of the employee?:",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please input employee's name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "What's the employee's ID number?",
        validate: (idInput) => {
          if (isNaN(idInput)) {
            console.log("Please input the Employee's ID");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter a valid employee email.",
        validate: (emailInput) => {
          valid = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;(
            emailInput
          );
          if (valid) {
            return true;
          } else {
            console.log("Please enter a valid email for the employee.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "school",
        message: "Please enter the intern's school name",
        when: (input) => input.role === "Intern",
        validate: (schoolInput) => {
          if (schoolInput) {
            return true;
          } else {
            console.log("Please enter the intern's school");
          }
        },
      },

      {
        type: "input",
        name: "github",
        message: "Please input a valid employee github username here.",
        when: (input) => input.role === "Engineer",
        validate: (ghInput) => {
          if (ghInput) {
            return true;
          } else {
            console.log("Please input a valid employee github username");
          }
        },
      },
      {
        type: "confirm",
        name: "confirmAddEmployee",
        message: "Hello, would you like to input additional team members to the generator?",
        default: false,
      },
    ])
    .then((employeeData) => {
      //data for types

      let { name, id, role, email, github, school, confirmAddEmployee } = employeeData;
      let employee;

      if (role === "Engineer") {
        employee = new Engineer(name, id, email, github);

        console.log(employee);
      } else if (role === "Intern") {
        employee = new Intern(name, id, email, school);
        console.log(employee);
      }
      teamArray.push(employee);

      if (confirmAddEmployee) {
        return addEmployee(teamArray);
      } else {
        return teamArray;
      }
    });
};

//function to generate HTML page file using file system
const writeFile = (data) => {
  fs.writeFile("./dist/index.html", data, (err) => {
    //if there's no error
    if (err) {
      console.log(err);
      return;
      //when profile has been created
    } else {
      console.log(
        "Congradulations! You've completed your generator! Please move over to the index.html to check out your results!"
      );
    }
  });
};

addManager()
.then(addEmployee)
.then(teamArray => {
    console.log(teamArray);
        return generateHTML(teamArray);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err=> {
        console.log(err);
    });
