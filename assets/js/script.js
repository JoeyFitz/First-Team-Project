var takeAHit = $('#submit-search');
var quoteText = $('#quote-text');
var image = $('#image');
var dateInputEl = $('#date-search');
var nasaApiUrl= "https://api.nasa.gov/planetary/apod?api_key=v0cvQ8WnjhwP60Zgk9XAQILRGEfLKEUzb48uPaqh&date=2021-06-25";
var imageURL= "https://api.imgflip.com/get_memes";
var saveBtn = $('#save-search');

var savedQuote
var savedAuthor 
var savedUrl

function getImage(){
    fetch(nasaApiUrl)
    .then(res => res.json())
    .then(data =>{
    image.attr('src', data.url);
        var i=Math.floor(Math.random() * data.data.memes.length);
        savedUrl = data.data.memes[i].url;
        image.attr('src', savedUrl);
        console.log(data.data.memes[i]);
    })
};

var quotes = 'https://type.fit/api/quotes'
function getQuote(){
    getImage();
    fetch(quotes)
    .then(res => res.json())
    .then(data =>{
        var i=Math.floor(Math.random() * data.length);
        console.log(data);
        savedAuthor = (data[i].author);
        savedQuote = (data[i].text);
        quoteText.html((savedQuote +"--"+ savedAuthor));
        console.log(savedQuote);
        console.log(savedAuthor);
    })
};
takeAHit.on('click', getQuote);
saveBtn.on('click', saveStorage);


function saveStorage(){

    localStorage.setItem('imageUrl', savedUrl);
    localStorage.setItem('quote', savedQuote);
    localStorage.setItem('author', savedAuthor);
    console.log('in saved storage')

}

