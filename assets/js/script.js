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

loadQuotes();
loadImages();

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
                videoFrameEl.attr('display', 'block');
                imageEl.attr('src', '');
                imageEl.attr('display','none');
                
            } else {
                imageEl.attr('src', data.url);
                imageEl.attr('display', 'block');
                videoFrameEl.attr('src', '')
                videoFrameEl.attr('display', 'none')
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
function loadImages(){
    savedImagesEl.empty();
    for (i=0; i < arrSavedImages.length; i++){
        var imageCard = $("<div>");
        var imageThumb = $("<img>");
        console.log(arrSavedImages[i]);
        imageThumb.attr('src', arrSavedImages[i]);
        imageCard.append(imageThumb);
        savedImagesEl.append(imageCard);
    }
}


// Load Saved Quotes
function loadQuotes(){
    savedQuotesEl.empty();
    for (i=0; i < arrSavedQuotes.length; i++){
        var quoteCard = $('<div>');
        var quoteText = $('<p>');
        console.log(arrSavedQuotes[i]);
        quoteText.text(arrSavedQuotes[i]);           
        quoteCard.append(quoteText);

        savedQuotesEl.append(quoteCard);
    }
}


//Dark mode toggle
function darkModeToggle() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

//Make floating text element

// dragElement(document.getElementById("mydiv"));

// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     /* if present, the header is where you move the DIV from:*/
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     /* otherwise, move the DIV from anywhere inside the DIV:*/
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     /* stop moving when mouse button is released:*/
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }