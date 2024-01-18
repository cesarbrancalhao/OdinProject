/*---*/

/**
    Every object has a prototype

    The prototype is another object which has attributes and functions
    
    The object inherits from the prototype (i.e. it can use its properties and functions)
*/


// Acessing a prototype:

Object.getPrototypeOf(player1) === Player.prototype; // returns true
Object.getPrototypeOf(player2) === Player.prototype; // returns true

/**
    The Player.prototype attribute's value is the prototype object,
    and every player has the .prototype of the constructor

    That means

    */ Object.getPrototypeOf(player1) === Object.getPrototypeOf(player2) /* = true
    
    Because the prototype comes from the constructor and is the same
    and available for every Player instance
*/


/*---*/

// Defining on prototype

Player.prototype.sayHello = () => {
    console.log("Hello, I'm a player!");
};

player1.sayHello(); // logs "Hello, I'm a player!"
player2.sayHello(); // logs "Hello, I'm a player!"

// You'll come across 'player1.[[prototype]]' sometimes


/*---*/

/**
	Prototypal inheritance

	Defining every property and function takes up a lot of memory, so you
	can define them in the prototype instead to save memory and time

	You also get all of your instances to inherit it

	Let’s now try to do the following:
*/

Object.getPrototypeOf(Player.prototype) === Object.prototype; // true

player1.valueOf(); // Output: Object { name: "steve", marker: "X", sayName: sayName() }
// Output may slightly differ based on the browser

// This is how you know 'valueof()' is defined in the prototype, not in the Player constructor:
player1.hasOwnProperty('valueOf'); // false
Object.prototype.hasOwnProperty('valueOf'); // true

/**
    The .valueOf() isnt part of the object nor the prototype, it's part of the Object.prototype
    and every prototype inherits from the Object.prototype by default
*/


/*---*/

/**
    Prototypal inheritance method

    we can use */ Object.setPrototypeOf() /* to set or mutate the prototype

	example:
 */

function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function() {
  console.log(`Hello, I'm ${this.name}!`);
};

function Player(name, marker) {s
  this.name = name;
  this.marker = marker;
}

Player.prototype.getMarker = function() {
  console.log(`My marker is '${this.marker}'`);
};

/** 
	Object.getPrototypeOf(Player.prototype) should
	return the value of "Person.prototype" instead
	of "Object.prototype"
*/

Object.getPrototypeOf(Player.prototype); // returns Object.prototype

// Now make `Player` objects inherit from `Person`
Object.setPrototypeOf(Player.prototype, Person.prototype);
Object.getPrototypeOf(Player.prototype); // returns Person.prototype

const player1 = new Player('steve', 'X');
const player2 = new Player('also steve', 'O');

player1.sayName(); // Hello, I'm steve!
player2.sayName(); // Hello, I'm also steve!

player1.getMarker(); // My marker is 'X'
player2.getMarker(); // My marker is 'O'

/**
	Object.setPrototypeOf() takes two arguments,
	the first is the inheriting object
	and the second is the object to inherit from

	Warning: 
	
	This doesnt work >> */ Player.prototype = Person.prototype /* <<

	It directly references Person.prototype, instread of copying it
	Directly referencing let you safely make changes later
*/