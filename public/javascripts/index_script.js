let glassesScrollEvent = {
    glasses: document.querySelector('.glasses'),
    glassesImageMask: document.querySelector('.glasses__image--mask'),
    glassesImageOrigin: document.querySelector('.glasses__image--origin'),
    glassesImageFront: document.querySelector('.glasses__image--front'),
    leftShadow: document.getElementsByClassName('glasses__shadow')[0],
    rightShadow: document.getElementsByClassName('glasses__shadow')[1],
    event: function(scrollY) {
        if (this.glasses.getBoundingClientRect().top < -window.innerHeight) return;
        let ratio = -0.05;

        this.glassesImageMask.style.transform = `translate(-35%, ${scrollY * ratio + -20}%)`;
        this.glassesImageOrigin.style.transform = `translate(-35%, ${scrollY * ratio + -20}%)`;
        this.glassesImageFront.style.transform = `translate(-35%, ${scrollY * ratio + -20}%)`;
        // anime({
        //     targets: ['.glasses__image--mask', '.glasses__image--origin', '.glasses__image--front'],
        //     translateY: `${scrollY * ratio}%`
        // })
        

        this.leftShadow.setAttribute("cy", scrollY * 0.01 + 67 + "%");
        this.rightShadow.setAttribute("cy", scrollY * 0.01 + 67 + "%");

        this.leftShadow.setAttribute("rx", scrollY * 0.08 + 80);
        this.rightShadow.setAttribute("rx", scrollY * 0.08 + 80);
        
        this.leftShadow.setAttribute("opacity", 0.5 - scrollY * 0.0005);
        this.rightShadow.setAttribute("opacity", 0.5 - scrollY * 0.0005);
    }
}


let sunglassesScrollEvent = {
    sunglassesImageMask: document.querySelector('.sunglasses__image--mask'),
    sunglassesImageOrigin: document.querySelector('.sunglasses__image--origin'),
    sunglassesImageFrame: document.querySelector('.sunglasses__image--frame'),
    leftShadow: document.getElementsByClassName('sunglasses__shadow')[0],
    rightShadow: document.getElementsByClassName('sunglasses__shadow')[1],
    event: function() {
        let scrollY = document.querySelector('.sunglasses').getBoundingClientRect().top;
        if (scrollY > window.innerHeight || scrollY < 0) return;
        let ratio = -0.05;

        this.sunglassesImageMask.style.transform = `translate(-35%, ${scrollY * ratio + -20}%)`;
        this.sunglassesImageOrigin.style.transform = `translate(-35%, ${scrollY * ratio + -20}%)`;
        this.sunglassesImageFrame.style.transform = `translate(-35%, ${scrollY * ratio + -20}%)`;
        this.leftShadow.setAttribute("cy", scrollY * 0.01 + 67 + "%");
        this.rightShadow.setAttribute("cy", scrollY * 0.01 + 67 + "%");
        this.leftShadow.setAttribute("rx", scrollY * 0.08 + 80);
        this.rightShadow.setAttribute("rx", scrollY * 0.08 + 80);
        this.leftShadow.setAttribute("opacity", 0.5 - scrollY * 0.0005);
        this.rightShadow.setAttribute("opacity", 0.5 - scrollY * 0.0005);
    }
}




window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    glassesScrollEvent.event(scrollY);
    sunglassesScrollEvent.event(scrollY)
})
