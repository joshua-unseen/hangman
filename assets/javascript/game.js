//Globals - do I even need globals? gonna try without...
//Looks like I do need 'em.
var startText = document.getElementById("start-text");
var winsText = document.getElementById("wins");
var lossesText = document.getElementById("losses");
var puzzleText = document.getElementById("puzzle");
var tTLText = document.getElementById("ttl");
var triesText = document.getElementById("guesses");

var wordGame = {
    // startText: document.getElementById("start-text"),
    // wins: document.getElementById("wins"),
    // losses: document.getElementById("losses"),
    // puzzle: document.getElementById("puzzle"),
    // tTL: document.getElementById("ttl"),
    // tries: "",
    monsters: [
        "dracula",
        "wolfman",
        "frankenstein",
        "mummy",
        "cthulhu",
        "terminator",
        "candyman",
        "freddy",
        "jason",
    ],
    // spacer: "_",
    gameOn: false,
    inPlay: "",
    workingString: "",
    timeToLive: 0,
    guesses: "",
    wins: 0,
    losses: 0,

    ChooseMonster() {
        this.gameOn = true;
        // change startText to "-Good Luck!-"
        startText.innerHTML = "-Good Luck! Choose a letter-";
        // get a random member of the monsters array
        var rand = this.monsters[Math.floor(Math.random() * this.monsters.length)];
        // build spacerArray with this.spacer from monsters[random].length
        var strLen = rand.length
        for (i = 0; i < strLen; i++) {
            this.workingString += "_";
        }
        // display spacerArray to puzzle
        puzzleText.innerHTML = this.ShowPuzzleText();
        triesText.innerHTML = this.guesses;

        // set this.tTL to 3*monsters[rand].length
        this.timeToLive = strLen * 2;
        tTLText.innerHTML = this.timeToLive;

        this.inPlay = rand.toUpperCase();

        console.log(this.gameOn);
        console.log(this.workingString);
        console.log(this.inPlay);
        console.log(this.timeToLive);
        console.log(this.guesses);
    },

    ShowPuzzleText() {
        var tempString = "";
        for (i=0; i < this.workingString.length; i++) {
            tempString += (this.workingString.charAt(i) + " ");
        }
        return tempString;
    },

    Guess(letter) {
        // simple indexOf() doesn't do double letters.  Gonna need a for{}
        var tempString = ""
        for (i = 0; i < this.inPlay.length; i++) {
            if (this.inPlay.charAt(i) === letter) {
                tempString += letter;
            }
            else {
                tempString += this.workingString.charAt(i);
            }
        }
        this.workingString = tempString;
        puzzleText.innerHTML = this.ShowPuzzleText();

        if (this.inPlay.indexOf(letter) === -1) {
            this.guesses += letter;
            triesText.innerHTML = this.guesses;
        }
        // if this.puzzle.includes(spacer) === false call this.YouWin()
        if (this.workingString === this.inPlay) {
            this.YouWin();
        }
        else {
            // decrement this.tTL
            this.timeToLive--;
            tTLText.innerHTML = this.timeToLive;

            // if this.tTL === 0, call this.YouLose()
            // could be done outside of object in a for loop, but that would remove a lot of the point of making this an object
            if (this.timeToLive === 0) {
                this.YouLose();
            }
        }
    },

    HandleInput(keyPress) {
        // test whether game has started, calls this.ChooseMonster() if not
        if (this.gameOn === false) {
            this.ChooseMonster();
        }
        // test whether keyPress is a letter and has not been guessed yet
        else if (/[A-Z]/.test(keyPress) && (this.guesses.indexOf(keyPress) === -1 && this.workingString.indexOf(keyPress) === -1)) {
            // if yes this.guess(keyPress)
            this.Guess(keyPress);
        }
    },

    YouLose() {
        // increment losses
        this.losses++;
        lossesText.innerHTML = this.losses;
        // change startText to "-You lose! Choose a letter to try again-"
        startText.innerHTML = "-You lose! Press a key to try again-";
        this.ResetGame();
    },

    YouWin() {
        // increment wins
        this.wins++;
        winsText.innerHTML = this.wins;
        // change startText to "-You win! Choose a letter to play again-"
        startText.innerHTML = "-You win! Press a key to play again-"
        this.ResetGame();
    },
    ResetGame() {
        this.gameOn = false;
        this.inPlay = "";
        this.workingString = "";
        this.timeToLive = 0;
        this.guesses = "";
    }
};

document.onkeyup = function (event) {
    wordGame.HandleInput(event.key.toUpperCase());
}