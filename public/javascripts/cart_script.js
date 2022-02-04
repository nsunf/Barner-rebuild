document.querySelector(".main").style.height = window.innerHeight - document.querySelector(".header").offsetHeight + "px";

let totalPriceLabel = document.querySelector('.row__total span:last-child');
let totalPriceHead = document.querySelector('.total-price h2');

let prices = document.querySelectorAll('.row__price');

var price = 0;
prices.forEach(x => { price += Number(x.innerText.slice(1))})

totalPriceLabel.innerText = '€' + price;
totalPriceHead.innerText = '€' + price;


function deleteProduct(index) {
    let indexArr = Array.isArray(index) ? index : [index];
    console.log(indexArr)

    let formTag = document.createElement('form');
    formTag.style.display = 'hidden';
    formTag.setAttribute('method', 'post');
    formTag.setAttribute('action', '/cart/delete');

    let indexParam = document.createElement('input');
    indexParam.setAttribute('type', 'hidden');
    indexParam.setAttribute('name', 'index');
    indexParam.setAttribute('value', JSON.stringify(indexArr));

    formTag.appendChild(indexParam);

    document.body.appendChild(formTag);
    formTag.submit();
}

document.querySelector('.top__img-wrap--check-all').addEventListener('click', () => {
    if (document.querySelectorAll('.cell--checked').length == document.querySelectorAll('.cell__checkbox img').length) {
        document.querySelectorAll('.cell__checkbox img').forEach(el => {
            el.classList.remove('cell--checked');
        })
    } else {
        document.querySelectorAll('.cell__checkbox img').forEach(el => {
            el.classList.add('cell--checked');
        })
    }
})

document.querySelector('.top__img-wrap--delete-selected').addEventListener('click', () => {
    var indicies = [];
    document.querySelectorAll('.cell--checked').forEach(el => {
        indicies.push(el.parentNode.dataset.index);
    })
    deleteProduct(indicies);
})

document.querySelectorAll('.cell__checkbox img').forEach(el => {
    el.addEventListener('click', () => {
        el.classList.toggle('cell--checked');
    })
})

document.querySelectorAll('.cell__delete img').forEach(el => {
    el.addEventListener('click', function() {
        let index = this.parentNode.dataset.index;
        deleteProduct(index);
    })

    
})