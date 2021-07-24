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
var submitHitBtn =$('#take-a-hit');

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

//Get the saved Content on the page
loadQuotes();
loadImages();

//Toggle a boolean with CTRL Key for use with removing saved content
var cntrlIsPressed = false;

$(document).keydown(function(event){
    if(event.which == 17 || event.keycode == 17){
        cntrlIsPressed = true;
    }
});

$(document).keyup(function(){
    cntrlIsPressed = false;
});

//Click events
submitNasaBtn.on('click', getNasaImage);
submitMemeBtn.on('click', getMemeImage);
submitQuoteBtn.on('click', getQuote);
submitHitBtn.on('click', getHit);
saveImageBtn.on('click', saveImage);
saveQuoteBtn.on('click', saveQuote);


savedImagesEl.on('click',function(event) {
    var clickedImage = event;
    var clickedUrl ; //= clickedImage.attr('value');

    console.log('ClickedUrl: ' + JSON.stringify(clickedImage));
});



//Dark mode toggle
function darkModeToggle() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

//Creates random image/quote combo
function getHit(){
    getMemeImage();
    getQuote();
}
///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////////////////// IMAGE FUNCTIONs////////////////////////////////
//Get Nasa Image from APOD API call
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
//Get Meme Image From imgFlip API Call
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

//SetImage
function setImage(img){
    
    //Make sure a saved card is clicked and then update imgeUrl
    var imgId = img.id;
    if (imgId == 'imageCard'){
        imgUrl = img.value;
    } else {
        imgUrl = img;
    }

    //Handle ControlKey
    console.log(cntrlIsPressed);
    if (cntrlIsPressed){
        var index = arrSavedImages.indexOf(imgUrl);
        if (index > -1) {
            arrSavedImages.splice(index, 1);
            localStorage.setItem('arrImages', JSON.stringify(arrSavedImages));
            loadImages();
        }
    }
    else{
        // handle if the APOD is a youtube video
        if (imgUrl.includes('youtube')) {
            
            videoFrameEl.attr('src', imgUrl)
            videoFrameEl.removeClass('hidden');
            imageEl.addClass('hidden');
            
        } else {
            imageEl.attr('src', imgUrl);
            videoFrameEl.addClass('hidden');
            imageEl.removeClass('hidden');
        }
    }

}
//Load Images from local storage array
function loadImages(){
    savedImagesEl.empty();
    for (i=0; i < arrSavedImages.length; i++){
        //Make div to hold the image thumbnail
        var imageCard = $("<button>");
            imageCard.attr('id','imageCard');
            imageCard.attr("value", arrSavedImages[i]);
            
            imageCard.attr("onclick", 'setImage(this)');
        
       // make image thumbnail
        var imageThumb = $("<img>");
            imageThumb.attr('src', arrSavedImages[i]);
        
        
        imageCard.append(imageThumb); //append thumbnail to container
        savedImagesEl.append(imageCard); // append container to saved-images section
    }
}

//Save functions to local storage array
function saveImage(){
    if (imageUrl != null & !cntrlIsPressed){
        var index = arrSavedImages.indexOf(imgUrl);
        if (!(index > -1)) {
            arrSavedImages.push(imageUrl);
            localStorage.setItem('arrImages', JSON.stringify(arrSavedImages));
        }
    } else if(cntrlIsPressed) {
        
    }
    loadImages();
}


//||\\||\\\|\\||\\||\\||\\||//||\\||\\\|\\||\\||\\||\\||//||\\||\\||\\||\\||\\||\\||//||\\||\
//||\\||\\\|\\||\\||\\||\\||//||\\||\\\|\\||\\||\\||\\||//||\\||\\||\\||\\||\\||\\||//||\\||\
//||\\||\\\|\\||\\||\\||\\||QUOTE FUNCTIONS\\||\\\|\\||\\||\\||\\||\\||\\\|\\||\\||\\||\\||\


//\\ Get Quote from API
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
function setQuote(qt){
        
    //Make sure a saved card is clicked and then update qtText
    var qtId = qt.id;
    if (qtId == 'quoteCard'){
        qtText = qt.value;
    } else {
        qtText = qt;
    }

    //Handle ControlKey
    if (cntrlIsPressed){
        var index = arrSavedQuotes.indexOf(qtText);
        console.log(qtText);    
        if (index > -1) {
            arrSavedQuotes.splice(index, 1);
            localStorage.setItem('arrQuotes', JSON.stringify(arrSavedQuotes));
            loadQuotes();
        }
    }
    else{
        quoteTextEl.html(qtText);
    }
}


//\\ Load Saved Quotes
function loadQuotes(){
    savedQuotesEl.empty();
    for (i=0; i < arrSavedQuotes.length; i++){
        
        //\\Make div to hold the quote
        var quoteCard = $('<button>');
        quoteCard.attr('id','quoteCard');
            quoteCard.attr("onclick", 'setQuote(this)');
            quoteCard.addClass('border-4 border-solid p-4')
            quoteCard.attr("value", arrSavedQuotes[i]);
        
        //\\Make the quote text
        var quoteText = $('<p>');
            quoteText.text(arrSavedQuotes[i]);         
        
        quoteCard.append(quoteText); //append the text to the div
        savedQuotesEl.append(quoteCard); //append the div to the saved-quotes
    }
}

//\\ Save Quote to local storage ((IF CTRL PRESSED THEN DELETE)
function saveQuote(){
    if (quoteStr != null){
        var index = arrSavedQuotes.indexOf(quoteStr);
        if (!(index > -1)) {
            arrSavedQuotes.push(quoteStr);
            localStorage.setItem('arrQuotes', JSON.stringify(arrSavedQuotes));
        }
    } else {
        console.log("quoteStr: " + quoteStr);
    }
    loadQuotes();
}









