// Phase 2
const startLoader = () => {
	document.querySelector('.loader').innerHTML = 'Loading...';
};

const stopLoader = () => {
	document.querySelector('.loader').innerHTML = '';
};

// Phase 3
const clearError = () => {
	document.querySelector('.error').innerHTML = '';
};

const handleResponse = (response) => {
	// Phase 2
	stopLoader();
	clearError();

	if (!response.ok) {
		throw response;
	}
	return response.json();
};

// Phase 3
const handleError = (error) => {
	// Phase 6 (Phase 3 just uses alert)
	if (error.json) {
		error.json().then((errorJSON) => {
			document.querySelector('.error').innerHTML = `Error occured: ${errorJSON.message}`;
		});
	} else {
		console.error(error);
		alert('Something went wrong. Please try again!');
	}
};

// Phase 1, 2
const fetchImage = () => {
	// Phase 2
	startLoader();

	fetch('http://localhost:3000/kitten/image')
		.then(handleResponse)
		.then((data) => {
			document.querySelector('.cat-pic').src = data.src;
			document.querySelector('.score').innerHTML = data.score;
			document.querySelector('.comments').innerHTML = '';
		})
		.catch(handleError);
};

// Phase 4
const updateImageScore = (data) => {
	const { score } = data;
	document.querySelector('.score').innerHTML = score;
};

// Phase 1
window.addEventListener('DOMContentLoaded', fetchImage);

// Phase 2
document.querySelector('#new-pic').addEventListener('click', fetchImage);

// Phase 4
document.querySelector('#upvote').addEventListener('click', () => {
	fetch('http://localhost:3000/kitten/upvote', { method: 'PATCH' })
		.then(handleResponse)
		.then(updateImageScore)
		// Handle potential errors (not just ones we intentionally throw)
		.catch(handleError);
});

// Phase 4
document.querySelector('#downvote').addEventListener('click', () => {
	fetch('http://localhost:3000/kitten/downvote', { method: 'PATCH' })
		// Showing a different approach compared to upvote
		.then((response) => {
			return response.json();
		})
		.then(updateImageScore)
		// Handle potential errors (not just ones we intentionally throw)
		.catch(handleError);
});

// Phase 5
const receiveComments = (data) => {
	const comments = document.querySelector('.comments');
	comments.innerHTML = '';
	data.comments.forEach((comment, i) => {
		const newCommentContainer = document.createElement('div');
		newCommentContainer.className = 'comment-container';

		const newComment = document.createElement('p');
		newComment.appendChild(document.createTextNode(comment));

		const deleteButton = document.createElement('button');
		deleteButton.appendChild(document.createTextNode('Delete'));
		deleteButton.className = 'delete-button';
		deleteButton.setAttribute('id', i);

		newCommentContainer.appendChild(newComment);
		newCommentContainer.appendChild(deleteButton);
		comments.appendChild(newCommentContainer);
	});
};

// Phase 5
const commentForm = document.querySelector('.comment-form');

// Phase 5
commentForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(commentForm);
	const comment = formData.get('user-comment');
	fetch('http://localhost:3000/kitten/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ comment })
	})
		.then(handleResponse)
		.then((data) => {
			commentForm.reset();
			receiveComments(data);
		})
		.catch(handleError);
});

// Bonus
document.querySelector('.comments').addEventListener('click', (event) => {
	if (event.target.tagName != 'BUTTON') return;

	fetch(`kitten/comments/${event.target.id}`, { method: 'DELETE' })
		.then(handleResponse)
		.then((data) => receiveComments(data))
		.catch(handleError);
});
