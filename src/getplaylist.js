var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var _s = require('underscore.string');
var orig = require(__dirname + '/playlist.json');

/*request('http://www.xfm.co.uk/playlist/daytime', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    //console.log(html);
	console.log($('h3.track'));
	console.log('here');
	$('h3.track').each(function(i, element){
		console.log(i);
		console.log(element);
		})
	}
});*/

fs.unlinkSync(__dirname + '/debug.log');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var index = 1;
logEvent = function(m){
	log_file.write(String(index));	
	log_file.write(m);
	console.log(m);
	index = index +1 ;
};

request('http://www.xfm.co.uk/playlist/daytime', function (error, response, html) {
	var index = 0;
	var list = []
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
	
	$('.playlist_entry_info').each(function(i,item){
	
	var div = $(item).find('.artist');
	var artist = div.children(0).toString()
	if(artist == "")
	{ artist = $(item).find('.artist').text().trim() } else { artist = $(div.children(0)).text().trim()}
	
	var div2 = $(item).find('.track')
	
	var track = div2.find('span').text().trim()
	if (track == "")
	{	
		track = div2.find('a').clone().children().remove().end().text().trim();
	}
	
	//logEvent($(item).find('.artist').children(0).toString());
	
	list.push({track:track, artist: artist})

	});
	
	/*var listToDelete = []
	var listToDelete = [];
	list.forEach(function(item){
			var shouldAdd = false;
			orig.forEach(function(item2){
				if(
			
			
			});
	
	});*/	
	
	logEvent(JSON.stringify(list))
    /*$('h3.track').each(function(i, element){
		var artist = $('p.artist', this).text();
		logEvent(artist.replace(/(\r\n|\n|\r)/gm,"").trim());
    });*/
  }
});