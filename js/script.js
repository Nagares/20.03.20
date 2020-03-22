const booksList = document.getElementById('books-list');
let books = [];
const bookInfo = document.getElementById('book-info');
const searchField = document.getElementById('search-field');

const request = fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter').then(response => response.json());

request.then(response => {

    //console.log(response.items);
	books = response.items;
    console.log(books)

	setList(books);
});


function setList(books) {
	booksList.innerHTML = '';
	bookInfo.innerHTML = '';

	books.forEach(item => {
		const listItem = document.createElement('a');
		listItem.setAttribute('href', '');
		listItem.classList.add('list-group-item');
		listItem.innerText = item.volumeInfo.title;

		booksList.appendChild(listItem);
	});
}

booksList.addEventListener('click', function(event) {
	event.preventDefault();

	if (!event.target.classList.contains('list-group-item')) {
		return;
	}

	const bookName = event.target.innerText;

	const book = books.find((item) => {
		return item.volumeInfo.title === bookName;
	});

	let setAuthor = function(){
				let author = '';
	 	 		
	 	 		for (var key in book.volumeInfo.authors) {
	 	 			author = author + `<span id='authors'>${book.volumeInfo.authors[key]}</span>`;

	          	};
	          	return author 
	 	 	};
    let authors = setAuthor(); 

   
	console.log(book);
	 bookInfo.innerHTML = `
	 <div class="panel panel-info">
	 <div class="panel-heading">
	 <h4>${book.volumeInfo.title} - ${authors} (${book.volumeInfo.publishedDate})</h4>
	 </div>
	<div class="panel-body">
	 <img src=${book.volumeInfo.imageLinks.thumbnail}>
	 <span>${book.volumeInfo.description}<span>
	 <div class='text-right'>
	 <a href='${book.accessInfo.webReaderLink}'> Start Read </a></div></div></div>`
});

