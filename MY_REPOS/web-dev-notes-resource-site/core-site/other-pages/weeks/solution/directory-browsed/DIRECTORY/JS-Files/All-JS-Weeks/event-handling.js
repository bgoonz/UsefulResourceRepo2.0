window.addEventListener('DOMContentLoaded', () => {
	const cog = document.querySelector('.fas.fa-cog');
	cog.addEventListener('click', (event) => {
		event.stopPropagation();
		document.querySelector('.pref').classList.remove('pref--hidden');
	});

	window.addEventListener('click', () => {
		document.querySelector('.pref').classList.add('pref--hidden');
	});

	const search = document.querySelector('.fa.fa-search');
	search.addEventListener('click', () => {
		const modal = document.querySelector('.search-modal');
		modal.classList.toggle('search-modal--hidden');
	});

	window.addEventListener('click', () => {
		document.querySelector('.sidebar').classList.add('sidebar--hidden');
	});

	const sidebarIcon = document.querySelector('.masthead__icon-button');
	sidebarIcon.addEventListener('click', () => {
		event.stopPropagation();
		const sidebar = document.querySelector('.sidebar');
		sidebar.classList.remove('sidebar--hidden');
	});
});
