var takeAHit = $('#submit-date');
var quoteText = $('#quote-text');
var image = $('#image');
var dateInputEl = $('#date-search');
var nasaApiUrl= "https://api.nasa.gov/planetary/apod?api_key=v0cvQ8WnjhwP60Zgk9XAQILRGEfLKEUzb48uPaqh&date=";
var quoteUrl = 'https://type.fit/api/quotes'

function getImage(){
    var imageUrl = nasaApiUrl + dateInputEl[0].value;
    console.log(imageUrl);
    fetch(imageUrl)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
    image.attr('src', data.url);
    })
};

function getQuote(){
    fetch(quoteUrl)
    .then(res => res.json())
    .then(data =>{
        var i=Math.floor(Math.random() * data.length);
        console.log(data);
        quoteText.html((data[i].text) +"--"+ (data[i].author))
    })
};
takeAHit.on('click', function(){
    getImage();
    getQuote();
});

