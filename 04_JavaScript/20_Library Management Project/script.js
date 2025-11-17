/**
 * Abstract base class representing a Person.
 * Demonstrates Abstraction by hiding implementation details.
 */
class Person {
  /**
   * Creates a Person instance.
   * @param {string} name - The name of the person.
   * @param {number} id - The unique ID of the person.
   */
  constructor(name, id) {
    if (this.constructor === Person) {
      throw new Error("❌ Person is abstract and cannot be instantiated directly!");
    }
    this.name = name;
    this.id = id;
  }
}

/**
 * Class representing a Book with encapsulation.
 */
class Book {
  #available; // Private field for availability

  /**
   * Creates a Book instance.
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   */
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.#available = true;
  }

  /**
   * Marks the book as borrowed.
   */
  borrow() {
    this.#available = false;
  }

  /**
   * Marks the book as returned.
   */
  returnBook() {
    this.#available = true;
  }

  /**
   * Checks if the book is available.
   * @returns {boolean} True if available, false otherwise.
   */
  get available() {
    return this.#available;
  }
}

/**
 * Base class for library members, inherits from Person.
 * Demonstrates Inheritance.
 */
class Member extends Person {
  #borrowedBooks; // Private field for borrowed books

  /**
   * Creates a Member instance.
   * @param {string} name - The name of the member.
   * @param {number} id - The unique ID of the member.
   */
  constructor(name, id) {
    super(name, id);
    this.#borrowedBooks = [];
  }

  /**
   * Allows the member to borrow a book.
   * @param {Book} book - The book to borrow.
   * @returns {string} Success or error message.
   */
  borrowBook(book) {
    if (!book.available) {
      return `❌ "${book.title}" is not available`;
    }
    if (this.#borrowedBooks.includes(book)) {
      return `❌ ${this.name} already has "${book.title}"`;
    }
    this.#borrowedBooks.push(book);
    book.borrow();
    return `${this.name} borrowed "${book.title}"`;
  }

  /**
   * Allows the member to return a book.
   * @param {Book} book - The book to return.
   * @returns {string} Success or error message.
   */
  returnBook(book) {
    const index = this.#borrowedBooks.indexOf(book);
    if (index === -1) {
      return `❌ ${this.name} does not have "${book.title}"`;
    }
    this.#borrowedBooks.splice(index, 1);
    book.returnBook();
    return `${this.name} returned "${book.title}"`;
  }

  /**
   * Gets the list of borrowed books.
   * @returns {Book[]} Array of borrowed books.
   */
  get borrowedBooks() {
    return [...this.#borrowedBooks];
  }
}

/**
 * Class representing a Student, inherits from Member.
 * Demonstrates Polymorphism through method overriding.
 */
class Student extends Member {
  /**
   * Overrides borrowBook to limit to 2 books.
   * @param {Book} book - The book to borrow.
   * @returns {string} Success or error message.
   */
  borrowBook(book) {
    if (this.borrowedBooks.length >= 2) {
      return `❌ ${this.name} cannot borrow more than 2 books`;
    }
    return super.borrowBook(book);
  }
}

/**
 * Class representing a Librarian, inherits from Member.
 * Demonstrates Polymorphism; librarians can borrow unlimited books.
 */
class Librarian extends Member {
  // Inherits borrowBook without override, allowing unlimited borrows
}

/**
 * Class representing the Library, encapsulates book management.
 */
class Library {
  #books; // Private field for books

  /**
   * Creates a Library instance.
   */
  constructor() {
    this.#books = [];
  }

  /**
   * Adds a book to the library.
   * @param {Book} book - The book to add.
   */
  addBook(book) {
    this.#books.push(book);
  }

  /**
   * Lists all books in the library.
   * @returns {string} Formatted list of books.
   */
  listBooks() {
    return this.#books.map(book =>
      `${book.title} by ${book.author} [${book.available ? "Available" : "Issued"}]`
    ).join("\n");
  }

  /**
   * Finds a book by title.
   * @param {string} title - The title to search for.
   * @returns {Book|null} The book if found, null otherwise.
   */
  findBook(title) {
    return this.#books.find(book => book.title === title) || null;
  }

  /**
   * Gets all books in the library.
   * @returns {Book[]} Array of all books.
   */
  get books() {
    return [...this.#books];
  }
}

// Global variables for interactive UI
let library = new Library();
let currentMember = null;

// Initialize library with books
function initializeLibrary() {
  const books = [
    new Book("The Hobbit", "J.R.R. Tolkien"),
    new Book("1984", "George Orwell"),
    new Book("Clean Code", "Robert C. Martin"),
    new Book("JavaScript: The Good Parts", "Douglas Crockford"),
    new Book("Eloquent JavaScript", "Marijn Haverbeke")
  ];
  books.forEach(book => library.addBook(book));
}

// Render available books
function renderAvailableBooks() {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  library.books.filter(book => book.available).forEach(book => {
    const li = document.createElement("li");
    li.textContent = `${book.title} by ${book.author}`;
    li.dataset.title = book.title;
    li.addEventListener("click", () => selectBook(book.title));
    bookList.appendChild(li);
  });
}

// Render borrowed books
function renderBorrowedBooks() {
  const borrowedList = document.getElementById("borrowedList");
  borrowedList.innerHTML = "";
  if (currentMember) {
    currentMember.borrowedBooks.forEach(book => {
      const li = document.createElement("li");
      li.textContent = `${book.title} by ${book.author}`;
      li.dataset.title = book.title;
      li.addEventListener("click", () => selectBorrowedBook(book.title));
      borrowedList.appendChild(li);
    });
  }
}

// Select a book for borrowing
let selectedBook = null;
function selectBook(title) {
  selectedBook = title;
  document.getElementById("message").textContent = `Selected "${title}" for borrowing.`;
}

// Select a borrowed book for returning
let selectedBorrowedBook = null;
function selectBorrowedBook(title) {
  selectedBorrowedBook = title;
  document.getElementById("message").textContent = `Selected "${title}" for returning.`;
}

// Handle member selection
function handleMemberChange() {
  const memberType = document.getElementById("memberSelect").value;
  if (memberType === "student") {
    currentMember = new Student("You (Student)", 1);
  } else {
    currentMember = new Librarian("You (Librarian)", 2);
  }
  selectedBook = null;
  selectedBorrowedBook = null;
  renderBorrowedBooks();
  document.getElementById("message").textContent = `Switched to ${memberType}.`;
}

// Handle borrow
function handleBorrow() {
  if (!currentMember) {
    document.getElementById("message").textContent = "Please select a member type first.";
    return;
  }
  if (!selectedBook) {
    document.getElementById("message").textContent = "Please select a book to borrow.";
    return;
  }
  const book = library.findBook(selectedBook);
  if (!book) {
    document.getElementById("message").textContent = "Book not found.";
    return;
  }
  const result = currentMember.borrowBook(book);
  const availableCount = library.books.filter(b => b.available).length;
  document.getElementById("message").textContent = `${result}. ${availableCount} books remaining.`;
  renderAvailableBooks();
  renderBorrowedBooks();
  selectedBook = null;
}

// Handle return
function handleReturn() {
  if (!currentMember) {
    document.getElementById("message").textContent = "Please select a member type first.";
    return;
  }
  if (!selectedBorrowedBook) {
    document.getElementById("message").textContent = "Please select a borrowed book to return.";
    return;
  }
  const book = currentMember.borrowedBooks.find(b => b.title === selectedBorrowedBook);
  if (!book) {
    document.getElementById("message").textContent = "Book not found in borrowed list.";
    return;
  }
  const result = currentMember.returnBook(book);
  const availableCount = library.books.filter(b => b.available).length;
  document.getElementById("message").textContent = `${result}. ${availableCount} books remaining.`;
  renderAvailableBooks();
  renderBorrowedBooks();
  selectedBorrowedBook = null;
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initializeLibrary();
  renderAvailableBooks();
  document.getElementById("memberSelect").addEventListener("change", handleMemberChange);
  document.getElementById("borrowBtn").addEventListener("click", handleBorrow);
  document.getElementById("returnBtn").addEventListener("click", handleReturn);
});

/**
 * Demo function to showcase the library system.
 */
function demoLibrary() {
  const output = document.getElementById("output");
  if (!output) {
    console.error("Output element not found!");
    return;
  }
  output.textContent = ""; // Clear previous output

  // Create library and books
  const lib = new Library();
  const b1 = new Book("The Hobbit", "J.R.R. Tolkien");
  const b2 = new Book("1984", "George Orwell");
  const b3 = new Book("Clean Code", "Robert C. Martin");
  lib.addBook(b1);
  lib.addBook(b2);
  lib.addBook(b3);

  // Create members
  const s1 = new Student("Alice", 101);
  const l1 = new Librarian("Mr. Bob", 201);

  // Actions
  const logs = [];
  logs.push("📚 Initial Library Books:");
  logs.push(lib.listBooks());

  logs.push("\n👩‍🎓 Student Actions:");
  logs.push(s1.borrowBook(b1)); // Success
  logs.push(s1.borrowBook(b2)); // Success
  logs.push(s1.borrowBook(b3)); // Fail: limit reached
  logs.push(s1.returnBook(b1)); // Return one

  logs.push("\n👨‍🏫 Librarian Actions:");
  logs.push(l1.borrowBook(b2)); // Fail: already borrowed
  logs.push(l1.borrowBook(b3)); // Success
  logs.push(l1.returnBook(b3)); // Return

  logs.push("\n📚 Final Library Books:");
  logs.push(lib.listBooks());

  output.textContent = logs.join("\n");
}
