//link to creation
const generateHTML = require('./src/generateHTML');

// profiles
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

//node modules
const fs =require('fs');
const inquirer = require('inquirer');

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
    
    Adding empolyees to the team
    `);
}










//function to generate HTML page file using file system
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err =>{
        //if there's no error
        if(err){
            console.log(err);
            return;
        //when profile has been created
        }else {
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
    .catch(err=>{
        console.log(err);
    });