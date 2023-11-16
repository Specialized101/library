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

myLibrary.forEach(book => {
    let bookCard = document.createElement('div')
    bookCard.classList.add('book-card')
    
    let h2 = document.createElement('h2')
    h2.textContent = `Title: ${book.title}`
    
    let ul = document.createElement('ul');
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
    inputRead.disabled = true

    liRead.appendChild(labelRead)
    liRead.appendChild(inputRead)
    ul.appendChild(liAuthor)
    ul.appendChild(liNumOfPages)
    ul.appendChild(liRead)

    bookCard.appendChild(h2)
    bookCard.appendChild(ul)

    books.appendChild(bookCard)
})
