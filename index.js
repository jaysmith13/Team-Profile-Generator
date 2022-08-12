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
        message: "who is the manager of the team?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter the manager's name.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "Enter the manager's ID please.",
        validate: (idInput) => {
          if (isNaN(idInput)) {
            console.log("Please enter the manager's ID.");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the manager's email.",
        /*validate: (emailInput) => {
          valid = /^w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            emailInput
          );
          if (valid) {
            return true;
          } else {
            console.log("Please enter an email");
            return false;
          }
        },*/
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please enter the manager's office number",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log("Please enter an office number.");
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
    
    //Adding employees to the team
    
    `);
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Please choose employee's role",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What's the employees name?:",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter employee's name");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "id",
        message: "please enter the employee's ID.",
        validate: (idInput) => {
          if (isNaN(idInput)) {
            console.log("Please enter Employee ID");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "email",
        message: "Please enter the employee's email.",
        /*validate: (emailInput) => {
          valid = /^w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            emailInput
          );
          if (valid) {
            return true;
          } else {
            console.log("Please enter an email");
            return false;
          }
        },*/
      },
      {
        type: "input",
        name: "school",
        message: "Please enter the intern's school",
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
        message: "Please enter the employee's github username.",
        when: (input) => input.role === "Engineer",
        validate: (ghInput) => {
          if (ghInput) {
            return true;
          } else {
            console.log("Please enter the employee's github username");
          }
        },
      },
      {
        type: "confirm",
        name: "confirmAddEmployee",
        message: "Would you like to add more team members?",
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
