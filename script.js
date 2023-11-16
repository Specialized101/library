const myLibrary = []

function Book (title, author, numOfPages, isRead) {
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.isRead = isRead
    this.info = () => {
        return `${title} by ${author}, ${numOfPages} pages, ${this.isRead ? 'already read' : 'not read yet'}`
    }
}

Book.prototype.toggleRead = function () {
    this.isRead = this.isRead ? false : true
}

function addBookToLibrary(book) {
    if (!book instanceof Book) return;

    myLibrary.push(book)
}

const a = new Book('Book1', 'Author1', 100, false)
const b = new Book('Book2', 'Author2', 200, false)
const c = new Book('Book3', 'Author3', 300, false)
const d = new Book('Book4', 'Author4', 400, true)

addBookToLibrary(a)
addBookToLibrary(b)
addBookToLibrary(c)
addBookToLibrary(d)

const books = document.querySelector('.books')

function displayLibrary(){

    // clears all cards before re-generating them
    books.replaceChildren()
    
    myLibrary.forEach(book => {
        let bookCard = document.createElement('div')
        bookCard.classList.add('book-card')
        bookCard.dataset.index = myLibrary.indexOf(book)

        let h2 = document.createElement('h2')
        h2.textContent = `Title: ${book.title}`
        
        let deleteBtn = document.createElement('button')
        deleteBtn.setAttribute('type', 'button')
        deleteBtn.textContent = 'Delete'

        deleteBtn.addEventListener('click', () => {
            myLibrary.splice(bookCard.dataset.index, 1)
            displayLibrary()
        })

        let ul = document.createElement('ul')
        let liAuthor = document.createElement('li')
        let liNumOfPages = document.createElement('li')
        let liRead = document.createElement('li')
        let labelRead = document.createElement('label')
        let inputRead = document.createElement('input')
    
        liAuthor.textContent = `Author: ${book.author}`
        liNumOfPages.textContent = `Number of pages: ${book.numOfPages}`
        labelRead.setAttribute('for', 'read')
        labelRead.textContent = 'Already read ? '
        inputRead.setAttribute('type', 'checkbox')
        inputRead.setAttribute('id', 'read')
        inputRead.setAttribute('name', 'read')
        inputRead.checked = book.isRead ? true : false
    
        inputRead.addEventListener('change', () => {
            myLibrary[bookCard.dataset.index].toggleRead()
            displayLibrary()
        })

        liRead.appendChild(labelRead)
        liRead.appendChild(inputRead)
        ul.appendChild(liAuthor)
        ul.appendChild(liNumOfPages)
        ul.appendChild(liRead)
    
        bookCard.appendChild(h2)
        bookCard.appendChild(ul)
        bookCard.appendChild(deleteBtn)

        books.appendChild(bookCard)
    })
}

const dialog = document.querySelector('dialog')
const showButton = document.querySelector('#showDialogBtn')
const closeButton = document.querySelector('#closeFormBtn')
const createButton = document.querySelector('#createBtn')
const form = document.querySelector('form')

function clearForm() {
    document.querySelector('#newTitle').value = ''
    document.querySelector('#newAuthor').value = ''
    document.querySelector('#newNumOfPages').value = 1
    document.querySelector('#newRead').checked = false
}

createButton.addEventListener('click', () => {
    let newBook = new Book()
    newBook.title = document.querySelector('#newTitle').value
    newBook.author = document.querySelector('#newAuthor').value
    newBook.numOfPages = parseInt(document.querySelector('#newNumOfPages').value)
    newBook.isRead = document.querySelector('#newRead').checked
    
    addBookToLibrary(newBook)
    
    displayLibrary()
    
    dialog.close()
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
})

showButton.addEventListener('click', () => {
    clearForm()
    dialog.showModal()
});

closeButton.addEventListener('click', () => {
    dialog.close()
});

displayLibrary()