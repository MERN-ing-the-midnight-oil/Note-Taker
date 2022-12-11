//POST, GET, PUT, DELETE (CRUD) are all HTTP methods
//A route consists of the HTTP method and the path.
//The path is the part of the route that comes after the base URL
//A route has a path segment. The garden path is the last part of your journey
/////(req) is the request object, (res) is the
// CLI type node server.js
//app is listening at http://localhost:3001

//response object the handler handles both

const express = require("express"); //express
const path = require("path"); //standard module  helps make paths work helps concatonate pieces of text to resolve to an actual file or directory. its part of nodes standard library it helps find a file
const app = express(); //express(); returns an express object
//app is existing, but not listening until for example, app.get routes are handled, or app.post, or app.put (changes existing resource) or app.delete.

const PORT = 3001;

//invokes app.use() and serve static files from the public folder.  public refers to actual file route in the server, the path would not appear in the the url or route
app.use(express.static("/public"));

//path.join concats the path and the request response to send the index.html. path.join helps resolve a physical path to my hard drive. this is responding to a request to the /send path. dirname is a way that node gives the directory of the file .
app.get("/send", (req, res) =>
	res.sendFile(path.join(__dirname, "public/send.html"))
);

app.get("/", (req, res) => res.send("Keep tha change, ya filthy animal!"));
//(req, res) is the function that handles the "order" that goes and gets what was ordered at the drive-through window.The handler might go get some data, or open a file, or process some info and return the resultant info.

//the GET fetch from the front end (client side) of Note Taker happens on line 29 of index.js and is named getNotes
//The POST fetch is found on line 38 of index.js and is named saveNote
//The DELETE fetch is found on line 45 and is named deleteNote

//an example of a GET route for a static homepage
app.get("/", (req, res) => res.sendFile("index.html"));

//example of a GET route for data
app.get("/api/data", (req, res) => res.json(reviewData));

//this lets us know that we are listening at a port// console.log here is a callback function that happens when the function is done executing
app.listen(PORT, () =>
	console.log(`showing that this app is listening at http://localhost:${PORT}`)
);

//API HTML Routes examples
//good habit to segregate HTML from API paths
//HTML (text) example (could send a whole file instead using send file).//The body aka payload here is the HTMl snippet
app.get("/", (req, res) => {
	res.send(`<p> Merry Christmas </p>`);
});
// example that gets a JSON response. express makes the res object, express can do res.allsortsofthings not just turn things into JSON. The body here is a json object. We can see it by going to URL localhost:3001/api in a browser
app.get("api", (req, res) => {
	res.json({
		//the header here is telling the browser its json
		term: "api",
		description: "APIs are cool",
	});
});
