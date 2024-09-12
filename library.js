const myLibrary = new Map();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read=="yes";
    this.id = book_number;
    this.show = 0;
}

function addBookToLibrary(title, author, pages, read) {
    book_number++;
    let book = new Book(title, author, pages, read);
    myLibrary.set(book.id, book);
}

function showAllBooks() {
    for (let [, book] of myLibrary) {
        if (book.show == 1) continue;
        createBookDiv(book);
    }
}

function createBookDiv(book) {
    const book_div = document.createElement("div");
    const title_div = document.createElement("div");
    const details_div = document.createElement("div");
    const buttons_div = document.createElement("div");

    const read_btn = document.createElement("button");
    const delete_btn = document.createElement("button");

    book_div.className = "book";
    book_div.id = book.id;
    title_div.className = "book_title";
    details_div.className = "book_details";
    buttons_div.className = "buttons_div";

    read_btn.className = "book_btn";
    read_btn.textContent = "Status";
    read_btn.id = book.id;
    read_btn.addEventListener("click", changeReadStatus);

    delete_btn.className = "book_btn";
    delete_btn.textContent = "Delete";
    delete_btn.id = book.id;
    delete_btn.addEventListener("click", deleteBook);

    book_div.appendChild(title_div);
    book_div.appendChild(details_div);
    book_div.appendChild(buttons_div);
    
    books_div.appendChild(book_div);

    buttons_div.appendChild(read_btn);
    buttons_div.appendChild(delete_btn);

    book.show = 1;
    title_div.textContent = book.title;
    loadDetails(book);
}

function loadDetails(book) {
    details_div = document.getElementById(book.id).querySelector(".book_details");
    details_div.innerHTML =
        "Author: " +
        book.author +
        "<br>Pages: " +
        book.pages +
        "<br>Read: " +
        book.read;
}

function changeReadStatus(evt) {
    let id = Number(evt.currentTarget.id);
    const book = myLibrary.get(id);
    book.read = !book.read;
    loadDetails(book);
}


function deleteBook(evt) {
    let id = evt.currentTarget.id;
    let book = document.getElementById(id);
    book.remove();
}

function showAddNew() {
    let display = "";
    if (new_form.style.display == "none") {
        display = "block";
    } else display = "none";
    new_form.style.display = display;
}

function submitNew() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.querySelector('input[name="read"]:checked').value;

    if (title == "" || author == "" || pages <= 0 || read == "") return;

    document.getElementById('title').value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = null;


    addBookToLibrary(title, author, pages, read);
    showAllBooks();
}

const books_div = document.getElementById("books");
const new_book = document.getElementById("new_book");
const new_form = document.getElementById("new_form");
const submit_new = document.getElementById("submit");

let book_number = 0;

new_book.addEventListener("click", showAddNew);
submit_new.addEventListener("click", submitNew);

addBookToLibrary("Harry Potter", "J.K Rowling", 350, "no");
addBookToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 800, "no");
addBookToLibrary("1984", "George Orwell", 300, "yes");
addBookToLibrary("The Great Gatsby", "Scott F. Fitzgerald", 200, "yes");
showAllBooks();
