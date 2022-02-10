anime({
    targets: ".our-story__img--arrow-right-down",
    opacity: 1, 
    translateX: 0, 
    translateY: 0,
    duration: 1200,
    delay: 500
})

anime({
    targets: document.querySelectorAll('.our-story__svg--barcelona path'),
    translateX: 10,
    translateY: 5,
    direction: 'alternate',
    loop: true,
    delay: anime.stagger(100, {start: 500})
})

document.querySelectorAll('.flag-group').forEach((el, i) => {
    anime({
        targets: el,
        keyframes: [
            {translateY: 10, translateX: 3},
            {translateY: 0, translateX: 0}
        ],
        easing: 'easeInOutSine',
        duration: 2000 - (i * 100),
        delay: i * 100,
        loop: true
    })
})


let processBarAnime = anime({
    targets: document.querySelector('.process-bar-wrap'),
    translateY: document.querySelector('.our-process').scrollHeight - document.querySelector('.process-bar-wrap').scrollHeight,
    duration: 1000,
    easing: 'linear',
    autoplay: false
});


var cnt = 0;
function isDownScrolling(scrollY) {
    if (scrollY > cnt) {
        cnt = scrollY;
        return true;
    } else {
        cnt = scrollY;
        return false;
    }
}

var stepTmp = 0;
var isAnimating = false;

function processBarAnimation(val)  {
    let processBarWrap = document.querySelector('.process-bar-wrap');
    var marginRight;
    switch (val) {
        case 0:
            marginRight = "80%";
            break;
        case 1:
            marginRight = "53%";
            break;
        case 2: 
            marginRight = "26%";
            break;
        case 3:
            marginRight = "0%";
            break;
        default: break;
    }

    anime({
        targets: processBarWrap,
        marginRight: marginRight,
        duration: 1000,
        complete: () => {isAnimating = false}
    })
}
window.addEventListener('scroll', () => {
    let processBar = document.querySelector('.process-bar-wrap'); 
    let val = window.scrollY - processBar.offsetTop + window.innerHeight / 3;

    let result = val / (document.querySelector('.our-process').scrollHeight - document.querySelector('.process-bar-wrap').scrollHeight) * processBarAnime.duration;

    processBarAnime.seek(result)

    var campaignsLaunchedText = document.querySelector('.our-process__step--1');
    var glassesDeliveredText = document.querySelector('.our-process__step--2');
    var backersText = document.querySelector('.our-process__step--3');
    var differentCountriesText = document.querySelector('.our-process__step--4');

    var stepArr = [campaignsLaunchedText, glassesDeliveredText, backersText, differentCountriesText];

    if (isDownScrolling(window.scrollY)) {
        if ((stepTmp < 3) && (stepArr[stepTmp + 1].getBoundingClientRect().top <= window.innerHeight / 3 + 10)) {
            stepTmp++;
            isAnimating = true;
            processBarAnimation(stepTmp);
        }
    } else {
        if ((stepTmp > 0) && (stepArr[stepTmp - 1].getBoundingClientRect().top > window.innerHeight / 3 - 20)) {
            stepTmp--;
            isAnimating = true;
            processBarAnimation(stepTmp);
        }
    }
})


anime({
    targets: '.glasses--rainbow',
    keyframes: [
        {translateY: 0, delay: 500, duration: 1000},
        {translateY: -70, delay: 500, duration: 1000}
    ],
    loop: true
})

anime({
    targets: '.our-vision__text',
    keyframes: [
        {opacity: 1, delay: 500, duration: 1000},
        {opacity: 0, delay: 550, duration: 950}
    ],
    loop: true
})
