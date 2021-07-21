var takeAHit = $('#submit-search');
var quoteText = $('#quote-text');
var image = $('#image');
var imageURL= "https://api.imgflip.com/get_memes";
var saveBtn = $('#save-search');

var savedQuote
var savedAuthor 
var savedUrl

function getImage(){
    fetch(imageURL)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        
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

