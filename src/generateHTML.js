//manager card

const generateManager = function(manager){
    return `
    <div class="col-4 mt-4">
        <div class ="card h-100">
        <div class="card-header">
        <h3>${manager.getName()}</h3>
        <h4>Manager</h4><i class ="material-icons">content_paste</i>
        </div>

        <div class="card-body">
            <p class="id">ID: ${manager.getId()}</p>
            <p class="email">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></p>
            <p class="office">Office Number:${manager.getOfficeNumber()}</p>
            </div>
        </div>
    </div>
    `;
}
//engineer card
const generateEngineer = function (engineer){
    return `
    <div class="col-4 mt-4">
        <div class="card h-100">
            <div class = "card-header">
                <h3>${engineer.name}</h3>
                <h4>Engineer</h4><i class ="material-icons">laptop_mac</i>
                 </div>

                 <div class="card-body">
                 <p class="id">ID: ${engineer.id}</p>
                 <p class="email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
                 <p class="github">Github: <a href="https://github.com/${engineer.github}">${engineer.github}</a></p>
                 </div>
             </div>
         </div>
    `
}


//Intern Card
const generateIntern = function (intern) {
return`
    <div class="col-4 mt-4">
        <div class ="card h-100">
        <div class="card-header">
        <h3>${intern.name}</h3>
        <h4>Intern</h4><i class ="material-icons">assignment_ind</i>
        </div>

        <div class="card-body">
            <p class="id">ID: ${intern.id}</p>
            <p class="email">Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
            <p class="school">School: ${intern.school}</p>
            </div>
        </div>
    </div>
    `
};
//push array
generateHTML = (data) =>{
    //cards array
    pageArray = [];

    for (let i = 0; i <data.length; i++){
        const employee = data[i];
        const role = employee.getRole();

        //call manager function
        if (role ==='Manager'){
            const managerCard = generateManager(employee);

            pageArray.push(managerCard);
        }

        if (role === 'Engineer') {
            
        }

        //call intern function
        if(role === 'Intern'){
            const internCard = generateIntern(employee);

            pageArray.push(internCard);
        }
        
    }
    //joining strings
    const employeeCards = pageArray.join('')

    //return to generated page
    const generateTeam = generateTeamPage(employeeCards);
    return generateTeam;
}

//generate html page
const generateTeamPage = function(employeeCards) {
    return`
<!Doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width-device-width, intial-scale=1.0">
    <title>Team Profile</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link rel="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="http://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baD1411NQApFmC26EwAOH8WgZ15MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel ="stylesheet">
</head>
<body>
  <header>
  <nav class="navbar" id="navbar">
            <span class ="navbar-brand mb-0 h1 w-100 text-center" id="navbar-text">Team Profile</span>
         </nav>
        </header>  
    <main>
    <div class="container">
            <div class ="row justify-content-center" id="team-cards">
                <!--Team Cards-->
                ${employeeCards}
             </div>
        </div>
    </main>
</body>

<script src="https://code.jquery-3.5.1.slim.min.js" integrity="sha384-Dfxdz2htPH01sSSs5nCTpuj/zy4c+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UKsdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATPz7JjHLkuOU7w704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</html>

`;
}
//export
module.exports =generateHTML;