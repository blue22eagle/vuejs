//					بسم الله الرحمن الرحيم

const 	express= require('express'),
		app= express(),
		//path = require('path'),
		cookieParser= require('cookie-parser'),
		session = require('express-session'),
		colors= require('colors'),
		port = process.env.PORT || process.argv[2] || 8080;

var sess; // global session, NOT recommended
//app.set('views', path.join(__dirname, 'vuejs'))
app.set('views', __dirname)
.use(express.static(__dirname))
.use(express.urlencoded({extended: false})) // parse application/x-www-form-urlencoded
.use(express.json()) // parse application/json
.use(session({
	secret: "mysecret",
	cookie: {maxAge: 1000* 60},
	saveUninitialized: true,
	resave: false
}))
.use(cookieParser())
.get('/', (req, res)=> res.render('index.html'))
.get(/(.+)/, (req, res)=> {
	req.session.userid= req.url;
	res.send(req.url);
	console.log(req.url.green.bold);
})
.get('/logout', (req, res)=> {
	req.session.destroy();
	res.send("Session destroyed");
})
.listen(port, () => {
	console.log((`Server is running on http://localhost:${port}\nStart at: `+ new Date().toLocaleString()).cyan.bold);
	//console.log(new Date().getTimezoneOffset() / 60);
});