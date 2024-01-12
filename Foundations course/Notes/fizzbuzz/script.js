let answer = parseInt(prompt("Insira o número"));

for (let i = 1; i < answer; i++) {

    let fizz = i % 3 > 0;
    let buzz = i % 5 > 0;

    if (!fizz && !buzz) {
        console.log("Fizzbuzz");
    } else if (!fizz) {
        console.log("Fizz");
    } else if (!buzz) {
        console.log("Buzz")
    } else {
        console.log(i);
    }
}