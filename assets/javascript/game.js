//Globals - do I even need globals?
var startText = document.getElementById("start-text");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");
var puzzle = document.getElementById("puzzle");
var tTL = document.getElementById("ttl");
var tries = document.getElementById("guesses");

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
    spacer: "_ ",
    maxTries: 0,

    ChooseMonster() {
        // change startText to "-Good Luck!-"
        // get a random member of the monsters array
        // build spacerString with this.spacer from monsters[rand].length
        // display spacerString to puzzle
        // set this.maxTries to 3*monsters[rand].length
    },

    Guess(letter) {
        // test whether letter is in monsters[rand]
        // if yes, replace this.spacerString[monsters[rand].indexOf(letter)] with letter
        // if this.spacerString.indexOf(spacer) === -1 call this.YouWin()
        // decrement this.maxTries
        // if this.maxTries === 0, call this.YouLose()
        // could be done outside of object in a for loop, but that would remove a lot of the point of making this an object
    },

    HandleInput(keyPress) {
        // test whether game has started, calls this.ChooseMonster() if not
        // test whether keyPress is a letter
        // if yes this.guess(keyPress)
    },

    YouLose() {
        // increment losses
        // change startText to "-You lose! Choose a letter to try again-"
    },

    YouWin() {
        // increment wins
        // change startText to "-You win! Choose a letter to play again-"
    }
};