// NOTE: These comments are here to help make this more readable. You'll be introduced to Express Servers in a later module in earnest.

// External Node Modules necessary to build an express server
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

// Create the server ('app'), use bodyParser as a Middleware, serve all files in the 'public' directory as static files
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// assigns the port number for the server to listen on 
const port = 3000;

// Phase 3
// Controls the probability of an error being thrown. If ERROR_RATE is 0, then
// an error will never be thrown. If ERROR_RATE is 100, then an error will
// always be thrown:
const ERROR_RATE = 0;

const getRandomInt = () => {
	// generates integer from 0 to 99:
	return Math.floor(Math.random() * Math.floor(100));
};

const potentialErrors = ['No cat for you!', 'Sad day. No kitten here.', 'Please try again!'];
// Selects random error message from potentialErrors Array, throws it.
const generateRandomError = () => {
	const i = getRandomInt();

	if (i < ERROR_RATE) {
		const errorI = i % potentialErrors.length;
		const error = potentialErrors[errorI];
		throw Error(error);
	}
};

// Kitten Object that is returned from the server
const kitten = {
	score: 0,
	comments: []
};

// Handles GET requests made to 'localhost:3000/'. sends index.html as a file to be rendered.
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});


// Handles GET requests made to localhost:3000/kitten/image'. 
app.get('/kitten/image', async (req, res) => {
	try {
		//Throws Error (if error rate is high enough)
		generateRandomError();
		// fetches cat image from this external API 
		const kittenResponse = await fetch('https://api.thecatapi.com/v1/images/search?size=small');
		// Converts to JSON
		const kittenData = await kittenResponse.json();
		// Sets score to 0
		kitten.score = 0;
		// Sets Comments to empty array
		kitten.comments = [];
		// Sets src to the url that is returned in kittenData (if you're curious, console.log(kittenData) to see what this is referring to)
		kitten.src = kittenData[0].url;
		// Sends the kitten object back to the front-end on the events page.
		res.json(kitten);
	} catch (e) {
		res.status(503).send({ message: e.message });
	}
});

// Handles PATCH Requests made to 'localhost:3000/kitten/upvote'
app.patch('/kitten/upvote', (req, res) => {
	//increments kitten's score
	kitten.score += 1;
	// sends the new score back
	res.json({ score: kitten.score });
});

// Handles PATCH Requests made to 'localhost:3000/kitten/downvote'
app.patch('/kitten/downvote', (req, res) => {
	// decrements kitten's score
	kitten.score -= 1;
	// sends the new score back
	res.json({ score: kitten.score });
});

// Handles POST requests made to '/kitten/comments'.
app.post('/kitten/comments', (req, res) => {
	// Pulls the comment from the request's body (if you're curious, console.log(req) and console.log(req.body) to see what this is in reference to)
	const comment = req.body.comment;
	// Spreads previous comments out and appends new comment to the comments array
	kitten.comments = [...kitten.comments, comment];
	// returns new comments array to front-end
	res.json({ comments: kitten.comments });
});

// Handles DELETE Requests made to '/kitten/comments/###'
app.delete('/kitten/comments/:id', (req, res) => {
	// uses .filter to remove the indicated comment
	const updatedComments = kitten.comments.filter((_, i) => i != req.params.id);
	// updates the kittens comments 
	kitten.comments = updatedComments;
	// sends those new comments back to the front-end
	res.json({ comments: kitten.comments });
});


// This is boiler plate code to start the server. this fires when you run 'npm start' in the terminal
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
