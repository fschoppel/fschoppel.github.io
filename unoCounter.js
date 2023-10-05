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

function addPlayer(){
     // Get the form element by its ID
     var formElement = document.getElementById("nameForm");

     // Get the input field element by its name
     var inputElement = formElement.elements["fname"];
 
     // Get the value entered by the user
     var name = inputElement.value;

     if(checkIfPlayerExists(name)){
         alert("Player already exists");
         return;
     }

    var player = new Player(name);
    players.push(player);

}

function newAddPlayer(){
    var name = document.getElementById("playerNameAdder").value;
    if(checkIfPlayerExists(name)){
        alert("Player already exists");
        return;
    }
    var player = new Player(name);
    players.push(player);
}
function hideAddPlayer(){
    document.getElementById("addPlayers").style.display = "none";
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
        alert("no more players");
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
    document.getElementById("scoreAdderName").innerHTML = ScorePlayer.getName();
}

function addScore(){
    addscore = document.getElementById("scoreInput").value;
    //alert(addscore);
    ScorePlayer.addToScore(addscore);
    GlobalCnt++;
    if(nextPlayer(GlobalCnt) == 0){
        return 0;}
    ScorePlayer = nextPlayer(GlobalCnt);
    document.getElementById("scoreAdderName").innerHTML = ScorePlayer.getName();
}




function showResults(){
    document.getElementById("showResultsButton").style.display = "none";
    document.getElementById("hideResultsButton").style.display = "block";
    var text = "";
    for(var i = 0; i < players.length; i++){
        text += players[i].getName() + ", " + players[i].getScore() + " Points" +"<br>";
    }
    document.getElementById("results").style.display = "block";
    document.getElementById("results").innerHTML = text; 
}
function hideResults(){
    document.getElementById("showResultsButton").style.display = "block";
    document.getElementById("hideResultsButton").style.display = "none";

    document.getElementById("results").style.display = "none";
}