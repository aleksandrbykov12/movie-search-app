const btnColorModeNode = document.querySelector('.color-mode');
const htmlNode = document.querySelector('html');
const prefersColorTheme = window.matchMedia('(prefers-color-scheme: dark)');

btnColorModeNode.addEventListener('click', (event) => {
    event.preventDefault();
    htmlNode.classList.toggle('light');
});

if (!prefersColorTheme.matches) {
    htmlNode.classList.toggle('light');
};