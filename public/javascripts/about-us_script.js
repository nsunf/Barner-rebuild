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
    targets: [document.querySelector('.process__svg--bar rect'), document.querySelector('.process__svg--bar image')],
    translateY: 1540,
    duration: 1000,
    easing: 'linear',
    autoplay: false
});

var isAnimating = false;

window.addEventListener('scroll', () => {
    let svgEl = document.querySelector('.our-process__svg'); 
    let val = svgEl.getBoundingClientRect().top * -1;
    let maxVal = svgEl.scrollHeight - window.innerHeight;

    let result = val / maxVal * processBarAnime.duration;

    processBarAnime.seek(result)

    // 50 .. 1640
    // let offset = (1640 - 50) * val / maxVal + 50;
    // document.querySelector('.process__svg--bar image').setAttribute('y', offset - 50)
    // document.querySelector('.process__svg--bar rect').setAttribute('y', offset)


    let processBarImage = document.querySelector('.process__svg--bar image');
    let processBarRect = document.querySelector('.process__svg--bar rect');

    var campaignsLaunchedText = document.querySelector('.process__svg--campaigns-launched');
    var glassesDeliveredText = document.querySelector('.process__svg--glasses-delivered');
    var backersText = document.querySelector('.process__svg--backers');
    var differentCountriesText = document.querySelector('.process__svg--different-countries');

    if (campaignsLaunchedText.getBoundingClientRect().top >= processBarImage.getBoundingClientRect().top) {
        if (isAnimating) return ;
        anime({targets: processBarRect, duration: 800, fill: '#6668e2', width: '200px', begin: () => {isAnimating = true}, complete: () => {isAnimating = false}})
        anime({targets: processBarImage, duration: 800, fill: '#6668e2', x:'154px'})
    } else if (glassesDeliveredText.getBoundingClientRect().top >= processBarImage.getBoundingClientRect().top) {
        if (isAnimating) return ;
        anime({targets: processBarRect, duration: 800, fill: '#6668e2', width: '325px', begin: () => {isAnimating = true}, complete: () => {isAnimating = false}})
        anime({targets: processBarImage, duration: 800, fill: '#6668e2', x:'279px'})
    } else if (backersText.getBoundingClientRect().top >= processBarImage.getBoundingClientRect().top) {
        if (isAnimating) return ;
        anime({targets: processBarRect, duration: 800, fill: '#5254c0', width: '450px', begin: () => {isAnimating = true}, complete: () => {isAnimating = false}})
        anime({targets: processBarImage, duration: 800, fill: '#5254c0', x:'404px'})
    } else if (differentCountriesText.getBoundingClientRect().top >= processBarImage.getBoundingClientRect().top) {
        if (isAnimating) return ;
        anime({targets: processBarRect, duration: 800, fill: '#3e409f', width: '575px', begin: () => {isAnimating = true}, complete: () => {isAnimating = false}})
        anime({targets: processBarImage, duration: 800, fill: '#3e409f', x:'529px'})
    } else {
        if (isAnimating) return ;
        anime({targets: processBarRect, duration: 800, fill: '#2a2b7d', width: '700px', begin: () => {isAnimating = true}, complete: () => {isAnimating = false}})
        anime({targets: processBarImage, duration: 800, fill: '#2a2b7d', x:'654px'})
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