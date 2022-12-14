//this destructuring chooses the methods from the helpers utility
const fs = require("fs");
const { readFromFile, readAndAppend } = require("../Helpers/fsUtils");
//makes a random number that can be used as a note id.
const uuid = require("../Helpers/uuid");
//just need a router definition,
const myRouter = require("express").Router();

// This reasds the db.json file and returns all saved notes as JSON. the path "/notes" below is actually shorthand for "/api/notes" because we're in the apiRoutes file, which is referred to in server.js as :  app.use("/api", apiRoutes);//res.json(JSON.parse(thingToGiveClient)));   means put the previous into a res object in json format which will be a parsed version of thingToGiveClient. readFromFile is located in  the helper utility.
myRouter.get("/notes", (req, res) => {
	readFromFile("./db/db.json").then((thingToGiveClient) =>
		res.json(JSON.parse(thingToGiveClient))
	);
});
//this receives a new note to save on the request body
myRouter.post("/notes", (req, res) => {
	console.log(`check out this sweet POST req.body:`, req.body);
	//destructuring assignment. what happens here is the req.body object is getting broken apart in to its individual properties, or at least, the ones we want. I'm assuming that req.body has a title and text properties?
	const { title, text } = req.body;
	if (req.body) {
		const newNote = {
			title, //this title is coming from the request body
			text, //this text is coming from the request body
			id: uuid(), //this id number is being generated on the fly by uuid()
		};
		//this adds the new note to the db.json file, which the client will then see with a new GET request
		readAndAppend(newNote, "./db/db.json");
		res.json(`note was added to db.json successfully 🚀`);
	} else {
		res.error("Error in adding note");
	}
});

//handles delete requests from the frontend application (user clicks the delete button). Reads the current notes and rewrites only the notes that don't match the ID of the note to be deleted.
myRouter.delete("/notes/:id", (req, res) => {
	readFromFile("./db/db.json").then((data) => {
		let array = JSON.parse(data);
		let newArray = [];
		for (let i = 0; i < array.length; i++) {
			//build the array one at a time, leaving out the deleted one.
			if (array[i].id !== req.params.id) {
				newArray.push(array[i]);
			}
		}
		//fs writeFile needs the response. if there is an error, then get an error. the callback function provides an error or result.
		fs.writeFile("./db/db.json", JSON.stringify(newArray), (err, data) => {});
	});
	//add a response
	res.json("Your note has been deleted");
});
module.exports = myRouter;
