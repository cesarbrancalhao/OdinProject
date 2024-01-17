/*---*/

/*
    Every object has a prototype

    The prototype is another object which has attributes and functions
    
    The object inherits from the prototype (i.e. it can use its properties and functions)
*/


// Acessing a prototype:

Object.getPrototypeOf(player1) === Player.prototype; // returns true
Object.getPrototypeOf(player2) === Player.prototype; // returns true

/*
    The Player.prototype attribute's value is the prototype object,
    and every player has the .prototype of the constructor

    That means

    */ Object.getPrototypeOf(player1) === Object.getPrototypeOf(player2) /* = true
    
    Because the prototype comes from the constructor and is the same
    for every Player instance.
*/