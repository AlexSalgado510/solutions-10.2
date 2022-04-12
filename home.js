function getTotalAccountsCount(accounts) {
  //return length of array of authors
  return accounts.length;
}


function getBooksBorrowedCount(books) {
  //return borrowed books and add with reduce
   let borrowedBooks  = books.reduce((acc, book) => {
     return (acc + (!book.borrows[0].returned));
   }, 0);
   return borrowedBooks;
}
 

function getMostCommonGenres(books) { 
  let map = {}; books.forEach((num) => { 
    if (map[num.genre]) { map[num.genre]++; 
} else { map[num.genre] = 1; } });
  return Object.entries(map) .map(([name, count]) => {
   return { name, count }; }) .sort((a, b) => b.count - a.count) .slice(0, 5); 
}

//helper function  
function groupByBook(array, book) {
  // reduce  
  return array.reduce((acc, obj) => {
    //book is a key value, obj is a general object
      return Object.assign(acc, { [obj[book]]:( acc[obj[book]] || [] )
    //line above finds an object because of it's key and then steps up with acc
    }, {});
}

//get object size helper
,Object.size = function(obj) {
  var size = 0, identifier;
  for (identifier in obj) {
      if (obj.hasId(identifier)) size++;
  }
  return size;
}

,function getMostPopularBooks(books) {
    //get books mapped
    return books.map(book => {
      //get borrowed title and length for book
      return {
        name: book.title,
        count: book.borrows.length
      }
    }).sort((bookA, bookB) => bookB.count - bookA.count).splice(0,5)
}
  

,function getMostPopularAuthors(books, authors) {
    //set empty array
    let authorsResult = [];
    //find most popular
    let popularAuthor = books.filter((book) => authors.find((author) => author.id === book.authorId));
    popularAuthor.forEach((book) => {
      //match
      let author = authors.find((author) => author.id === book.authorId);
      //push name & count to result array
      authorsResult.push( {
        name: `${author.name.first} ${author.name.last}`,
        count: book.borrows.length} )
      });
    //return the top 5 from sort splice top5
    return (authorsResult.sort((countA, countB) => countA.count < countB.count ? 1: -1)).slice(0,5);
}

,module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
})}