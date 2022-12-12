//this destructuring chooses the methods from the helpers utility
const { readFromFile, readAndAppend } = require("../Helpers/fsUtils");

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
			title,
			text,
			note_id: uuid(), //I need to add a note_id here
		};
		//this adds the new note to the db.json file, which the client will then see with a new GET request
		readAndAppend(newNote, "./db/db.json");
		res.json(`note was added to db.json successfully 🚀`);
	} else {
		res.error("Error in adding tip");
	}
});

//put some numbers on the end of the URL while testing in insomnia
myRouter.delete("/notes/:id", (req, res) => {
	console.log(`check out this sweet DELETE req.body:`, req.body);
	res.send(`<p> you just asked to delete, Merry Christmas! </p>`);
});

module.exports = myRouter;
