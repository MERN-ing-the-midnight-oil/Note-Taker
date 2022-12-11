const express = require("express");
const app = express(); //"app" is now a router
const PORT = 3001;
const apiRoutes = require("./routes/apiRoutes.js");
const htmlRoutes = require("./routes/htmlRoutes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware needed to parse JSON and urlencoded
//takes a post request, looks at the body of the request, sees tht it is json content type, converts it to a json object on the request. now req.body becomes a proper json object from the incoming bits and bites.

app.use(express.static("public")); //

app.use("/", htmlRoutes); //hey, express, please use htmlRoutes if you see "/" in the URL.

app.use("/api", apiRoutes); //hey express, please use apiRoutes if you see /api in the URL. "/api"" gets carried forward to apiRoutes file and will be implied as a prefix for any paths found there.

app.listen(
	//actually starts express, very necessary.
	PORT,
	() =>
		console.log(
			`Merry Christmas. This is showing that this app is listening at http://localhost:${PORT}` //test
		)
);
