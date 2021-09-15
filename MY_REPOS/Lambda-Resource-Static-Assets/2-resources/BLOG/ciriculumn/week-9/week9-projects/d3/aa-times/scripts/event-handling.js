window.addEventListener('DOMContentLoaded', () => {
  const cog = document.querySelector('.fas.fa-cog');
  cog.addEventListener('click', event => {
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
});
