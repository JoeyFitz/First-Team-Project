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
var submitInspQuoteBtn =$('#submit-inspQuote');
var submitOfficeQuoteBtn =$('#submit-officeQuote');
var submitHitBtn =$('#take-a-hit');


// API URLs
var nasaApiUrl= "https://api.nasa.gov/planetary/apod?api_key=v0cvQ8WnjhwP60Zgk9XAQILRGEfLKEUzb48uPaqh&date=";
var memeApiUrl= "https://api.imgflip.com/get_memes";
var inspQuotesApiUrl = "https://type.fit/api/quotes";
var officeQuotesApiUrl = "https://www.officeapi.dev/api/quotes/random";

// Get Local storage arrays OR empty array
var arrSavedImages = JSON.parse(localStorage.getItem('arrImages')) || [];
var arrSavedQuotes = JSON.parse(localStorage.getItem('arrQuotes')) || [];


//Global variables for storage
var imageUrl;
var quoteStr;

console.log('imageUrl: ' + imageUrl);

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
submitInspQuoteBtn.on('click', getInspQuote);
submitOfficeQuoteBtn.on('click', getOfficeQuote);
submitHitBtn.on('click', getHit);
saveImageBtn.on('click', saveImage);
saveQuoteBtn.on('click', saveQuote);

var arrBtnNames = ['Take a hit','Jesus take the wheel','Roll the dice','Dudditz!','Skin that cat','Get Some', 'Leave the reservation', 'DO NOT PRESS', 'Self Destruct']

//Creates random image/quote combo
function getHit(){
    var imageRndm=Math.floor(Math.random() * 2);
    var quoteRndm=Math.floor(Math.random() * 2);
    var btnRndm =Math.floor(Math.random() * arrBtnNames.length);
    submitHitBtn.text(arrBtnNames[btnRndm]);
    if(imageRndm == 1){
        getMemeImage();
    } else {
        var setRandDate = setRandomDate(6000);
        console.log(setRandDate);
        getNasaImage(null, setRandDate);
    }
    if(quoteRndm == 1){
        getOfficeQuote();
    } else {
        getInspQuote();
    }
}

function setRandomDate(numDay){
    let now = new Date();
    var randomDay;
    numDay = Math.floor(Math.random() * numDay);
    now = now -(1000*60*60*24*numDay);
    randomDay = new Date(now);
    console.log("rd:" + randomDay);
    return dateFns.format(randomDay, 'YYYY-MM-DD');
}

///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////////////////// IMAGE FUNCTIONs////////////////////////////////
//Get Nasa Image from APOD API call
function getNasaImage(event, randomDate){
    imageApiUrl = nasaApiUrl + (randomDate ? randomDate : dateInputEl[0].value);
    fetch(imageApiUrl)
    .then(res => res.json())
        .then(data =>{
            imageUrl = data.url;
            console.log('imageUrl: ' + imageUrl);
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
    console.log('img: ' + img);
    var comboCard = false;
    //Make sure a saved card is clicked and then update imageUrl
    var imgId = img.id;
    if (imgId == 'imageCard'){
        imageUrl = img.value;
    } else if (imgId == 'comboCard'){
        imageUrl = JSON.parse(img.value)
        imageUrl = imageUrl.imgSrc;
        comboCard = true;
    } else {
        imageUrl = img;
    }

    console.log('imageUrl: ' + imageUrl);

    //Handle ControlKey
    if (cntrlIsPressed && !comboCard){
        var index = arrSavedImages.indexOf(imageUrl);
        if (index > -1) {
            arrSavedImages.splice(index, 1);
            localStorage.setItem('arrImages', JSON.stringify(arrSavedImages));
            console.log('imageUrl: ' + imageUrl);
            loadImages();
            }
        }
        else {
            // handle if the APOD is a youtube video
            if (imageUrl.includes('youtube')) {
                videoFrameEl.attr('src', imageUrl)
                videoFrameEl.removeClass('hidden');
                imageEl.addClass('hidden');
            } else {
                imageEl.attr('src', imageUrl);
                videoFrameEl.addClass('hidden');
                imageEl.removeClass('hidden');
            }
        }

}
//Load Images from local storage array
function loadImages(){
    console.log('imageUrl: ' + imageUrl);
    savedImagesEl.empty();
    for (i=0; i < arrSavedImages.length; i++){
        //Make div to hold the image thumbnail
        var imageCard = $("<button>");
            imageCard.attr('id','imageCard');
            imageCard.attr("value", arrSavedImages[i]);
            imageCard.attr("onclick", 'setImage(this)');
        
       // make image thumbnail
       var index = arrSavedImages[i].includes("youtube");
       var imageThumb = $("<img>");
       if (index) {
            imageThumb.attr('src', "./assets/images/youtube.png");
       }else {
            imageThumb.attr('src', arrSavedImages[i]);
       }
        imageCard.append(imageThumb); //append thumbnail to container
        savedImagesEl.append(imageCard); // append container to saved-images section
    }
}

//Save functions to local storage array
function saveImage(){
    imageUrl = imageEl.attr('src');
    console.log('imageUrl: ' + imageUrl);
    if (imageUrl != null & !cntrlIsPressed){
        var index = arrSavedImages.indexOf(imageUrl);
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
function getOfficeQuote(){
    fetch(officeQuotesApiUrl)
    .then(res => res.json())
    .then(data =>{
        var author = data.data.character.firstname + " " + data.data.character.lastname;
        quoteStr = (data.data.content) + " - " + author;
        setQuote(quoteStr);
    })
};

function getInspQuote(){
    fetch(inspQuotesApiUrl)
    .then(res => res.json())
    .then(data =>{
        var i=Math.floor(Math.random() * data.length);
        var author = data[i].author || 'Anonymous';
        quoteStr = (data[i].text) + " - " + author;
        setQuote(quoteStr);
    })
};

//Simple Set quote so that the saved cards can use them too
function setQuote(qt){
    var comboCard = false;
    //Make sure a saved card is clicked and then update qtText
    var qtId = qt.id;
    if (qtId == 'quoteCard'){
        qtText = qt.value;
    } else if (qtId == "comboCard"){
        qtText = JSON.parse(qt.value)
        qtText = qtText.textQuote;
        comboCard =true;
    } else {
        qtText = qt;
    }

    //Handle ControlKey
    if (cntrlIsPressed && !comboCard){
        var index = arrSavedQuotes.indexOf(qtText);  
        if (index > -1) {
            arrSavedQuotes.splice(index, 1);
            quoteStr = quoteTextEl.text();
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
    }
    loadQuotes();
}

////////////////////////
var savedCombosEl = $('#savedCombos');
var arrCombos = JSON.parse(localStorage.getItem('arrCombos')) || [];
var saveComboBtn = $('#save-combo');
saveComboBtn.on('click', saveCombo);
loadCombo();

function loadCombo(){
    savedCombosEl.empty();
    for (i=0;i < arrCombos.length; i++){
        var cardEl = $("<button>");
        cardEl.attr("id", "comboCard");
        cardEl.attr("onclick", 'setCombo(this)');
        cardEl.attr("value", JSON.stringify(arrCombos[i]));
        cardEl.addClass('lg:w-1/3 sm:w-1/2 p-4');
        var mainEl = $("<div>");
        mainEl.addClass("flex relative");
        var picEl = $("<img>");
            picEl.attr("alt", "completed meme");
            picEl.addClass('absolute inset-0 w-full h-full object-cover object-center');
            picEl.attr("src",arrCombos[i].imgSrc);
        var hoverEl = $("<div>");
            hoverEl.addClass("px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100");
        var authEl = $("<h1>");
            authEl.addClass("title-font text-lg font-medium text-white mb-3");
        var authorSplit = arrCombos[i].textQuote.split(" - ");
            authEl.text(authorSplit[1]);
        var quoteEl = $("<p>");
            quoteEl.addClass("leading-relaxed");
            quoteEl.text(authorSplit[0]);

        hoverEl.append(authEl);
        hoverEl.append(quoteEl);
        mainEl.append(picEl);
        mainEl.append(hoverEl)
        cardEl.append(mainEl);
        savedCombosEl.append(cardEl);
    }
}

function saveCombo(){
    var imgSource = imageEl.attr("src");
    var quoteTxt = quoteTextEl.text();
    var exists = false;

    for (i=0; i < arrCombos.length; i ++) {
        if (arrCombos[i].imgSrc == imgSource && arrCombos[i].textQuote == quoteTxt){
            exists = true;
        }
    }

    if (imgSource && quoteTxt && !exists){
        var comboObj = {imgSrc: imgSource, textQuote:quoteTxt}
        arrCombos.push(comboObj);
    }

    localStorage.setItem('arrCombos',JSON.stringify(arrCombos));
    loadCombo();
}

function setCombo(cmb){
    setImage(cmb);
    setQuote(cmb);

    var cmbObj = JSON.parse(cmb.value);
    var img = cmbObj.imgSrc;
    var txt = cmbObj.textQuote;
    var index;

    if (cntrlIsPressed){
        for (i=0; i<arrCombos.length; i++){
                if (arrCombos[i].imgSrc == img && arrCombos[i].textQuote == txt) {
                    index = i;
                    break;
                }
        }
        arrCombos.splice(index, 1);
        localStorage.setItem('arrCombos',JSON.stringify(arrCombos));
        loadCombo();


    }
}







