//exercise 1 & 2
const wordPromise = $.get('/randomWord')
wordPromise.then(function(word){
    const bookPromise =  $.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${word}&maxResults:1`)
    const gifPromise = $.get(`http://api.giphy.com/v1/gifs/search?q=${word}&api_key=rY7e2BpsmyM2bXD94OMxvbF9PCeWL84y&limit=1`)
    Promise.all([bookPromise, gifPromise]).then(function(response){
        render(response[0], response[1])
    })
})


const render = function(book, giff){
    console.log(book);
    const title = book.items[0].volumeInfo.title
    console.log(giff);
    const gif = giff.data[0].embed_url
    const source = $('#book-template').html();
    const template = Handlebars.compile(source)
    const newHTML = template({title, gif});
    $('div').append(newHTML);
}