//					بسم الله الرحمن الرحيم

const 	node_path= '../../node-v16.13.0-win-x64/node_modules/',
		express= require(node_path+ 'express'),
		app= express(),
		//path = require('path'),
		cookieParser= require(node_path+ 'cookie-parser'),
		session = require(node_path+ 'express-session'),
		colors= require(node_path+ 'colors'),
		port = process.env.PORT || process.argv[2] || 8000;

//app.set('views', path.join(__dirname, 'vuejs'))
app.set('views', __dirname)
//.set('trust proxy', 1) // trust first proxy, nginx 
.use(express.static(__dirname))
.use(express.urlencoded({extended: false})) // parse application/x-www-form-urlencoded
.use(express.json()) // parse application/json
.use(session({
	secret: "mysecret",
	cookie: {
		//secure: true,
		maxAge: 1000* 60* 5		// 5mn
	},
	saveUninitialized: true,
	resave: false,
	sameSite: true
}))
.use(cookieParser("mysecret"))
.get('/', (req, res)=> res.render('index.html'))
.post('/login.html', (req, res)=> {
	req.session.myuserid= req.body.username;
	res.send("Hey there, welcome <a href=\'/logout'>click to logout</a>");
	console.log(req.session);
})
.get('/logout', (req, res)=> {
	req.session.destroy();
	res.send("Session destroyed\n<a href=\'/'>click to back home</a>");
})
.get('*', (req, res)=> {	//	/(.+)/ instead * if you like regular expression
	if (req.session.myuserid)
		console.log("\nUser: "+ req.session.myuserid);
	else
		console.log("\nNot logged in yet");
	res.send(req.url);
	console.log(req.url.green.bold);
	if (req.url== "/session") {
		console.log(req.session);
		console.log(req.cookies);
		console.log(req.signedCookies);
	}
})
.listen(port, () => {
	console.log((`Server is running on http://localhost:${port}\nStart at: `+ new Date().toLocaleString()).cyan.bold);
});