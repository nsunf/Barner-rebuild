anime({
    targets: ".top__image--glasses",
    keyframes: [
    { translateY: -50, delay: 2000},
    { translateY: 0 }
    ],
    // direction: "alternate",
    // duration: "500ms",
    delay: "500ms",
    easing: "easeInOutCubic",
    loop: true
})


document.querySelector('.nav__btn--sort').addEventListener('click', () => {
    document.querySelector('.option-wrap').classList.toggle("folded")
})



function productGrid(dataList) {
    var result = [];
    for (var data of dataList) {
        let cellNode = document.createElement('div');
        let cellLinkNode = document.createElement('a');
        let cellProductImgNode = document.createElement('img');
        let cellContextNode = document.createElement('div');
        let contextTextNameNode = document.createElement('span')
        let contextTextPriceNode = document.createElement('span')
        let contextTextColorNode = document.createElement('span')
        let nameText = document.createTextNode(data.productName);
        let priceText = document.createTextNode(data.productPrice);
        let colorText = document.createTextNode(data.productColor);

        cellNode.classList.add('cell', 'flex--center');
        cellLinkNode.classList.add('cell__link');
        cellProductImgNode.classList.add('cell__product-img');
        cellContextNode.classList.add('cell__context');
        contextTextNameNode.classList.add('context__text', 'context__text--name')
        contextTextPriceNode.classList.add('context__text', 'context__text--price')
        contextTextColorNode.classList.add('context__text', 'context__text--color')
        
        var link; 
        var imgPath;
        if (title == "Eyeglasses") {
            link = "/product/" + title + "/" + data.productName.replace("í", "i").replace(" ", "_") + "/" + data.productColor.replace(" ", "_");
            imgPath = "../images/glasses/" + data.productName.replace(" ", "_") + "_" + data.productColor.replace(" ", "_") + "_front.jpg";
        } else {
            link = "/product/" + title + "/" + data.productName.replace("í", "i").replace(" ", "_") + "/" + data.productColor.replace(" ", "_");
            imgPath = "../images/sunglasses/" + data.productName.replace(" ", "_") + "_" + data.productColor.replace(" ", "_") + "_front.jpg";
        }
        cellLinkNode.setAttribute('href', link);
        cellProductImgNode.setAttribute('src', imgPath);

        cellNode.appendChild(cellLinkNode);
        cellLinkNode.appendChild(cellProductImgNode);
        cellLinkNode.appendChild(cellContextNode);
        cellContextNode.appendChild(contextTextNameNode);
        cellContextNode.appendChild(contextTextPriceNode);
        cellContextNode.appendChild(contextTextColorNode);
        contextTextNameNode.appendChild(nameText);
        contextTextPriceNode.appendChild(priceText);
        contextTextColorNode.appendChild(colorText);

        result.push(cellNode);
    }
    return result;
}

var productsCellArray = productGrid(productList);



function loadProductsGrid(array, sortOption) {
    var sortedArr;
    switch (sortOption) {
        case 0:
            sortedArr = array.sort((x, y) => { if (x.querySelector('.context__text--name').innerText >= y.querySelector('.context__text--name').innerText) { return 1 } else { return -1 } });
            break;
        case 1:
            sortedArr = array.sort((x, y) => { if (x.querySelector('.context__text--name').innerText <= y.querySelector('.context__text--name').innerText) { return 1 } else { return -1 } });
            break;
        case 2:
            sortedArr = array.sort((x, y) => { if (x.querySelector('.context__text--price').innerText <= y.querySelector('.context__text--price').innerText) { return 1 } else { return -1 } });
            break;
        case 3: 
            sortedArr = array.sort((x, y) => { if (x.querySelector('.context__text--price').innerText >= y.querySelector('.context__text--price').innerText) { return 1 } else { return -1 } });
            break;
        default:
            sortedArr = array
            break;
    } 

    let bodyProductsList = document.querySelector('.body__products-list');
    let productsListInner = document.createElement('div');
    productsListInner.classList.add('products-list__inner');

    bodyProductsList.appendChild(productsListInner)

    sortedArr.forEach(el => productsListInner.appendChild(el))
}

function removeProductsGrid() {
    let productsListInner = document.querySelector('.products-list__inner');
    productsListInner.remove();
}



let sortOptionEls = document.querySelectorAll('.option__item');

sortOptionEls.forEach((el) => {
    el.addEventListener('click', function() {
        if (el.classList.contains('option__item--selected')) return;
        let selectedOptionItem = document.querySelectorAll('.option__item--selected'); 

        selectedOptionItem.forEach(item => item.classList.remove('option__item--selected'));
        el.classList.add('option__item--selected');

        removeProductsGrid();
        loadProductsGrid(productsCellArray, Number(el.dataset.index))
    })
})

window.addEventListener('load', () => {
    loadProductsGrid(productsCellArray, 0);
})