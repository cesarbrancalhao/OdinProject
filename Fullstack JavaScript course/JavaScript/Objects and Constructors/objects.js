/*---*/     // <- these are for visual facilitation only

/*
    Basics of using objects to store and retrieve data
*/

const myObject = {
    property: 'Value!',
    otherProperty: 77,
    "obnoxious property": () => {
        // do stuff!
    }
};

// dot notation
myObject.property; // 'Value!'

// bracket notation
myObject["obnoxious property"]; // [Function]

// dot notation is usually preferred, but:

const variable = 'property';

myObject.variable; // this gives us 'undefined' because it's looking for a property named 'variable' in our object

myObject[variable]; // this is equivalent to myObject['property'] and returns 'Value!'


/*---*/

/*
    Objects as a design pattern
*/

const playerOneName = "tim";
const playerTwoName = "jenn";
const playerOneMarker = "X";
const playerTwoMarker = "O";

console.log(playerOneName);
console.log(playerTwoName);

// ^ instead of doing this, do the following:

const playerOne = {
    name: "tim",
    marker: "X"
};

const playerTwo = {
    name: "jenn",
    marker: "O"
};

// now you can simplify every console.log() call as

function printName(player) {
    console.log(player.name);
}

function gameOver(winningPlayer){
    console.log("Congratulations!");
    console.log(winningPlayer.name + " is the winner!");
}


/*---*/

/*
    You can use object constructors instead of declaring multiple objects
*/

const player = new Player('steve', 'X');
console.log(player.name);

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.sayName = function() {
      console.log(this.name)
    };
  };
  
  const player1 = new Player('steve', 'X');
  const player2 = new Player('also steve', 'O');
  player1.sayName(); // logs 'steve'
  player2.sayName(); // logs 'also steve'


/*---*/

/*
    Exercise

        Write a constructor for making “Book” objects. We will revisit this in the project at the end of this lesson.
        Your book objects should have the book’s title, author, the number of pages,
        and whether or not you have read the book.

        Put a function into the constructor that can report the book info like so:

        theHobbit.info() = "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
*/

function Book(title, writer, author, pages, read) {

    this.title = title;
    this.writer = writer;
    this.author = author;
    this.pages = pages;
    this.read = read; // 'y' or 'n'

    this.info = () => {
        let readMsg = read.includes('y') ? 'already read' : 'not read yet';
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readMsg}.`;
    }

}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'n');

console.log(theHobbit.info());
