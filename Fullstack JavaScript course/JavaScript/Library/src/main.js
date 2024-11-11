/* Sections: Book section, Form section, Modal section, Errors section, List section, Init */

/* --- Variables --- */

const updateBtn = document.querySelector('#updateButton');
const addBookBtn = document.querySelector('#addBookButton');
const submitBtn = document.querySelector('#submit');

const modalForm = document.querySelector('#openModalForm');
const bookForm = document.querySelector('#bookForm');
const closeModalBtn = document.querySelector('#closeModalForm');

const container = document.querySelector('#container');
const errorHelper = document.querySelector('#errorHelper');

const bookModal = document.querySelector('#bookModalView');
const bookTitleV = document.querySelector('#bookViewTitle');
const bookInfoV = document.querySelector('#bookViewInfo');
const bookDescV = document.querySelector('#bookViewDescription');
const closeBookV = document.querySelector('#closeModalView');
const editBookV = document.querySelector('#editModalView');
const deleteBook = document.querySelector('#deleteBook');
const editBookBtn = document.querySelector('#editBook');

let titleForm = document.querySelector('#title');
let publisherForm = document.querySelector('#publisher');
let authorForm = document.querySelector('#author');
let pagesForm = document.querySelector('#pages');
let statusForm = document.querySelector('#status');
let descriptionForm = document.querySelector('#description');

let isEditView = false;
let isOpenModal = false;
let errors = [];
let library = [
    new Book('The Great Gatsby', 'Charles Scribner`s', 'F. Scott Fitzgerald', 180, 'n', '', false, 0),
    new Book('Ao Kill a Mockingbird', 'Grand Central Publishing', 'Harper Lee', 281, 'r', '', false, 1),
    new Book('The Catcher in the Rye', 'Little, Brown and Company', 'J. D. Salinger', 277, 'n', '', true, 2),
];

/* --- Listeners --- */

updateBtn.addEventListener('click', () => {
    fillPageBooks();
    cleanErrors();
})

addBookBtn.addEventListener('click', () => {
    openModalForm();
});

closeModalBtn.addEventListener('click', () => {
    closeModalForm();
});

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

closeBookV.addEventListener('click', () => {
    closeModalBook();
});

submitBtn.addEventListener('click', () => {
    submitBook();
})

/* --- Book section --- */

/**
 * Creates a new Book object.
 *
 * @param {string} title - The title of the book.
 * @param {string} publisher - The publisher of the book.
 * @param {string} author - The author of the book.
 * @param {number} pages - The number of pages in the book.
 * @param {string} status - The status of the book ('r' for read, 'n' for not read).
 * @return {string} - Returns the book's data/information.
 */
function Book(title, publisher, author, pages, status, description = "", hidden, id) {

    this.title = title;
    this.publisher = publisher;
    this.author = author;
    this.pages = pages;
    this.status = status;

    this.description = description;
    this.hidden = hidden;
    this.id = id;

    this.info = () => {
        const read = this.status.includes('r') ? 'read' : 'not read';
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}.`;
    }
};

/* --- Form section --- */

/**
 * Adds a book to the library.
 * 
 * @param {string} status - The status of the book ('r' for read, 'n' for not read).
 */
const addBook = (title, publisher, author, pages, status, description = "") => {

    cleanErrors();

    const valid = validateBook(title, publisher, author, pages, status, description);

    if (valid === true) {
        let id = library.length;
        const newBook = new Book(title, publisher, author, pages, status, description, false, id);
        library.push(newBook);
        return true;
    }

    checkErrors();
    return false;

};

/**
 * Submits a book by retrieving input values from the document, 
 * adding the book using the addBook function, and updating the page 
 * with the book list if successful.
 *
 * @return {boolean} true and refresh the list if the book is successfully added, false otherwise.
 */
const submitBook = () => {
    const { value: title } = titleForm;
    const { value: publisher } = publisherForm;
    const { value: author } = authorForm;
    const { value: pages } = pagesForm;
    const { value: status } = statusForm;
    const { value: description } = descriptionForm;

    const id = library.length;

    const put = addBook(title, publisher, author, pages, status, description, false, id);
    
    if (put) {
        closeModalForm();
        fillPageBooks();
        resetForm();
    }

}

const resetForm = () => {
    
    titleForm.value = '';
    publisherForm.value = '';
    authorForm.value = '';
    pagesForm.value = '';
    statusForm.value = 'r';
    descriptionForm.value = '';

}

/* --- Modal section --- */


/**
 * Opens the form modal by removing the 'hidden' class.
 *
 */
const openModalForm = () => {

    cleanErrors();

    if (isOpenModal){
        closeModalForm();
        return;
    }


    container.classList.add('hidden');
    updateBtn.classList.add('hidden');
    addBookBtn.classList.add('hidden');

    modalForm.classList.remove('hidden');
    isOpenModal = true;

}

const closeModalForm = () => {

    container.classList.remove('hidden');
    updateBtn.classList.remove('hidden');
    addBookBtn.classList.remove('hidden');

    modalForm.classList.add('hidden');
    isOpenModal = false;

    resetForm();
    fillPageBooks();

}

const openModalBook = book => {

    cleanErrors();

    if (isOpenModal){
        closeModalBook();
        return;
    }

    container.classList.add('hidden');
    updateBtn.classList.add('hidden');
    addBookBtn.classList.add('hidden');

    bookModal.classList.remove('hidden');
    isOpenModal = true;

    bookTitleV.textContent = book.title;
    bookInfoV.textContent = book.info();
    bookDescV.textContent = book.description ? book.description : "No description.";

    editBookV.onclick = () => editModalForm(book, book.id);

    deleteBook.onclick = () => {
        library[book.id].hidden = true;
        closeModalBook();
    };

}

const closeModalBook = () => {

    container.classList.remove('hidden');
    updateBtn.classList.remove('hidden');
    addBookBtn.classList.remove('hidden');

    bookModal.classList.add('hidden');
    modalForm.classList.add('hidden');
    isOpenModal = false;
    
    resetForm();
    fillPageBooks();

}

const editHandler = (id) => {

    editBook(id);
    submitBtn.classList.remove('hidden');
    editBookBtn.classList.add('hidden');
    closeModalBook();

};

const editModalForm = (book, id) => {

    isEditView = true;

    container.classList.add('hidden');
    updateBtn.classList.add('hidden');
    addBookBtn.classList.add('hidden');

    bookModal.classList.add('hidden');

    submitBtn.classList.add('hidden');
    editBookBtn.classList.remove('hidden');
    modalForm.classList.remove('hidden');
    isOpenModal = true;
    
    titleForm.value = book.title;
    publisherForm.value = book.publisher;
    authorForm.value = book.author;
    pagesForm.value = book.pages;
    statusForm.value = book.status;
    descriptionForm.value = book.description;

    editBookBtn.onclick = () => editHandler(id);

}

const editBook = (id) => {

    cleanErrors();

    const newBook = new Book(
        titleForm.value,
        publisherForm.value,
        authorForm.value,
        Number(pagesForm.value),
        statusForm.value,
        descriptionForm.value,
        false,
        id
    );

    const valid = validateBook(newBook.title, newBook.publisher, newBook.author, newBook.pages, newBook.status, newBook.description);
    if (valid === true) {
        cleanErrors();
        library[id] = newBook;
        return;
    }

    checkErrors();
    
}

/* --- Errors section --- */

const cleanErrors = () => {
    errors = [];
    errorHelper.textContent = "";
}

/**
 * Validates the book information.
 *
 * @return {Array} - If the data is invalid.
 * @return {true} - If the data is valid
 */
const validateBook = (title, publisher, author, pages, status, description = "") => {
    let valid = true;

    if (/[^a-zA-Z.' ]/.test(title))
        {errors.push("Invalid characters in title."); valid = false;}

    if (/[^a-zA-Z.' ]/.test(publisher))
        {errors.push("Invalid characters in publisher."); valid = false;}

    if (/[^a-zA-Z.' ]/.test(author))
        {errors.push("Invalid characters in author."); valid = false;}

    if (isNaN(pages) || pages <= 0)
        {errors.push("Invalid number of pages."); valid = false;}

    if (status !== 'r' && status !== 'n')
        {errors.push("Invalid characters in status."); valid = false;}

    if (/[^a-zA-Z.' ]/.test(description))
        {errors.push("Invalid characters in description."); valid = false;}

    if (description.length > 100)
        {errors.push("Too many characters in description."); valid = false;}

    return valid ? true : errors;
};

/**
 * Check if there are errors in the array display them if any.
 *
 * @return {boolean} - True if there are errors.
 */
let checkErrors = () => {
    if (errors.length > 0) {
        errorHelper.textContent = ""
        errors.forEach((error) => {
            errorHelper.textContent += `\n${error}\n`;
        });
        return true;
    }

    cleanErrors();
    return false;
}

/* --- List section --- */

/**
 * Update the page's list of books.
 * 
 * @function listBooks - Retrieves the list of books.
 */
const fillPageBooks = () => {

    let books = library;

    let hasErrors = checkErrors();

    if (hasErrors)
    {return}

    container.innerHTML = '';

    books.forEach((book) => {
        if (book.hidden)
            return;

        let bookDiv = document.createElement('a');
        bookDiv.classList.add('rounded', 'bg-gray-100', 'p-5', 'm-5', 'shadow-lg', 'hover:bg-blue-400');

        let titleElement = document.createElement('h2');
        titleElement.classList.add('font-bold', 'text-xl');
        titleElement.textContent = book.title;

        let authorElement = document.createElement('p');
        authorElement.textContent = book.author;

        let infoElement = document.createElement('p');
        infoElement.classList.add('mt-2');
        infoElement.textContent = book.info();

        bookDiv.appendChild(titleElement);
        bookDiv.appendChild(authorElement);
        bookDiv.appendChild(infoElement);

        bookDiv.onclick = () => openModalBook(book);

        bookDiv.id = book.id;

        container.appendChild(bookDiv);

    });

    isEditView = false;
};

/* --- Init --- */

onload = () => {
    fillPageBooks();
}