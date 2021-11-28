let carts = document.querySelectorAll('.add--cart');

let products = [
	{
		name: 'Cat Condo Design 1',
		tag: 'catcondodesign1',
		price: 5000,
		inCart: 0 
	},
	{
		name: 'Cat Condo Design 2',
		tag: 'catcondodesign2',
		price: 2500,
		inCart: 0 
	},
	{
		name: 'Cat Condo Design 3',
		tag: 'catcondodesign3',
		price: 1500,
		inCart: 0 
	}
];

for (let i=0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
		cartNumbers(products[i]);
		totalCost(products[i])
	})
}

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');

	if(productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

function cartNumbers(product) {
	
	let productNumbers = localStorage.getItem('cartNumbers');

	productNumbers = parseInt(productNumbers);

	if( productNumbers ) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.cart span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.cart span').textContent = 1;
	}

	setItems(product);
}

function setItems(product) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	
	if(cartItems != null) {

		if (cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	} else {
		product.inCart = 1;
		cartItems = {
			[product.tag]: product
		}
	}
	localStorage.setItem("productsInCart", JSON.stringify 
		(cartItems));
}

function totalCost(product) {
	// console.log("The product price is", product.price);
	let cartCost = localStorage.getItem('totalCost');
	
	console.log("My cartCost is", cartCost);
	console.log(typeof cartCost);

	if(cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);
	} else {
		localStorage.setItem("totalCost", product.price);
	}
}

function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");
	let cartCost = localStorage.getItem('totalCost');

	if (cartItems && productContainer ) {
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<div class="product">
				<i class="fas fa-times-circle"></i>
				<img src="./img/${item.tag}.jpg">
				<span>${item.name}</span>
			</div>
			<div class="price">${item.price}</div>
			<div class="quantity">
				<i class="decrease fas fa-minus-circle"></i>
				<span>${item.inCart}</span>
				<i class="increase fas fa-plus-circle"></i>
			</div>
			<div class="total">
				₱${item.inCart * item.price}.00
			</ div>
			`;	
		});

		productContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class="basketTotalTitle">
					Basket total
				</h4>
				<h4 class="basketTotal">
					₱${cartCost}.00
				</h4>
		`;

	}
}


onLoadCartNumbers();
displayCart();