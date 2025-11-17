 // Target word and board setup
const word = "HELLO";
const board = document.getElementById("puzzle-board");
const message = document.getElementById("message");

// Shuffle helper → Fisher–Yates algorithm (fair shuffle)
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); 
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap letters
  }
}

// Build puzzle UI
function createPuzzle() {
  board.innerHTML = "";         // clear old board
  message.textContent = "";     // clear old message
  let letters = word.split(""); // turn word into array
  shuffle(letters);             // shuffle letters

  letters.forEach(l => {
    let tile = document.createElement("div");
    tile.textContent = l;       // show letter
    tile.className = "tile";    // style
    tile.draggable = true;      // make draggable
    board.appendChild(tile);    // add to board

    // Drag start → remember dragged tile
    tile.ondragstart = e => e.dataTransfer.setData("text", tile.textContent);

    // Allow drop here
    tile.ondragover = e => e.preventDefault();

    // Drop → swap letters
    tile.ondrop = e => {
      let dragged = e.dataTransfer.getData("text");
      let temp = tile.textContent;
      tile.textContent = dragged;
      // Find the dragged tile and restore its letter
      [...board.children].find(t => t !== tile && t.textContent === dragged).textContent = temp;

      // Check win → join letters and compare
      if ([...board.children].map(t => t.textContent).join("") === word) {
        message.textContent = "🎉 You solved it!";
      }
    };
  });
}

// Reset button → rebuild puzzle
document.getElementById("reset-btn").onclick = createPuzzle;

// Start game on load
createPuzzle();
