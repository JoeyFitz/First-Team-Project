var takeAHit = document.getElementById('submit-search')
var quoteText = document.getElementById('quote-text')
// FLICKR API

var quotes = 'https://type.fit/api/quotes'
function getQuote(){
    var quotes = 'https://type.fit/api/quotes'
    fetch(quotes)
    .then(res => res.json())
    .then(data =>{
        var i=Math.floor(Math.random() * 1642);
        console.log(data)
        quoteText.innerText = (data[i].text) +"--"+ (data[i].author)
    })
};
takeAHit.addEventListener('click', getQuote);