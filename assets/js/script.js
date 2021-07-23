// HTML Content Elements
var quoteTextEl = $('#quote-text');
var imageEl = $('#image');
var dateInputEl = $('#date-search');
var videoFrameEl = $('#videoFrame');

// Button Elements
var saveImageBtn = $('#save-image');
var saveQuoteBtn = $('#save-quote');
var submitNasaBtn = $('#submit-nasa');
var submitMemeBtn = $('#submit-meme');
var submitQuoteBtn =$('#submit-quote');

// API URLs
var nasaApiUrl= "https://api.nasa.gov/planetary/apod?api_key=v0cvQ8WnjhwP60Zgk9XAQILRGEfLKEUzb48uPaqh&date=";
var memeApiUrl= "https://api.imgflip.com/get_memes";
var quotesApiUrl = "https://type.fit/api/quotes";

// Get Local storage arrays OR empty array
var arrSavedImages = JSON.parse(localStorage.getItem('arrImages')) || [];
var arrSavedQuotes = JSON.parse(localStorage.getItem('arrQuotes')) || [];

//Click events
submitNasaBtn.on('click', getNasaImage);
submitMemeBtn.on('click', getMemeImage);
submitQuoteBtn.on('click', getQuote);
saveImageBtn.on('click', saveImage);
saveQuoteBtn.on('click', saveQuote);

//Global variables for storage
var imageUrl;
var quoteStr;

//Get Image Functions
function getNasaImage(){
    imageUrl = nasaApiUrl + dateInputEl[0].value;
    console.log(imageUrl);
    fetch(imageUrl)
    .then(res => res.json())
        .then(data =>{
            imageUrl = data.url;
            if (imageUrl.includes('youtube')) {
                videoFrameEl.attr('src', data.url)
                imageEl.attr('src', '');
            } else {
                imageEl.attr('src', data.url);
                videoFrameEl.attr('src', '')
            }
    })
};

function getMemeImage(){
    fetch(memeApiUrl)
    .then(res => res.json())
    .then(data =>{
    imageEl.attr('src', data.url);
        var i=Math.floor(Math.random() * data.data.memes.length);
        imageUrl = data.data.memes[i].url;
        imageEl.attr('src', imageUrl);
    })
};

//Get Quote
function getQuote(){
    fetch(quotesApiUrl)
    .then(res => res.json())
    .then(data =>{
        var i=Math.floor(Math.random() * data.length);
        quoteStr = (data[i].text) + "--" + (data[i].author);
        quoteTextEl.html(quoteStr);
    })
};

//Save functions
function saveImage(){
    
    arrSavedImages.push(imageUrl);
    localStorage.setItem('arrImages', JSON.stringify(arrSavedImages));
}

function saveQuote(){
    console.log(arrSavedQuotes);
    arrSavedQuotes.push(quoteStr);
    localStorage.setItem('arrQuotes', JSON.stringify(arrSavedQuotes));
}
// Load Save Images
// Load Saved Quotes