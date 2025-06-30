const books = document.querySelector(".books");
const addButton = document.querySelector(".add");
const dialog = document.querySelector("dialog");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const statusInput = document.querySelector("#status-check");
const form = document.querySelector("form");

const myLibrary = [];

class Book {
  // constructor
  constructor(title, author, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  toggleRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
}

function displayBook() {
  books.innerHTML = "";
  books.appendChild(addButton);
  // loops through the library and display each book on the page
  myLibrary.forEach(function render(book) {
    const card = createBookCard(book);

    /* Add book card to books */
    books.appendChild(card);
  });
}

/* Show modal form */
addButton.addEventListener("click", () => {
  dialog.showModal();
});

/* Submit book form and display it */
form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    return;
  }
  dialog.close();
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const status = statusInput.checked;
  addBookToLibrary(title, author, pages, status);
  displayBook();
  form.reset();
});

function createBookCard(book) {
  /* Create title div */
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title");
  const title = document.createElement("h2");
  title.innerText = book.title;
  titleDiv.appendChild(title);

  /* Create author div */
  const authorDiv = document.createElement("div");
  authorDiv.classList.add("author");
  authorDiv.innerHTML = "<p>by </p>";
  const author = document.createElement("h3");
  author.classList.add("author-name");
  author.innerText = book.author;
  authorDiv.appendChild(author);

  /* Create pages div */
  const pagesDiv = document.createElement("div");
  pagesDiv.classList.add("pages");
  pagesDiv.innerHTML = "<span>📖 </span>";
  const pages = document.createElement("p");
  pages.innerText = book.pages + " pages";
  pagesDiv.appendChild(pages);

  /* Create status div */
  const statusDiv = document.createElement("div");
  statusDiv.classList.add("status");
  const status = document.createElement("input");
  const statusLabel = document.createElement("label");
  statusLabel.setAttribute("for", `read-${book.id}`);
  statusLabel.innerText = "Read";
  status.checked = book.read;
  status.setAttribute("data-id", `${book.id}`);
  status.setAttribute("id", `read-${book.id}`);
  status.setAttribute("type", "checkbox");

  /* Event listener for status checkbox */
  status.addEventListener("click", (e) => {
    const book_id = e.target.dataset.id;
    updateStatus(book_id);
  });

  statusDiv.appendChild(status);
  statusDiv.appendChild(statusLabel);

  /* Delete button */
  const deleteDiv = document.createElement("div");
  deleteDiv.classList.add("delete");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete", "icon-button");
  deleteButton.setAttribute("data-id", `${book.id}`);
  deleteButton.innerText = "🗑️";
  deleteButton.addEventListener("click", (e) => {
    const book_id = e.target.dataset.id;
    removeBook(book_id);
  });
  deleteDiv.appendChild(deleteButton);

  /* Create book card */
  const card = document.createElement("div");
  card.classList.add("card");
  card.appendChild(titleDiv);
  card.appendChild(authorDiv);
  card.appendChild(pagesDiv);
  card.appendChild(statusDiv);
  card.appendChild(deleteDiv);

  return card;
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index != -1) {
    myLibrary.splice(index, 1);
  }
  displayBook();
}

function updateStatus(id) {
  for (const book of myLibrary) {
    if (book.id === id) {
      book.toggleRead();
      break;
    }
  }
  displayBook();
}
