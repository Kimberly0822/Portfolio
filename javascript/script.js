/* Dark mode function */
function myFunction() {
    const element = document.body;
    element.classList.toggle("dark-mode");
}

/* Font size */
function changeFontSize(elem, change) {
    const curFontSize = parseInt(getComputedStyle(elem).fontSize);

    const newFontSize = curFontSize + change;

    elem.style.fontSize = String(newFontSize) + 'px';
    return getComputedStyle(elem).fontSize;
}

window.addEventListener('load', function() {
    const p = document.body;
    const btnIncrease = document.getElementById('increase');
    const btnDecrease = document.getElementById('decrease');

btnIncrease.addEventListener('click', function() {
    const fontSize = changeFontSize(p, 1);
    console.log(fontSize);
    });

btnDecrease.addEventListener('click', function() {
    const fontSize = changeFontSize(p, -1);
    console.log(fontSize);
    });
})

