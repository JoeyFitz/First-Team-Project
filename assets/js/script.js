var takeAHit = $('#submit-search');
var quoteText = $('#quote-text');
var image = $('#image');
var dateInputEl = $('#date-search');
var nasaApiUrl= "https://api.nasa.gov/planetary/apod?api_key=v0cvQ8WnjhwP60Zgk9XAQILRGEfLKEUzb48uPaqh&date=2021-06-25";

function getImage(){
    fetch(nasaApiUrl)
    .then(res => res.json())
    .then(data =>{
        console.log(data.url);
    image.attr('src', data.url);
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
        quoteText.html((data[i].text) +"--"+ (data[i].author))
    })
};
takeAHit.on('click', getQuote);

