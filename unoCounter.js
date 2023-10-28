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
class Game{
    constructor(){
        this.players = [];
        this.roundsPlayed = 0;
        this.highestRoundScore = 0;
    }
}

//GLOBAL VARIABLES:
var ScorePlayer;
var GlobalCnt = 0;
var RoundsPlayed = 0;
var HighestRoundScore = 0;
var HighestRoundPlayer = "NIL";

//GLOBAL FLAGS
var addingNewRoundFlag = false;

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
/* DISABLED FOR DEVELOPMENT PURPOSES
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'It looks like you have been editing something. '
                            + 'If you leave before saving, your changes will be lost.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});
*/

//Adding Players:
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
    document.getElementById("showLogButton").style.display = "block";
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


//Adding Scores:
function nextPlayer(cnt){
    if(cnt == players.length){
        refreshResults();
        alert("score added for all players");
        RoundsPlayed++;
        addingNewRoundFlag = false;
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
    addingNewRoundFlag = true;
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
    //check if input is a number
    if(isNaN(parseInt(addscore))){
        alert("Please enter a valid number!");
        return;
    }
    ScorePlayer.addToScore(addscore);
    //check if highest round score must be replaced
    if(addscore > HighestRoundScore){
        HighestRoundScore = addscore;
        HighestRoundPlayer = ScorePlayer.getName();
    }
    //add to log
    logAddPoints(RoundsPlayed+1, ScorePlayer.getName(), addscore, ScorePlayer.getScore());

    GlobalCnt++;
    if(nextPlayer(GlobalCnt) == 0){
        return 0;}
    ScorePlayer = nextPlayer(GlobalCnt);
    document.getElementById("scoreAdderName").innerHTML = "Adding Score for: " + ScorePlayer.getName();
    document.getElementById("scoreInput").value = "";
    refreshResults();
}



//Showing Results:
function showResults(){
    document.getElementById("showResultsButton").style.display = "none";
    document.getElementById("hideResultsButton").style.display = "block";
    document.getElementById("results").style.display = "block";

    showResultsArr = players.slice();
    showResultsArr.sort(function(a, b){return b.getScore() - a.getScore()});

    var text = "";
    for(var i = 0; i < showResultsArr.length; i++){
        text += "<li>" + showResultsArr[i].getName() + ": " + showResultsArr[i].getScore() + " Points" +"</li>";
    }
    document.getElementById("results").innerHTML = text;
}
function hideResults(){
    document.getElementById("showResultsButton").style.display = "block";
    document.getElementById("hideResultsButton").style.display = "none";
    document.getElementById("results").style.display = "none";
}
function refreshResults(){
    showResultsArr = players.slice();
    showResultsArr.sort(function(a, b){return b.getScore() - a.getScore()});

    var text = "";
    for(var i = 0; i < showResultsArr.length; i++){
        text += "<li>" + showResultsArr[i].getName() + ": " + showResultsArr[i].getScore() + " Points" +"</li>";
    }
    document.getElementById("results").innerHTML = text;
}



//Log:
function addLog(round, player, AddScore, TotalScore){
    document.getElementById("log").innerHTML += "<li>" + "Round: " + round + " | " + "Player: " + player + " | " + "Score Added: " + AddScore + " | " + "Total Score: " + TotalScore + "</li>";
}
function logAddPoints(round, player, AddScore, TotalScore){
    document.getElementById("log").innerHTML += "<li>" + "R" + round + ", added " + AddScore + " points for " + player + ", total: " + TotalScore + "</li>";
}
function logNextRound(round){
    document.getElementById("log").innerHTML += "<li>" + "Round " + round + "</li>";
}
function showLog(){
    document.getElementById("showLogButton").style.display = "none";
    document.getElementById("hideLogButton").style.display = "block";
    document.getElementById("log").style.display = "block";
}
function hideLog(){
    document.getElementById("showLogButton").style.display = "block";
    document.getElementById("hideLogButton").style.display = "none";
    document.getElementById("log").style.display = "none";
}




