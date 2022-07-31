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
