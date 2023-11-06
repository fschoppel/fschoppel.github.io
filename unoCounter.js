class Player{
    constructor(name){
        this.name = name;
        this.score = 0;
        this.addScore = 0;
        this.scoreSetFlag = false;
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
    setAddScore(amount){
        this.addScore = amount;
    }
    getAddScore(){
        return this.addScore;
    }
    resetaddScore(){
        this.addScore = 0;
    }
    setScoreSetFlag(flag){
        this.scoreSetFlag = flag;
    }
    getScoreSetFlag(){
        return this.scoreSetFlag;
    }
}
class Game{
    constructor(){
        this.roundsPlayed = 0;
        this.maxRounds = 2;
        this.highestRoundScore = 0;
        this.highestRoundPlayer = "";
        this.nextRoundFlag = false;
    }
    getRoundsPlayed(){
        return this.roundsPlayed;
    }
    increaseRoundsPlayed(){
        this.roundsPlayed++;
    }
    getMaxRounds(){
        return this.maxRounds;
    }
    setMaxRounds(amount){
        this.maxRounds = amount;
    }
    getHighestRoundScore(){
        return this.highestRoundScore;
    }
    getHighestRoundPlayer(){
        return this.highestRoundPlayer;
    }
    setHighestRoundScore(amount, name){
        this.highestRoundScore = amount;
        this.HighestRoundPlayer = name;
    }
    setNextRoundFlag(flag){
        this.nextRoundFlag = flag;
    }

}

//GLOBAL VARIABLES:
var ScorePlayer;
var GlobalCnt = 0;
var acutalGame = new Game();

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


/* DISABLED FOR DEVELOPMENT PURPOSES*/
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'It looks like you have been editing something. '
                            + 'If you leave before saving, your changes will be lost.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});


//Choosing Game Mode:
function startRounds(){
    var r = document.getElementById("numberOfRoundsInput").value;
    //check if input is a number
    if(isNaN(parseInt(r))){
        alert("Please enter a valid number!");
        return;
    }
    //check if value is not below 1
    if(r < 1){
        alert("Rounds must be atleast 1!");
        return;
    }
    //set max rounds
    acutalGame.setMaxRounds(parseInt(r));
    //hide game mode chooser
    document.getElementById("gameType").style.display = "none";
    document.getElementById("addPlayers").style.display = "block";
}
function startEndless(){
        //set max rounds
        acutalGame.setMaxRounds(parseInt(999));
        //hide game mode chooser
        document.getElementById("gameType").style.display = "none";
        document.getElementById("addPlayers").style.display = "block";
}


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
function startGame(){
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



function finishGame(){
    document.getElementById("nextRoundButton").style.display = "none";
    document.getElementById("lastRound").style.display = "none";
    alert("Game finished!");
    showResults();
}




//New Add Round:
function NewAddRound() {
    acutalGame.setNextRoundFlag(true);

    //hide all unsused Buttons
    document.getElementById("nextRoundButton").style.display = "none";
    document.getElementById("showResultsButton").style.display = "none";
    document.getElementById("showLogButton").style.display = "none";

    //create and show RoundNumber
    var RN = acutalGame.getRoundsPlayed()+1;
    document.getElementById("roundNumber").innerHTML = "Round " + RN;
    document.getElementById("roundNumber").style.display = "block";

    //show add Scores Button
    document.getElementById("addScoresButton").style.display = "block";
    

    for (var i = 0; i < players.length; i++) {
        f_player = players[i];
        createButtonWithHandler(f_player);
    }
}

function createButtonWithHandler(player) {
    var div = document.createElement("div");
    div.classList.add("NEWNewRound");

    var nameSpan = document.createElement("span");
    nameSpan.classList.add("NEWNewRoundName");
    nameSpan.textContent = player.getName();
    nameSpan.id = player.getName() + "NewRoundName";
    div.appendChild(nameSpan);

    var scoreSpan = document.createElement("span");
    scoreSpan.classList.add("NEWNewRoundScore");
    scoreSpan.textContent = "";
    scoreSpan.id = player.getName() + "NewRoundScore";
    div.appendChild(scoreSpan);

    var input = document.createElement("input");
    input.type = "number";
    input.id = "input" + player.getName();
    div.appendChild(input);

    var button = document.createElement("button");
    button.type = "button";
    button.textContent = "Add";
    button.id = player.getName() + "AddScoreButton";
    button.onclick = function () {
        addNewRoundScore(player);
    };

    // Event-Handler, um die Enter-Taste abzuhören und den Button zu klicken
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            // Überprüfen, ob die gedrückte Taste die Enter-Taste ist
            button.click(); // Button klicken
        }
    });

    div.appendChild(button);

    document.getElementById("newRound").appendChild(div);
    return div;
}

function addNewRoundScore(player) {
    val = document.getElementById("input" + player.getName()).value;
    if(isNaN(parseInt(val))){
        alert("Please enter a valid number!");
        return;
    }
    if(player.getScore() + parseInt(val) < 0){
        alert("Player score cannot be below 0!");
        return;
    }
    player.setAddScore(val);
    document.getElementById(player.getName() + "NewRoundScore").textContent = val;
    document.getElementById("input" + player.getName()).value = "";
    player.setScoreSetFlag(true);
    document.getElementById(player.getName() + "AddScoreButton").style.backgroundColor = "green";
}

function addScores() {
    //check if all scores are set by checking the flags
    for(var i = 0; i < players.length; i++){
        if(players[i].getScoreSetFlag() == false){
            alert("Please set all scores!");
            return;
        }
    }
    for(var i = 0; i < players.length; i++){
        players[i].addToScore(players[i].getAddScore());
        logAddPoints(acutalGame.getRoundsPlayed()+1, players[i].getName(), players[i].getAddScore(), players[i].getScore());
        players[i].resetaddScore();
    }
    //reset flags
    for(var i = 0; i < players.length; i++){
        players[i].setScoreSetFlag(false);
    }
    //show/hide elements
    document.getElementById("newRound").innerHTML = "";
    document.getElementById("addScoresButton").style.display = "none";
    document.getElementById("nextRoundButton").style.display = "block";
    document.getElementById("showResultsButton").style.display = "block";
    document.getElementById("showLogButton").style.display = "block";
    document.getElementById("roundNumber").style.display = "none";
    acutalGame.increaseRoundsPlayed();
    //check if it is last round
    if(acutalGame.getRoundsPlayed()+1 == acutalGame.getMaxRounds()){
        document.getElementById("lastRound").style.display = "block";
    }

    //check if game is finished
    if(acutalGame.getRoundsPlayed() == acutalGame.getMaxRounds()){
        finishGame();
        return 0;
    }
    acutalGame.setNextRoundFlag(false);
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
    document.getElementById("log").innerHTML += "<li>" + "R" + round + ", added " + AddScore + " for " + player + ", total: " + TotalScore + "</li>";
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




