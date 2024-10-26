// Exercise 1

/* Flattening
Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.
let arrays = [[1, 2, 3], [4, 5], [6]]; */

// Solution
/*let arrays = [[1, 2, 3], [4, 5], [6]];
let FlattenedArray = arrays.reduce((acc, curr) => acc.concat(curr), []);
console.log(FlattenedArray); */

// Exercise 2
/* Your own loop
 Write a higher-order function loop that provides something like a for loop statement. It takes a value, a test function, an update function, and a body function. Each iteration, it first runs the test function on the current loop value and stops if that returns false. Then it calls the body function, giving it the current value. Finally, it calls the update function to create a new value and starts from the beginning.
 When defining the function, you can use a regular loop to do the actual looping.
loop(3, n => n > 0, n => n - 1, console.log);
 */

// Solution

/* function loop(value, test, update, body) {
  while (test(value)) {
    body(value);
    value = update(value);
  }
}

loop(3, n => n > 0, n => n - 1, console.log); */

// Exercise 3
/* Everything
Everything
Arrays also have an every method analogous to the some method. This method returns true when the given function returns true for every element in the array. In a way, some is a version of the || operator that acts on arrays, and every is like the && operator.

Implement every as a function that takes an array and a predicate function as parameters. Write two versions, one using a loop and one using the some method. */

// Solution; using a loop
/* function every(array, test) {
  for (let element of array) {
    if (!test(element)) {
      return false;
    }
  }
  return true;
}

console.log(every([1, 3, 5], n => n < 10)); // → true
console.log(every([2, 4, 16], n => n < 10)); // → false
console.log(every([], n => n < 10)); // → true
*/

// Solution; using the some method
/* function every(array, test) {
  return !array.some(element => !test(element));
}

console.log(every([1, 3, 5], n => n < 10)); // → true
console.log(every([2, 4, 16], n => n < 10)); // → false
console.log(every([], n => n < 10)); // → true
*/

// Exercise 4
/* Dominant writing direction
Write a function that computes the dominant writing direction in a string of text. Remember that each script object has a direction property that can be "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom). The dominant direction is the direction of a majority of the characters that have a script associated with them. The characterScript and countBy functions defined earlier in the chapter are probably useful here. */

// Solution
// Sample SCRIPTS array including Coptic script
const SCRIPTS = [
  { name: "Latin", ranges: [[65, 91], [97, 123]], direction: "ltr" },
  { name: "Arabic", ranges: [[1536, 1541], [1548, 1791]], direction: "rtl" },
  { name: "Coptic", ranges: [[994, 1008], [11392, 11508], [11513, 11520]], direction: "ltr", year: -200, living: false, link: "https://en.wikipedia.org/wiki/Coptic_alphabet" },
  
];

// Function to find the script of a character
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => code >= from && code < to)) {
      return script;
    }
  }
  return null;
}

// Main function to determine the dominant direction
function dominantDirection(text) {
  let counts = { ltr: 0, rtl: 0, ttb: 0 };

  for (let char of text) {
    let script = characterScript(char.codePointAt(0));
    if (script) {
      counts[script.direction] = (counts[script.direction] || 0) + 1;
    }
  }

  // Find the direction with the maximum count
  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
}

console.log(dominantDirection("Hello!")); // → ltr
console.log(dominantDirection("Hey, مساء الخير")); // → rtl
console.log(dominantDirection("Ϣⲓⲛⲁⲛⲉ")); // → ltr (Coptic characters)

