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
    and available for every Player instance.
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

