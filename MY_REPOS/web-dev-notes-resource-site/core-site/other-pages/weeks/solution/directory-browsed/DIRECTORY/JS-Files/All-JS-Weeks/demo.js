window.addEventListener('DOMContentLoaded', () => {
	const addAppleBtn = document.querySelector('.basket-controls__add-apple');
	const addOrangeBtn = document.querySelector('.basket-controls__add-orange');
	const removeOldestBtn = document.querySelector('.basket-controls__remove-oldest');
	const removeNewestBtn = document.querySelector('.basket-controls__remove-newest');
	const basket = document.querySelector('.basket');

	const fruits = [];

	addAppleBtn.addEventListener('click', (e) => {
		fruits.push('🍎');

		drawBasket();
	});

	addOrangeBtn.addEventListener('click', (e) => {
		fruits.push('🍊');

		drawBasket();
	});

	removeOldestBtn.addEventListener('click', (e) => {
		fruits.shift();

		drawBasket();
	});

	removeNewestBtn.addEventListener('click', (e) => {
		fruits.pop();

		drawBasket();
	});

	function drawBasket() {
		basket.innerHTML = '';
		fruits.forEach((fruit) => {
			const addedFruit = document.createElement('p');
			addedFruit.className = 'basket__fruit';
			addedFruit.innerHTML = fruit;
			basket.appendChild(addedFruit);
		});

		if (fruits.length >= 8) {
			basket.classList.add('basket--full');
			addAppleBtn.classList.add('basket-controls__add-apple--full');
			addOrangeBtn.classList.add('basket-controls__add-orange--full');

			// // To prevent clicking, we can use the 'disabled' attribute
			// addAppleBtn.setAttribute('disabled', true);
			// addOrangeBtn.setAttribute('disabled', true);
		} else if (fruits.length === 0) {
			removeOldestBtn.classList.add('basket-controls__remove-oldest--empty');
			removeNewestBtn.classList.add('basket-controls__remove-newest--empty');

			// // To prevent clicking, we can use the 'disabled' attribute
			// removeOldestBtn.setAttribute('disabled', true);
			// removeNewestBtn.setAttribute('disabled', true);
		} else {
			basket.classList.remove('basket--full');
			addAppleBtn.classList.remove('basket-controls__add-apple--full');
			addOrangeBtn.classList.remove('basket-controls__add-orange--full');
			removeOldestBtn.classList.remove('basket-controls__remove-oldest--empty');
			removeNewestBtn.classList.remove('basket-controls__remove-newest--empty');

			// // Re-enable clicking by removing the 'disabled' attribute
			// addAppleBtn.removeAttribute('disabled');
			// addOrangeBtn.removeAttribute('disabled');
			// removeOldestBtn.removeAttribute('disabled');
			// removeNewestBtn.removeAttribute('disabled');
		}
	}

	// I'm invoking this function on DOMContentLoaded to ensure the initial 'empty' modifiers and 'disabled' attributes are applied. This can be done directly in the HTML as a starting state as well.
	drawBasket();
});
