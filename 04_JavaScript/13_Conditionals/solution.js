/*
JavaScript Conditions Examples
*/

// If statement example
let age = 20;
if (age > 18) {
  console.log("You are an adult.");
}

// If-else statement example
let temperature = 35;
if (temperature > 30) {
  console.log("It's hot");
} else {
  console.log("It's not hot");
}

// Else-if ladder example
let score = 85;
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}

// Switch statement example
let day = 3;
switch(day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Invalid day");
}
