//					بسم الله الرحمن الرحيم

const 	express= require('express'),
		app= express(),
		//path = require('path'),
		//cookieParser= require('cookie-parser'),
		colors= require('colors'),
		port = process.env.PORT || process.argv[2] || 8080;

//app.set('views', path.join(__dirname, 'vuejs'))
app.set('views', __dirname)
.use(express.static(__dirname))
.use(express.urlencoded({extended: false})) // parse application/x-www-form-urlencoded
//.use(express.json()) // parse application/json
//.use(cookieParser())
.get('/', (req, res)=> res.render('index.html'))
.listen(port, () => {
	console.log((`Server is running on http://localhost:${port}\nStart at: `+ new Date().toLocaleString()).cyan.bold);
	//console.log(new Date().getTimezoneOffset() / 60);
});