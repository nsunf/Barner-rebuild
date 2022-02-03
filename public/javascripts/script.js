function getElementClientRect(domEl) {
    let domClientRect = domEl.getBoundingClientRect(); 
    if (domClientRect.top >= -window.innerHeight && domClientRect.top < window.innerHeight/3 * 2) {
        domEl.classList.add('fade-in--activated')
    // } else if (domClientRect.top < -window.innerHeight) {
    //     console.log("after");
    } else if (domClientRect.top >= window.innerHeight) {
        domEl.classList.remove('fade-in--activated')
    }
}


window.addEventListener('scroll', () => {
    let fadeInElements = document.getElementsByClassName('fade-in');
    for (let el of fadeInElements) {
        getElementClientRect(el);
    };
})

window.addEventListener('click', (e) => {
    let headerSearhEl = document.querySelector('.header__search');

    if (headerSearhEl.contains(e.target)) {
        headerSearhEl.classList.add('header__search--open')
    } else {
        headerSearhEl.classList.remove('header__search--open');
    }
})

