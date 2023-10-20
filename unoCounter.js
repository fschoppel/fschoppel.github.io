class Player{
    constructor(name){
        this.name = name;
        this.score = 0;
    }
    getName(){
        return this.name;
    }
    getScore(){
        return this.score;
    }
    addToScore(amount){
        this.score = this.score + parseInt(amount);
    }
}

//GLOBAL VARIABLES:
var ScorePlayer;
var GlobalCnt = 0;

//create a array of players
var players = [];

//input VARs:
var addPlayerInput = document.getElementById("playerNameAdder");
var addScoreInput = document.getElementById("scoreInput");

//eventListener:
addPlayerInput.addEventListener ("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("addPlayerButton").click();
    }
});
addScoreInput.addEventListener ("keydown", function(event) {
    if (event.key === "Enter") {
        addScore();
    }
});
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'It looks like you have been editing something. '
                            + 'If you leave before saving, your changes will be lost.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});


function newAddPlayer(){
    var name = document.getElementById("playerNameAdder").value;
    if(checkIfPlayerExists(name)){
        alert("Player " + name +" already exists!");
        return;
    }
    if(name == ""){
        alert("Please enter a name!");
        return;
    }
    var player = new Player(name);
    players.push(player);
    document.getElementById("playerNameAdder").value = "";
    document.getElementById("currentPlayersHeading").innerHTML = "Players: ";
    document.getElementById("currentPlayers").innerHTML += "<li>" + name + "</li>";
}
function hideAddPlayer(){
    if(players.length == 0){
        alert("Please add atleast one player!");
        return;
    }
    document.getElementById("addPlayers").style.display = "none";
    document.getElementById("nextRoundButton").style.display = "block";
    document.getElementById("showResultsButton").style.display = "block";
    alert(players.length + " players added successfully!");
}

function checkIfPlayerExists(name){
    for(var i = 0; i < players.length; i++){
        if(players[i].getName() == name){
            return true;
        }
    }
    return false;
}

function nextPlayer(cnt){
    if(cnt == players.length){
        alert("score added for all players");
        GlobalCnt = 0;
        document.getElementById("round").style.display = "none";
        document.getElementById("scoreAdderName").innerHTML = "NIL";
        return 0;
    }
    else{
        return players[cnt];
    }
}

function addNewRound(){
    document.getElementById("round").style.display = "block";
    ScorePlayer = nextPlayer(GlobalCnt);
    document.getElementById("scoreInput").value = "";
    document.getElementById("scoreAdderName").innerHTML = "Player: " + ScorePlayer.getName();
}

function addScore(){
    addscore = document.getElementById("scoreInput").value;
    //alert(addscore);
    //check if player score is not below 0
    if(ScorePlayer.getScore() + parseInt(addscore) < 0){
        alert("Player score cannot be below 0!");
        return;
    }
    if(isNaN(parseInt(addscore))){
        alert("Please enter a valid number!");
        return;
    }
    ScorePlayer.addToScore(addscore);
    GlobalCnt++;
    if(nextPlayer(GlobalCnt) == 0){
        return 0;}
    ScorePlayer = nextPlayer(GlobalCnt);
    document.getElementById("scoreAdderName").innerHTML = "Adding Score for: " + ScorePlayer.getName();
    document.getElementById("scoreInput").value = "";
}




function showResults(){
    document.getElementById("showResultsButton").style.display = "none";
    document.getElementById("hideResultsButton").style.display = "block";
    var text = "";
    for(var i = 0; i < players.length; i++){
        text += players[i].getName() + ": " + players[i].getScore() + " Points" +"<br>";
    }
    document.getElementById("results").style.display = "block";
    document.getElementById("results").innerHTML = text; 
}
function hideResults(){
    document.getElementById("showResultsButton").style.display = "block";
    document.getElementById("hideResultsButton").style.display = "none";

    document.getElementById("results").style.display = "none";
}

