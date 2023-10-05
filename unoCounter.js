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


function newAddPlayer(){
    var name = document.getElementById("playerNameAdder").value;
    if(checkIfPlayerExists(name)){
        alert("Player " + name +" already exists!");
        return;
    }
    var player = new Player(name);
    players.push(player);
    document.getElementById("playerNameAdder").value = "";
}
function hideAddPlayer(){
    if(players.length == 0){
        alert("Please add atleast one player!");
        return;
    }
    document.getElementById("addPlayers").style.display = "none";
    document.getElementById("nextRoundButton").style.display = "block";
    document.getElementById("showResultsButton").style.display = "block";
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
    document.getElementById("scoreAdderName").innerHTML = "Adding Score for: " + ScorePlayer.getName();
}

function addScore(){
    addscore = document.getElementById("scoreInput").value;
    //alert(addscore);
    //check if player score is not below 0
    if(ScorePlayer.getScore() + parseInt(addscore) < 0){
        alert("Player score cannot be below 0!");
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