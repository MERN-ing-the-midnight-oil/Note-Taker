const path = require("path"); //need for sendfile
const router = require("express").Router();

//http://localhost:3001/ in insomnia shows index.html
router.get("/", (req, res) =>
	res.sendFile(path.join(__dirname, "../public/index.html"))
); //the file to send is one level above, in public folder

//need a router.get to point to htmlRoutes.js.
//http://localhost:3001/notes in insomnia should show the note taker feature
router.get(
	"/notes",
	(
		req,
		res //to help the notes button
	) => res.sendFile(path.join(__dirname, "../public/notes.html"))
);

module.exports = router;
