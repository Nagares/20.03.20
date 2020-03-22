const booksList = document.getElementById('carousel-indicators');
let books = [];
const bookInfo = document.getElementById('book-info');
const searchField = document.getElementById('search-field');

const request = fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter').then(response => response.json());

request.then(response => {

    //console.log(response.items);
	books = response.items;
    

	setList(books);
});


function setList(books) {
	
    let i=0
 	books.forEach(item => {
		
		const listItem = document.createElement('li');
		listItem.setAttribute('data-target', '#myCarousel');
		listItem.setAttribute('data-slide-to', `${i}`);
		booksList.hasChildNodes() ? true:listItem.classList.add('active');
        i++

		booksList.appendChild(listItem);

    	let book = item
		doList(book) 

});
}
	

 function doList(book) {
	let setAuthor = function(){
				let author = '';
	 	 		
	 	 		for (var key in book.volumeInfo.authors) {
	 	 			author = author + `<span id='authors'>${book.volumeInfo.authors[key]}</span>`;
	          	};
	          	return author 
	 	 	};

    let authors = setAuthor(); 
    const activeItem = document.createElement('div');
    
    bookInfo.hasChildNodes() ? activeItem.classList.add('item'): activeItem.classList.add('item','active')
	
	 activeItem.innerHTML = `
	 <div class="panel panel-info">
	 <div class="panel-heading">
	 <h4>${book.volumeInfo.title} - ${authors} (${book.volumeInfo.publishedDate})</h4>
	 </div>
	 <div class="panel-body">
	 <img src=${book.volumeInfo.imageLinks.thumbnail}>
	 <span>${book.volumeInfo.description}<span>
	 <div class='text-right'>
	 <a src=${book.volumeInfo.webReaderLink}> Start Read </a></div></div></div>`;
	 bookInfo.appendChild(activeItem)
};



