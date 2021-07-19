var takeAHit = $('#submit-search');
var quoteText = $('#quote-text');
var image = $('#image');
var imageURL= "https://api.imgflip.com/get_memes";

function getImage(){
    fetch(imageURL)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        var i=Math.floor(Math.random() * data.data.memes.length);
        image.attr('src', data.data.memes[i].url);
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
        quoteText.html((data[i].text) +"--"+ (data[i].author))
    })
};
takeAHit.on('click', getQuote);

