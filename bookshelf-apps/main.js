let books = [];

function renderBooks() {
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );

  incompleteBookshelfList.innerHTML = "";
  completeBookshelfList.innerHTML = "";

  for (const book of books) {
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Penulis: ${book.author}`;

    const year = document.createElement("p");
    year.textContent = `Tahun: ${book.year}`;

    const action = document.createElement("div");
    action.classList.add("action");

    const toggleButton = document.createElement("button");
    toggleButton.textContent = book.isComplete
      ? "Belum selesai di Baca"
      : "Selesai dibaca";
    toggleButton.classList.add(book.isComplete ? "green" : "red");
    toggleButton.addEventListener("click", function () {
      toggleBookStatus(book.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus buku";
    deleteButton.classList.add("red");
    deleteButton.addEventListener("click", function () {
      deleteBook(book.id);
    });

    action.appendChild(toggleButton);
    action.appendChild(deleteButton);

    bookItem.appendChild(title);
    bookItem.appendChild(author);
    bookItem.appendChild(year);
    bookItem.appendChild(action);

    if (book.isComplete) {
      completeBookshelfList.appendChild(bookItem);
    } else {
      incompleteBookshelfList.appendChild(bookItem);
    }
  }
}

function addBook() {
  const titleInput = document.getElementById("inputBookTitle").value;
  const authorInput = document.getElementById("inputBookAuthor").value;
  const yearInput = parseInt(document.getElementById("inputBookYear").value); // Mengonversi string menjadi angka
  const isCompleteInput = document.getElementById(
    "inputBookIsComplete"
  ).checked;

  const newBook = {
    id: Date.now(),
    title: titleInput,
    author: authorInput,
    year: yearInput, // Menyimpan tahun sebagai angka
    isComplete: isCompleteInput,
  };

  books.push(newBook);
  renderBooks();
  saveBooksToStorage();
}

function deleteBook(bookId) {
  books = books.filter((book) => book.id !== bookId);
  renderBooks();
  saveBooksToStorage();
}

function toggleBookStatus(bookId) {
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex].isComplete = !books[bookIndex].isComplete;
    renderBooks();
    saveBooksToStorage();
  }
}

function saveBooksToStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

function loadBooksFromStorage() {
  const storedBooks = localStorage.getItem("books");
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    renderBooks();
  }
}

loadBooksFromStorage();

const inputBookForm = document.getElementById("inputBook");
inputBookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addBook();
});

const searchBookForm = document.getElementById("searchBook");
searchBookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchInput = document.getElementById("searchBookTitle").value;
  const searchResults = searchBookByTitle(searchInput);
  renderSearchResults(searchResults);
});

function searchBookByTitle(title) {
  const keyword = title.toLowerCase();
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(keyword)
  );
  return filteredBooks;
}

function renderSearchResults(results) {
  const searchResultContainer = document.getElementById("searchResults");
  searchResultContainer.innerHTML = "";

  if (results.length === 0) {
    searchResultContainer.innerHTML =
      "<p>Tidak ditemukan buku dengan judul tersebut.</p>";
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const book of results) {
    const bookItem = document.createElement("article");
    bookItem.classList.add("book_item");

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Penulis: ${book.author}`;

    const year = document.createElement("p");
    year.textContent = `Tahun: ${book.year}`;

    const action = document.createElement("div");
    action.classList.add("action");

    const toggleButton = document.createElement("button");
    toggleButton.textContent = book.isComplete
      ? "Belum selesai di Baca"
      : "Selesai dibaca";
    toggleButton.classList.add(book.isComplete ? "green" : "red");
    toggleButton.addEventListener("click", function () {
      toggleBookStatus(book.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus buku";
    deleteButton.classList.add("red");
    deleteButton.addEventListener("click", function () {
      deleteBook(book.id);
    });

    action.appendChild(toggleButton);
    action.appendChild(deleteButton);

    bookItem.appendChild(title);
    bookItem.appendChild(author);
    bookItem.appendChild(year);
    bookItem.appendChild(action);

    fragment.appendChild(bookItem);
  }

  searchResultContainer.appendChild(fragment);
}

renderBooks();
// Fungsi untuk menampilkan dialog kustom
function showCustomDialog(bookId) {
  const dialog = document.getElementById("customDialog");
  dialog.style.display = "block";

  // Tambahkan event listener untuk tombol "Batal"
  const cancelButton = document.getElementById("cancelButton");
  cancelButton.addEventListener("click", function () {
    dialog.style.display = "none";
  });

  // Tambahkan event listener untuk tombol "Hapus"
  const confirmButton = document.getElementById("confirmButton");
  confirmButton.addEventListener("click", function () {
    deleteBook(bookId); // Panggil fungsi hapus buku setelah dikonfirmasi
    dialog.style.display = "none"; // Sembunyikan dialog setelah dikonfirmasi
  });
}

// Fungsi untuk menghapus buku dengan dialog kustom
function deleteBookWithDialog(bookId) {
  showCustomDialog(bookId); // Panggil fungsi tampilkan dialog kustom saat tombol "Hapus" diklik
}
