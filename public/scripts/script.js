let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let active = 0; // Comienza en el primer elemento

function loadShow() {
    let stt = 0;
    items.forEach((item, index) => {
        item.style.transform = `translateX(${(index - active) * 200}px) scale(${1 - Math.abs(index - active) * 0.2})`;
        item.style.zIndex = index === active ? 1 : -1;
        item.style.filter = Math.abs(index - active) > 1 ? 'blur(5px)' : 'none';
        item.style.opacity = Math.abs(index - active) > 1 ? 0 : 0.6 + (1 - Math.abs(index - active)) * 0.4;
    });
}


loadShow();

next.onclick = function () {
    active = (active + 1) % items.length; // Cambia a la siguiente imagen, y vuelve al inicio si es necesario
 
    loadShow();
    
}

prev.onclick = function () {
    active = (active - 1 + items.length) % items.length; // Cambia a la imagen anterior, y vuelve al final si es necesario
    loadShow();
}




setInterval(() => {
    active = (active + 1 + items.length) % items.length;
    loadShow();
}, 2500);