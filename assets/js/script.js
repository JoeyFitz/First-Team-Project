const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://andruxnet-random-famous-quotes.p.rapidapi.com/?count=10&cat=famous",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "andruxnet-random-famous-quotes.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});