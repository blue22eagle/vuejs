//					بسم الله الرحمن الرحيم

const 	express= require('express'),
		app= express(),
		url = require('url'),
		fs = require('fs'),
		path = require('path'),
		cookieParser= require('cookie-parser'),
		colors= require('colors'),
		port = process.env.PORT || process.argv[2] || 8080;

app.set('views', path.join(__dirname, 'vuejs'))
.use(express.static(path.join(__dirname, 'vuejs')))
.use(express.json()) // parse application/json
.use(express.urlencoded({extended: false})) // parse application/x-www-form-urlencoded
.use(cookieParser())
.get('/', (req, res)=> res.render('vuejs/index.html'))
.listen(port, () => {
	console.log((`Server is running on http://localhost:${port}\nStart at: `+ new Date().toLocaleString()).cyan.bold);
	//console.log(new Date().getTimezoneOffset() / 60);
});