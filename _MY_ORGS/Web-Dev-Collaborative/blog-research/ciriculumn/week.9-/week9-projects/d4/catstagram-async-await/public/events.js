// Helper Function
const handleResponse = async (res) => {
	// I moved this code snippet into a helper function because I noticed myself duplicating this pattern a lot. 
	// Stops the 'loading' text and clears the error messages.
	stopLoader();
	clearError();
	// checks the status of the http Response. if the status is not 'ok', throw it as an error to be caught by the catch block
	if (!res.ok) {
		throw res;
	}
	// extract the JSON Data from the Response object. Note this must be done asynchronously or it will return a pending promise.
	const data = await res.json()
	// return this extracted json data. If you're curious what is happening here, console.log(data) and you should see a JavaScript Object with data inside.
	return data
};


// Phase 1 Functions 
const fetchImage = async () => {
	// sets the innerHTML to 'Loading...' while we wait for the image
	startLoader();
	// NOTE all HTTP Requests must be made within a Try/Catch block because errors will not automatically be thrown on their own.
	try {
		// await the fetch request. no method header necessary because it's a default 'GET' request.
		const res = await fetch('http://localhost:3000/kitten/image')
		// await the asynchronous helper function (see above)
		const data = await handleResponse(res)
		// set the inner html and src for various parts of the DOM, per instructions
		document.querySelector('.cat-pic').src = data.src;
		document.querySelector('.score').innerHTML = data.score;
		document.querySelector('.comments').innerHTML = '';
	}
	// This catches the thrown response object (note the helper function above) if it is not 'ok'.
	catch (e) {
		// created an external helper function to handle errors (found below).
		handleError(e)
	};
};


// Phase 2 Functions 
// I made these function calls just to extract them so the phases could be in order. Could just as easily be done in-line.
const startLoader = () => {
	document.querySelector('.loader').innerHTML = 'Loading...';
};

const stopLoader = () => {
	document.querySelector('.loader').innerHTML = '';
};


// Phase 3 Functions
const handleError = async (error) => {
	// Phase 6 (Phase 3 just uses alert)
	// this function takes in a full response object that has been thrown (by the helper function above).
	// the first thing it needs to do is extract the JSON data from it.
	const errJSON = await error.json()
	// if the JSON data is not undefined, we'll set the innerHTML of the error box to the string below (Phase 6)
	if (errJSON) {
		document.querySelector('.error').innerHTML = `Error occured: ${errJSON.message}`;
	}
	else {
		// if it is undefined, we just console.error the error and create an alert (Phase 3) 
		console.error(error);
		alert('Something went wrong. Please try again!');
	}
};

// This resets the innerHTML of the error box back to an empty string. it is called in the helper function above.
const clearError = () => {
	document.querySelector('.error').innerHTML = '';
};

// Phase 4 Functions
const vote = async (e) => {
	try {
		// I used string interpolation to retreive the event target's id and use it as the path here.
		// remember the id will be either 'upvote' or 'downvote' because that is what the HTML button's id's have been assigned as.
		// Don't believe me just console.log(e.target.id)!
		const res = await fetch(`http://localhost:3000/kitten/${e.target.id}`, {
			method: 'PATCH'
		});
		// Again, must retreive the JSON data from the http response object. this is done in the helper function above.
		const data = await handleResponse(res)
		// object destructure the scores value from the JSON data. console.log(data) to get a sense of what this looks like if you're unsure.
		const { score } = data;
		// set the innerHTML of the score box to the value retreived from the JSON object.
		document.querySelector('.score').innerHTML = score;
	}
	catch (e) {
		handleError(e)
	}
}

// Phase 5 Functions

// I put all of this in a helper function becuase it can be somewhat messy.
const receiveComments = (data) => {
	// retreive our DOM object
	const comments = document.querySelector('.comments');
	// Reset its contents to empty string
	comments.innerHTML = '';
	// 'data' is an object with a key/value pair. the key is 'comments', which points to its value: an array.
	// for each element of the array (a comment), we want to..
	data.comments.forEach((comment, i) => {
		// create a div 
		const newCommentContainer = document.createElement('div');
		// give that div a class (for styling and reference purposes)
		newCommentContainer.className = 'comment-container';
		// create a new paragraph tag
		const newComment = document.createElement('p');
		// append a new textNode to the newly created p tag
		newComment.appendChild(document.createTextNode(comment));
		// create a delete button (bonus)
		const deleteButton = document.createElement('button');
		// create a textNode to put inside of the button
		deleteButton.appendChild(document.createTextNode('Delete'));
		// give the delete button a class for styling/reference purposes
		deleteButton.className = 'delete-button';
		// give the delete button an ID, which is equal to the index of the comment within the array. console.log(i) if you're curious, they'll just be numbers
		deleteButton.setAttribute('id', i);
		// put the new comment inside of the div
		newCommentContainer.appendChild(newComment);
		// put the delete button inside of the div
		newCommentContainer.appendChild(deleteButton);
		// put the div inside of the comments DOM element referenced at the beginning.
		comments.appendChild(newCommentContainer);
	});
};

const commentForm = document.querySelector('.comment-form');

const submitComment = async (event) => {
	// Remember to prevent default event for a form submission.
	event.preventDefault();
	// create formData instance of all the data within the commentForm. 
	const formData = new FormData(commentForm);
	// retreives the value of the comment from the form. console.log these items if you are unsure of what is happening here.
	const comment = formData.get('user-comment');
	try {
		// await the response from this fetch request.
		// note it is a POST request, so it *must* contain a body.
		// since it contains a body, it needs a header telling the server what sort of data is contained within the body.
		const res = await fetch('http://localhost:3000/kitten/comments', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ comment })
		});
		// extract json with helper function above
		const data = await handleResponse(res)
		// this is a built-in method on Forms that clears the values of all the form inputs.
		// We do this after a user submits the form and we retreive their data so their input does not simply remain on the screen
		commentForm.reset();
		// pass this data to the helper function above, which takes care of everything within the DOM.
		receiveComments(data);
	}
	catch (e) {
		handleError(e)
	}
}


// Bonus Function
const deleteComment = async (event) => {
	//The tagName property returns the tag name of the element.
	// In HTML, the returned value of the tagName property is always in UPPERCASE.
	// this if statement is here to ensure that this function only fires if the user clicks on a button. 
	if (event.target.tagName != 'BUTTON') return;
	try {
		// await the fetch call to the id (remember above when creating the comments we gave them an id of i, i.e. their index value within the array)
		// we pass in the number here, which the server will recognize as an 'id' value within the params, thanks to the wildcard value on the backend (see this in the delete route within index.js)
		const res = await fetch(`kitten/comments/${event.target.id}`, { method: 'DELETE' })
		// handle the response with helper function above
		const data = await handleResponse(res)
		// pass this data into the receiveComments helper function to rebuild our comments array, which will now not contain the deleted comment.
		// If you're thinking to yourself "this seems inefficient"... you're right! You'll learn more efficient ways of interacting with the DOM soon :) 
		receiveComments(data)
	}
	catch (e) {
		handleError(e)
	}

}

//EVENT LISTENERS
// All of these establish the event listeners for the items on the DOM. we pass in reference to functions created above.
// Note these are REFERENCES to the functions. the functions are not invoked in-line within the event-listener.
// Window DOM
window.addEventListener('DOMContentLoaded', fetchImage);
// New Pic Button Click 
document.querySelector('#new-pic').addEventListener('click', fetchImage);
// Upvote Button Click
document.querySelector('#upvote').addEventListener('click', vote);
// Downvote Button Click
document.querySelector('#downvote').addEventListener('click', vote);
// Comment Form Submssion
commentForm.addEventListener('submit', submitComment);
// Delete Comment Button Click
document.querySelector('.comments').addEventListener('click', deleteComment);