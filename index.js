//link to creation
const generateHTML = require('./src/generateHTML');

// profiles
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

//node modules
const fs =require('fs');
const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');
const Employee = require('./lib/Employee');

//team array
const teamArray = [];


//start of manager prompts
const addManager = () => {
    return inquirer.prompt ([{
        type:'input',
        name:'name',
        message: "who is the manager of the team?",
        validate:nameInput =>{
            if(nameInput){
                return true;
            }else{
                console.log("Please enter the manager's name.");
                return false;
            }
        }
    },
    {
        type:'input',
        name:'id',
        message: "Enter the manager's ID please.",
        validate:nameInput =>{
            if(isNaN(nameInput)){
               console.log("Please enter the manager's ID.")
                return false;
            }  else{
                return true;
            }
    }
},
{
    type:'input',
    name:'email',
    message: "Please enter the manager's email.",
    validate:email =>{
        valid = /^w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if(valid){
            return true;
        }else{
            console.log("Please enter an email");
            return false;
        }
}
},
{
    type:'input',
    name:'officeNumber',
    message:"Please enter the manager's office number",
    validate: nameInput=>{
        if (isNaN(nameInput)){
            console.log('Please enter an office number.')
            return false;
        }else{
            return true;
        }
    }
}])
.then(managerInput=>{
    const {name, id, email, officeNumber} =managerInput;
    const manager = new Manager (name, id, email, officeNumber);

    teamArray.push(manager);
    console.log(manager);
})
};
const addEmployee = () => {
    console.log(`
    ================
    Adding empolyees to the team
    ================
    `);
}
return inquirer.prompt([{
    type:'list',
    name:'role',
    message:"Please choose employee's role",
    Choices:['Engineer', 'Intern']
},
{
    type:'input',
    name:'name',
    message:"What's the employees name?:",
    validate:nameInput=>{
        if(nameInput){
            return true;
        }else{
            console.log ("Please enter employee's name");
            return false;
        }
    }
},
{
    type:'input',
    name:'id',
    message:"please enter the employee's ID.",
    validate: nameInput =>{
        if (isNaN(nameInput)){
            console.log("Please enter Employee ID")
            return false;
        }else{
            return true;
        }
    }
},
{
    type:'input',
    name:'email',
    message: "Please enter the employee's email.",
    validate:email =>{
        valid = /^w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if(valid){
            return true;
        }else{
            console.log("Please enter an email");
            return false;
        }
    }
}, 
{
    type:'input',
    name:'school',
    message:"Please enter the intern's school",
    when: (input) => input.role === "Intern",
    validate: nameInput => {
        if(nameInput){
            return true;
        }else{
            console.log ("Please enter the intern's school")
        }
    }
},

{
    type:'input',
    name:'github',
    message: "Please enter the employee's github username.",
    when: (input) => input.role === "Engineer",
    validate: nameInput => {
        if(nameInput){
            return true;
        }else{
            console.log ("Please enter the employee's github username")
        }
    }
},
{
    type:'confirm',
    name:'confirmAddEmployee',
    message:'Would you like to add more team members?',
    default:false
}
])
.then(employeeData => {
    //data for types

    let{name, id, role, github, school, confirmAddEmployee} = employeeData;
    let employee;

    if (role === "Engineer") {
        employee = new Engineer (name, id, email, github);

        console.log(employee);
    }else if (role === "Intern"){
        employee = new Intern (name, id, email, school);
        console.log(employee);
    }
    teamArray.push(employee);

    if (confirmAddEmployee){
        return addEmployee(teamArray);
    }else {
        return teamArray;
        }
    })
}; 

//function to generate HTML page file using file system
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        //if there's no error
        if(err) {
            console.log(err);
            return;
        //when profile has been created
        } else {
            console.log("Your team profile has been successfully created! Please check out the index.html")
        }
    })
};

addManager()
    .then(addEmployee)
    .then(teamArray => {
        return generateHTML(teamArray);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err=> {
        console.log(err);
    });