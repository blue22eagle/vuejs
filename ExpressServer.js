//					بسم الله الرحمن الرحيم

const 	express= require('express'),
		app= express(),
		//path = require('path'),
		cookieParser= require('cookie-parser'),
		session = require('express-session'),
		colors= require('colors'),
		port = process.env.PORT || process.argv[2] || 8080;

//app.set('views', path.join(__dirname, 'vuejs'))
app.set('views', __dirname)
.use(express.static(__dirname))
.use(express.urlencoded({extended: false})) // parse application/x-www-form-urlencoded
.use(express.json()) // parse application/json
.use(session({
	secret: "mysecret",
	cookie: {maxAge: 1000* 60},
	saveUninitialized: true,
	resave: false,
	secure: true,
	sameSite: true
}))
.use(cookieParser())
.get('/', (req, res)=> res.render('index.html'))
.post('/login.html', (req, res)=> {
	req.session.userid= req.body.username;
	res.send("Hey there, welcome <a href=\'/logout'>click to logout</a>");
	console.log(req.session);
})
.get('/logout', (req, res)=> {
	req.session.destroy();
	res.send("Session destroyed\n<a href=\'/'>click to back home</a>");
})
.get(/(.+)/, (req, res)=> {
	if (req.session.userid)
		console.log("\nUser: "+ req.session.userid);
	else
		console.log("\nNot loged in yet");
	res.send(req.url);
	console.log(req.url.green.bold);
	if (req.url== "/session")
		console.log(req.session);
})
.listen(port, () => {
	console.log((`Server is running on http://localhost:${port}\nStart at: `+ new Date().toLocaleString()).cyan.bold);
	//console.log(new Date().getTimezoneOffset() / 60);
});