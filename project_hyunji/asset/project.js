const hamburgerBtn = document.getElementById('hamburger-menu');
const categoryMenu = document.getElementById('category-menu');

hamburgerBtn.addEventListener('click', () => {
    categoryMenu.classList.toggle('show');
});