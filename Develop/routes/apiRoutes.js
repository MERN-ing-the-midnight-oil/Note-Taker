//this destructuring chooses the methods from the helpers utility
const { readFromFile, readAndAppend } = require("../Helpers/fsUtils");

//just need a router definition,
const myRouter = require("express").Router();

// the path "/notes" below is actually shorthand for "/api/notes" because we're in the apiRoutes file, referred to in server.js as :  app.use("/api", apiRoutes);//res.json(JSON.parse(thingToGiveClient)));   means put the previous into a res object in json format which will be a parsed version of thingToGiveClient. readFromFile is located in  the helper utility.
myRouter.get("/notes", (req, res) => {
	readFromFile("./db/db.json").then((thingToGiveClient) =>
		res.json(JSON.parse(thingToGiveClient))
	);
});

myRouter.post("/notes", (req, res) => {
	console.log(`check out this sweet POST req.body:`, req.body);
	const { title, text } = req.body; //destructuring assignment. what happens here is the req.body object is getting broken apart in to its individual properties, or at least, the ones we want. I'm assuming that req.body has a title and text properties?

	if (req.body) {
		const newNote = {
			title,
			text,
		};
		readAndAppend(newNote, "./db/db.json");
		res.json(`note added successfully 🚀`);
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
