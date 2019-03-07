//Globals - do I even need globals? gonna try without...
// var startText = document.getElementById("start-text");
// var wins = document.getElementById("wins");
// var losses = document.getElementById("losses");
// var puzzle = document.getElementById("puzzle");
// var tTL = document.getElementById("ttl");
// var tries = document.getElementById("guesses");

var wordGame = {
    startText: document.getElementById("start-text"),
    wins: document.getElementById("wins"),
    losses: document.getElementById("losses"),
    puzzle: document.getElementById("puzzle"),
    tTL: document.getElementById("ttl"),
    tries: "",
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
    gameOn: false,
    inPlay: "",

    ChooseMonster() {
        var spacerArray = [];
        this.gameOn = true;
        // change startText to "-Good Luck!-"
        this.startText = "-Good Luck! Choose a letter-";
        // get a random member of the monsters array
        var rand = this.monsters[Math.floor(Math.random() * this.monsters.length)];
        // build spacerArray with this.spacer from monsters[random].length
        var strLen = rand.length
        for (i = 0; i < strLen; i++) {
            spacerArray.push(this.spacer);
        }
        // display spacerArray to puzzle
        this.puzzle = spacerArray;
        // set this.tTL to 3*monsters[rand].length
        this.tTL = strLen * 3;
        this.inPlay = rand.toUpperCase();
        console.log(this.gameOn);
        console.log(this.puzzle);
        console.log(this.inPlay);
        console.log(this.tTL);
        console.log(this.tries);
    },

    Guess(letter) {
        checkIndex = this.inPlay.indexOf(letter);
        // test whether letter is in inPlay
        if (checkIndex !== -1) {
            // if yes, replace this.puzzle[inPlay.indexOf(letter)] with letter
            puzzle[checkIndex] = letter;
        }
        // if this.puzzle.includes(spacer) === false call this.YouWin()
        if (this.puzzle.includes(this.spacer) === false) {
            this.YouWin();
        }
        // decrement this.tTL
        this.tTL--;
        this.tries = document.getElementById("guesses");

        // if this.tTL === 0, call this.YouLose()
        // could be done outside of object in a for loop, but that would remove a lot of the point of making this an object
        if (this.tTL === 0) {
            this.YouLose();
        }
    },

    HandleInput(keyPress) {
        // test whether game has started, calls this.ChooseMonster() if not
        if (this.gameOn === false) {
            this.ChooseMonster();
        }
        // test whether keyPress is a letter and has not been guessed yet
        else if (/[a-z]/i.test(keyPress) && this.tries.indexOf(keyPress) === -1) {
            // if yes this.guess(keyPress)
            this.Guess(keyPress.toUpperCase());
        }
    },

    YouLose() {
        // increment losses
        this.losses++;
        // change startText to "-You lose! Choose a letter to try again-"
        this.startText = "-You lose! Press a key to try again-";
    },

    YouWin() {
        // increment wins
        this.wins++;
        // change startText to "-You win! Choose a letter to play again-"
        this.startText = "-You win! Choose a letter to play again-"
    }
};

document.onkeyup = function (event) {
    wordGame.HandleInput(event.key);
}