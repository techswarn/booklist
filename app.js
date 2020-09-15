//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  //console.log(book);
  //Add element
  const row = document.createElement("tr");

  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
};

// Empty field alert
UI.prototype.showAlert = function (message, className) {
  //Create Class
  const div = document.createElement("div");
  //Create classname
  div.className = `alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));
  //get parent element
  const container = document.querySelector(".container");

  const form = document.querySelector("#book-form");
  //Insert alert
  container.insertBefore(div, form);

  //Timeout after 3 secs
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

//Delete element constructor
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

//Clear fields method

UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//Creating event lister and capturing the field values.

document.getElementById("book-form").addEventListener("submit", function (e) {
  //Get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //Creating a book object
  const book = new Book(title, author, isbn);

  //Create a UI object
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please Fill all fields!!", "error");
  } else {
    // Create a method in prototype to create a method for inserting values to table
    ui.addBookToList(book);
    //Clear fields
    ui.clearFields();
    ui.showAlert("Book successfully added!!", "success");
  }

  e.preventDefault();
});

//EVENT  lister for delete

document.getElementById("book-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  ui.showAlert("Book deleted successfully", "success");

  e.preventDefault();
});
