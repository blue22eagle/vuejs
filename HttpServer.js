//					بسم الله الرحمن الرحيم

const http = require('http'),
	url = require('url'),
	fs = require('fs'),
	path = require('path'),
	colors= require('colors'),
	port = process.env.PORT || process.argv[2] || 8080;

http.createServer(function (req, res) {
	if (req.url== "/")
		req.url= "/index.html";
	// parse URL
	const parsedUrl = url.parse(req.url);
	// extract URL path
	let pathname = `.${parsedUrl.pathname}`;
	console.log(pathname.green.bold);
	// based on the URL path, extract the file extension. e.g. .js, .doc, ...
	const ext = path.parse(pathname).ext;
	// maps file extension to MIME typere
	const map = {
		'.ico': 'image/x-icon',
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.json': 'application/json',
		'.css': 'text/css',
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.wav': 'audio/wav',
		'.mp3': 'audio/mpeg',
		'.svg': 'image/svg+xml',
		'.pdf': 'application/pdf',
		'.zip': 'application/zip',
		'.doc': 'application/msword',
		'.eot': 'application/vnd.ms-fontobject',
		'.ttf': 'application/x-font-ttf',
	};

	fs.exists(pathname, function (exist) {
		if(!exist) {
		// if the file is not found, return 404
		res.statusCode = 404;
		res.end(`File ${pathname} not found!`);
		return;
		}

		// if is a directory search for index file matching the extension
		if (fs.statSync(pathname).isDirectory()) pathname += '/index'+ ext;

		// read file from file system
		fs.readFile(pathname, function(err, data){
			if(err){
				res.statusCode = 500;
				res.end(`Error getting the file: ${err}.`);
			} else {
			// if the file is found, set Content-type and send data
			res.setHeader('Content-type', map[ext] || 'text/plain' );
			res.end(data);
			}
		});
	});
}).listen(port, () => {
	console.log((`Server is running on http://localhost:${port}\nStart at: `+ new Date().toLocaleString()).cyan.bold);
	//console.log(new Date().getTimezoneOffset() / 60);
});