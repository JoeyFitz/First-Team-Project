// HTML Content Elements
var quoteTextEl = $('#quote-text');
var imageEl = $('#image');
var dateInputEl = $('#date-search');
var videoFrameEl = $('#videoFrame');
var savedImagesEl =$('#saved-images');
var savedQuotesEl =$('#saved-quotes');

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


//Global variables for storage
var imageUrl;
var quoteStr;


loadQuotes();
loadImages();

//Click events
submitNasaBtn.on('click', getNasaImage);
submitMemeBtn.on('click', getMemeImage);
submitQuoteBtn.on('click', getQuote);
saveImageBtn.on('click', saveImage);
saveQuoteBtn.on('click', saveQuote);


//Get Image Functions
function getNasaImage(){
    imageUrl = nasaApiUrl + dateInputEl[0].value;
    console.log(imageUrl);
    fetch(imageUrl)
    .then(res => res.json())
        .then(data =>{
            imageUrl = data.url;
            setImage(imageUrl);
    })
};

function getMemeImage(){
    fetch(memeApiUrl)
    .then(res => res.json())
    .then(data =>{
    imageEl.attr('src', data.url);
        var i=Math.floor(Math.random() * data.data.memes.length);
        imageUrl = data.data.memes[i].url;
        setImage(imageUrl);
    })
};

//Simple Set image so that the saved cards can use them too
function setImage(imgUrl){
    console.log('ImgUrl: ' + imgUrl);
    console.log(imageEl.attr("value"));
    if (imgUrl.includes('youtube')) {
        videoFrameEl.attr('src', imgUrl)
        videoFrameEl.attr('display', 'block');
        imageEl.attr('src', '');
        imageEl.attr('display','none');
        
    } else {
        imageEl.attr('src', imgUrl);
        imageEl.attr('display', 'block');
        videoFrameEl.attr('src', '')
        videoFrameEl.attr('display', 'none')
    }
}

//Get Quote
function getQuote(){
    fetch(quotesApiUrl)
    .then(res => res.json())
    .then(data =>{
        var i=Math.floor(Math.random() * data.length);
        quoteStr = (data[i].text) + "--" + (data[i].author);
        setQuote(quoteStr);
    })
};

//Simple Set quote so that the saved cards can use them too
function setQuote(qtText){
    quoteTextEl.html(qtText);
}

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

// Load Saved Quotes
function loadQuotes(){
    savedQuotesEl.empty();
    for (i=0; i < arrSavedQuotes.length; i++){
        
        //Make div to hold the quote
        var quoteCard = $('<button>');
            quoteCard.attr("onclick", 'setQuote(this.value)');
            quoteCard.attr("value", arrSavedQuotes[i]);
        
        //Make the quote text
        var quoteText = $('<p>');
            quoteText.text(arrSavedQuotes[i]);         
        
        quoteCard.append(quoteText); //append the text to the div
        savedQuotesEl.append(quoteCard); //append the div to the saved-quotes
    }
}
// Load Save Images
function loadImages(){
    savedImagesEl.empty();
    for (i=0; i < arrSavedImages.length; i++){
        //Make div to hold the image thumbnail
        var imageCard = $("<button>");
            imageCard.attr("value", arrSavedImages[i]);
            // imageCard.attr("onclick", 'setImage("' + arrSavedImages[i] + '")');
            imageCard.attr("onclick", 'setImage(this.value)');
        
       // make image thumbnail
        var imageThumb = $("<img>");
            imageThumb.attr('src', arrSavedImages[i]);
        
        
        imageCard.append(imageThumb); //append thumbnail to container
        savedImagesEl.append(imageCard); // append container to saved-images section
    }
}

//Dark mode toggle
function darkModeToggle() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

