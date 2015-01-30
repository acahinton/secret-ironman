var http = require('http');

var options = {
	host: 'xfm.com',
	port: 80,
	path: '/playlist/daytime'
}

http.get(options, function(resp){
	resp.on('data', function(chunk){
		console.log(chunk);
	});
});
