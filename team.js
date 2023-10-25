class Member {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
}

class Team {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.members = [];
    }

/*methods to add and delete members*/
    addMember(member) {
        this.members.push(member);
    }

    deleteMember(member) {
        let index = this.members.indexOf(member);
        this.members.splice(index, 1);
    }
}

/* writing code to use classes in relation with HTML.. creating array of teams to be stored and use the data to draw to the DOM*/
let teams = [];
let teamId = 0;

/*instead of writing code to add event listener every time, I am creating a function to make it so that we do not have to identify document.getElementById each time*/
onClick('new-team', () => {
    teams.push(new Team(teamId++, getValue('new-team-name')));
    drawDOM();
});

/*takes an id and pass it through an action.. what will happen when we call the onClick function*/
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

/*used top down methodology to call getValue id*/
function getValue(id) {
    return document.getElementById(id).value;
}

/*iterates over teams array and builds tables for each one. clears out team div, iterates over the team, creates a team, deletes, and so on*/
function drawDOM() {
    let teamDiv = document.getElementById('teams');
    clearElement(teamDiv);
    for (team of teams) {
        let table = createTeamTable(team);
        let title = document.createElement('h2');
        title.innerHTML = team.name;
        title.appendChild(createDeleteTeamButton(team));
        teamDiv.appendChild(title);
        teamDiv.appendChild(table);
        for (member of team.members) {
            createMemberRow(team, table, member);
        }
    }
}

function createMemberRow(team, table, member) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.position;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteTeamButton(team, member));
}

function createDeleteRowButton(team, member) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onClick = () => {
        let index = team.members.indexOf(member);
        team.members.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteTeamButton(team) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Team';
    btn.onClick = () => {
        let index = teams.indexOf(team);
        teams.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewMemberButton(team) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onClick = () => {
        teams.members.push(new Member(getValue(`name-input-${team.id}`), getValue(`position-input-${team.id}`)));
        drawDOM();
    };
    return btn;
}

function createTeamTable(team) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let positionColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    positionColumn.innerHTML = 'Position';
    row.appendChild(nameColumn);
    row.appendChild(positionColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let positionTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${team.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let positionInput = document.createElement('input');
    positionInput.setAttribute('id', `position-input-${team.id}`);
    positionInput.setAttribute('type', 'text');
    positionInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(team);
    nameTh.appendChild(nameInput);
    positionTh.appendChild(positionInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(positionTh);
    formRow.appendChild(createTh); 
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

