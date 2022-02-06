
function getElementClientRect(domEl) {
    let domClientRect = domEl.getBoundingClientRect(); 
    if (domClientRect.top >= -window.innerHeight && domClientRect.top < window.innerHeight/4 * 3) {
        domEl.classList.add('fade-in--activated')
    // } else if (domClientRect.top < -window.innerHeight) {
    //     console.log("after");
    } else if (domClientRect.top >= window.innerHeight) {
        domEl.classList.remove('fade-in--activated')
    }
}

function searchBtnTapped(e) {
    let headerSearhEl = document.querySelector('.header__search');
    let searchResult = document.querySelector('.search-result');

    if (headerSearhEl.contains(e.target) || searchResult.contains(e.target)) {
        headerSearhEl.classList.add('header__search--open')
        searchResult.classList.add('search-result--open');
        document.querySelector('.header__search input').focus();
    } else {
        headerSearhEl.classList.remove('header__search--open');
        searchResult.classList.remove('search-result--open');
        document.querySelector('.header__search input').blur();
    }
}

function updateSearchResult(data, isSun) {
    for (var product of data) {
        let cellNode = document.createElement('a');
        cellNode.classList.add('search-result__cell');
        cellNode.classList.add('cell');
        cellNode.setAttribute('href', "/product/" + (isSun ? "Sunglasses" : "Eyeglasses") + "/" + product.productName.replace("í", "i").replace(" ", "_") + "/" + product.productColor.replace(" ", "_"))
        

        let nameSpan = document.createElement('span');
        let priceSpan = document.createElement('span');
        nameSpan.classList.add('cell__text');
        nameSpan.classList.add('cell__text--name');
        priceSpan.classList.add('cell__text');
        priceSpan.classList.add('cell__text--price');
        nameSpan.innerText = product.productName + ' - ' + product.productColor; 
        priceSpan.innerText = product.productDisCountedPrice ? product.productDisCountedPrice : product.productPrice;  

        cellNode.appendChild(nameSpan);
        cellNode.appendChild(priceSpan);

        document.querySelector('.search-result').appendChild(cellNode)
    }
}


window.addEventListener('scroll', () => {
    let fadeInElements = document.getElementsByClassName('fade-in');
    for (let el of fadeInElements) {
        getElementClientRect(el);
    };
})

window.addEventListener('click', searchBtnTapped)
window.addEventListener('touchend', searchBtnTapped)

document.querySelector('.header__search input').addEventListener('input', function() {
    let searchResult = document.querySelector('.search-result');
    searchResult.innerHTML = '';

    if (this.value) {
        axios.post('/glasses/search', {
            data: {
                value: this.value
            }
        }).then(response => {
            updateSearchResult(response.data.glasses, false);
            updateSearchResult(response.data.sunglasses, true);
        })
    }
})