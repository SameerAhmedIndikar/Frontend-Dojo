let password;
const correctPassword = "12345"; // fixed password
let attempts = 0;
const maxAttempts = 3;

do {
  // ask user
  password = prompt("Enter your password:");
  attempts++;

  // check password
  if (password === correctPassword) {
    console.log("✅ Correct password! Access granted.");
    break;
  } else {
    console.log("❌ Wrong password. You have " + (maxAttempts - attempts) + " attempts left.");
  }

} while (attempts < maxAttempts);

// final message
if (password !== correctPassword) {
  console.log("⛔ Too many wrong attempts. Access denied.");
} else {
  console.log("🎉 Welcome to the system!");
}
