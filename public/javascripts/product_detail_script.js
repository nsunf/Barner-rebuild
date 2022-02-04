

document.querySelector('.btn--add-to-cart').addEventListener('click', () => {
    let productName = product_data.productName;
    let productColor = product_data.productColor;
    console.log(productName, " --- ", productColor)

    axios.post('/addToCart', {
        data: {
            productName: productName,
            productColor: productColor,
            productType: productType
        }
    })
})