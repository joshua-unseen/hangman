// Document interfaces seem to be easiest as globals.
var startText = document.getElementById("start-text");
var winsText = document.getElementById("wins");
var lossesText = document.getElementById("losses");
var puzzleText = document.getElementById("puzzle");
var tTLText = document.getElementById("ttl");
var triesText = document.getElementById("guesses");
var yaySnd = document.getElementById("yay");
var booSnd = document.getElementById("boo");

var wordGame = {
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
    gameOn: false,
    inPlay: "",
    workingString: "",
    timeToLive: 0,
    guesses: "",
    wins: 0,
    losses: 0,

    ChooseMonster() {
        if (this.monsters.length === 0) {   // Need a sanity check since I started removing answers
            startText.innerHTML = "-You've run through the whole list!  Reload the page to start again-";
        }
        else {
            this.gameOn = true;
            startText.innerHTML = "-Good Luck! Choose a letter-";
            // Pick a monster from the array:
            var rand = this.monsters[Math.floor(Math.random() * this.monsters.length)];
            var strLen = rand.length

            // Set up the blank string
            for (i = 0; i < strLen; i++) {
                this.workingString += "_";
            }

            // Initialize puzzle and guesses html
            puzzleText.innerHTML = this.ShowPuzzleText();
            // triesText.innerHTML = this.guesses;
            triesText.innerHTML = "&nbsp";

            // How many lives should we get?
            this.timeToLive = strLen + 5;
            tTLText.innerHTML = this.timeToLive;
            // Store the monster's name in upper case
            this.inPlay = rand.toUpperCase();
        }
    },

    ShowPuzzleText() {
        // Sets up the spaces between the blanks
        var tempString = this.workingString.charAt(0);
        for (i = 1; i < this.workingString.length; i++) {
            tempString += (" " + this.workingString.charAt(i));
        }
        return tempString;
    },

    Guess(letter) {
        // Finds all occurrences of the guessed char in the monster's name
        // and rebuilds the workingString with any new characters replacing one or more blanks
        var tempString = ""
        for (i = 0; i < this.inPlay.length; i++) {
            if (this.inPlay.charAt(i) === letter) {
                tempString += letter;
                yaySnd.play();
            }
            else {
                tempString += this.workingString.charAt(i);
            }
        }
        this.workingString = tempString;
        // Display the updated workingString
        puzzleText.innerHTML = this.ShowPuzzleText();

        if (this.inPlay.indexOf(letter) === -1) {
            // If the guess isn't in the solution, throw it in the discard pile
            this.guesses += (letter + " ");
            triesText.innerHTML = this.guesses;
            booSnd.play();
        }

        if (this.workingString === this.inPlay) {
            // A winner is you!
            this.YouWin();
        }
        else {
            // Lose a life...
            this.timeToLive--;
            tTLText.innerHTML = this.timeToLive;

            if (this.timeToLive === 0) {
                // Oh, you died.  Sad.
                this.YouLose();
            }
        }
    },

    HandleInput(keyPress) {
        // Starts the game or tests input validity
        if (this.gameOn === false) {
            this.ChooseMonster();
        }
        else if (keyPress.length === 1 &&   // Have I been given a single character?
            this.guesses.indexOf(keyPress) === -1 &&    // Has it already been played?
            this.workingString.indexOf(keyPress) === -1 &&  // Already played, continued.
            /[A-Z]/.test(keyPress)) {    //RegEx: is it a single A-Z char?
            this.Guess(keyPress);
        }
    },

    YouLose() {
        // increment losses
        this.losses++;
        lossesText.innerHTML = this.losses;
        // Be informative, web page!
        startText.innerHTML = "-You lose! Press a key to try again-";
        this.ResetGame();
    },

    YouWin() {
        // increment wins
        this.wins++;
        winsText.innerHTML = this.wins;
        startText.innerHTML = "-You win! Press a key to play again-"
        this.ResetGame();
    },
    ResetGame() {
        // knock almost everything back to initial values
        var resetMonsters = [];
        this.gameOn = false;
        this.workingString = "";
        this.timeToLive = 0;
        this.guesses = "";
        // take the current monster out of rotation until the page is reloaded.
        resetMonsters = this.monsters.splice(this.monsters.indexOf(this.inPlay.toLowerCase()), 1);
    }
};

document.onkeyup = function (event) {
    wordGame.HandleInput(event.key.toUpperCase());
}