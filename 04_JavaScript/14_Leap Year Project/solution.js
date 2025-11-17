// Leap Year Checker with User Input

// Ask user for input
let year = prompt("Enter a year:");

// Convert input to number
year = Number(year);

// Check if the input is valid
if (isNaN(year) || year <= 0) {
  console.log("⚠️ Please enter a valid positive year.");
} else {
  // Leap year condition
  if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
    console.log(`${year} is a Leap Year ✅`);
  } else {
    console.log(`${year} is NOT a Leap Year ❌`);
  }
}
