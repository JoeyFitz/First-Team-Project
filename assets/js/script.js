var takeAHit = document.getElementById('submit-search')
var quoteText = document.getElementById('quote-text')
var image = document.getElementById('image')
// var flickrAPIkey= "c0343f13505eba77ab00dd8ccc5fb87a";
var imageURL= "https://api.imgflip.com/get_memes";
// FLICKR API

function getImage(){
    fetch(imageURL)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        var i=Math.floor(Math.random() * data.data.memes.length);
        image.setAttribute('src', data.data.memes[i].url);
        console.log(data.data.memes[i]);
    })
};
takeAHit.addEventListener('click', getImage);

var quotes = 'https://type.fit/api/quotes'
function getQuote(){
    fetch(quotes)
    .then(res => res.json())
    .then(data =>{
        var i=Math.floor(Math.random() * 1642);
        console.log(data)
        quoteText.innerText = (data[i].text) +"--"+ (data[i].author)
    })
};
takeAHit.addEventListener('click', getQuote);

