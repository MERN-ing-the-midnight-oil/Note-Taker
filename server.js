const express = require("express");
const uuid = require("./Helpers/uuid");
const app = express(); //"app" is now a router
//assigns PORT depending on if deployed heroku or used locally
const PORT = process.env.PORT || 3001;
const apiRoutes = require("./routes/apiRoutes.js");
const htmlRoutes = require("./routes/htmlRoutes.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware needed to parse JSON and urlencoded
//takes a post request, looks at the body of the request, sees tht it is json content type, converts it to a json object on the request. now req.body becomes a proper json object from the incoming bits and bites.

app.use(express.static("public")); //

//This tells express to use htmlRoutes if it sees "/" in the URL.
app.use("/", htmlRoutes);
//This tells express to use apiRoutes if it sees /api in the URL. "/api"" gets carried forward to apiRoutes file and will be implied as a prefix for any paths found there.
app.use("/api", apiRoutes);

app.listen(
	//actually starts express, very necessary.
	PORT,
	() =>
		console.log(
			`App is listening at http://localhost:${PORT}` //test
		)
);
