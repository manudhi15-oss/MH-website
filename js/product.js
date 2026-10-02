document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const product = getProductById(productId);

    if (!product) {
        document.body.innerHTML = `
            <div style="
                min-height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                flex-direction:column;
                gap:15px;
                font-family:Arial,sans-serif;
                text-align:center;
                padding:20px;
            ">
                <h1>Product Not Found</h1>
                <p>Sorry, this product could not be found.</p>
                <a href="shop.html">Back to Shop</a>
            </div>
        `;
        return;
    }


    const productName =
        document.getElementById("productName");

    const productCategory =
        document.getElementById("productCategory");

    const productImage =
        document.getElementById("productImage");

    const productPrice =
        document.getElementById("productPrice");

    const productOldPrice =
        document.getElementById("productOldPrice");

    const productDiscount =
        document.getElementById("productDiscount");

    const productRating =
        document.getElementById("productRating");

    const productReviews =
        document.getElementById("productReviews");

    const productBadge =
        document.getElementById("productBadge");

    const addToCartButton =
        document.getElementById("addToCart");

    const wishlistButton =
        document.getElementById("addToWishlist");

    const quantityInput =
        document.getElementById("quantity");


    if (productName) {
        productName.textContent =
            product.name;
    }


    if (productCategory) {
        productCategory.textContent =
            product.categoryName;
    }


    if (productImage) {
        productImage.src =
            product.image;

        productImage.alt =
            product.name;

        productImage.onerror = () => {
            productImage.src =
                "https://placehold.co/700x800/FCE4EC/E91E63?text=Earth+%26+Essential";
        };
    }


    if (productPrice) {
        productPrice.textContent =
            formatPrice(product.price);
    }


    if (productOldPrice) {
        productOldPrice.textContent =
            formatPrice(product.oldPrice);
    }


    if (productDiscount) {
        productDiscount.textContent =
            `${product.discount}% OFF`;
    }


    if (productRating) {
        productRating.textContent =
            `★ ${product.rating}`;
    }


    if (productReviews) {
        productReviews.textContent =
            `(${product.reviews} reviews)`;
    }


    if (productBadge) {
        productBadge.textContent =
            product.badge;
    }


    const wishlistKey =
        "earthEssentialWishlist";


    function getWishlist() {

        return JSON.parse(
            localStorage.getItem(wishlistKey)
        ) || [];

    }


    function saveWishlist(wishlist) {

        localStorage.setItem(
            wishlistKey,
            JSON.stringify(wishlist)
        );

    }


    function updateWishlistCount() {

        const countElement =
            document.querySelector(".wishlist-count");

        if (!countElement) {
            return;
        }

        countElement.textContent =
            getWishlist().length;

    }


    function updateWishlistButton() {

        if (!wishlistButton) {
            return;
        }

        const wishlist =
            getWishlist();

        const isInWishlist =
            wishlist.some(
                item =>
                    Number(item.id) ===
                    Number(product.id)
            );


        wishlistButton.classList.toggle(
            "active",
            isInWishlist
        );


        wishlistButton.textContent =
            isInWishlist ? "♥" : "♡";

        wishlistButton.setAttribute(
            "aria-label",
            isInWishlist
                ? "Remove from wishlist"
                : "Add to wishlist"
        );

    }


    if (wishlistButton) {

        wishlistButton.addEventListener(
            "click",
            () => {

                let wishlist =
                    getWishlist();


                const existingProduct =
                    wishlist.find(
                        item =>
                            Number(item.id) ===
                            Number(product.id)
                    );


                if (existingProduct) {

                    wishlist =
                        wishlist.filter(
                            item =>
                                Number(item.id) !==
                                Number(product.id)
                        );

                } else {

                    wishlist.push({
                        id: product.id,
                        name: product.name,
                        category: product.category,
                        categoryName: product.categoryName,
                        subcategory: product.subcategory,
                        price: product.price,
                        oldPrice: product.oldPrice,
                        discount: product.discount,
                        rating: product.rating,
                        reviews: product.reviews,
                        badge: product.badge,
                        image: product.image
                    });

                }


                saveWishlist(wishlist);

                updateWishlistButton();

                updateWishlistCount();

            }
        );

    }


    const cartKey =
        "earthEssentialCart";


    function getCart() {

        return JSON.parse(
            localStorage.getItem(cartKey)
        ) || [];

    }


    function saveCart(cart) {

        localStorage.setItem(
            cartKey,
            JSON.stringify(cart)
        );

    }


    function updateCartCount() {

        const cartCount =
            document.querySelector(".cart-count");

        if (!cartCount) {
            return;
        }


        const cart =
            getCart();


        const totalQuantity =
            cart.reduce(
                (total, item) =>
                    total +
                    Number(item.quantity || 0),
                0
            );


        cartCount.textContent =
            totalQuantity;

    }


    function addProductToCart() {

        let cart =
            getCart();


        const existingProduct =
            cart.find(
                item =>
                    Number(item.id) ===
                    Number(product.id)
            );


        let quantity = 1;


        if (quantityInput) {

            quantity =
                Math.max(
                    1,
                    Number(quantityInput.value) || 1
                );

        }


        if (existingProduct) {

            existingProduct.quantity +=
                quantity;

        } else {

            cart.push({
                id: product.id,
                name: product.name,
                category: product.category,
                categoryName: product.categoryName,
                price: product.price,
                oldPrice: product.oldPrice,
                discount: product.discount,
                image: product.image,
                quantity: quantity
            });

        }


        saveCart(cart);

        updateCartCount();


        if (addToCartButton) {

            const originalText =
                addToCartButton.textContent;

            addToCartButton.textContent =
                "Added to Cart ✓";


            setTimeout(() => {

                addToCartButton.textContent =
                    originalText;

            }, 1500);

        }

    }


    if (addToCartButton) {

        addToCartButton.addEventListener(
            "click",
            addProductToCart
        );

    }


    const quantityMinus =
        document.getElementById("quantityMinus");

    const quantityPlus =
        document.getElementById("quantityPlus");


    if (quantityMinus && quantityInput) {

        quantityMinus.addEventListener(
            "click",
            () => {

                let quantity =
                    Number(quantityInput.value) || 1;

                quantity =
                    Math.max(1, quantity - 1);

                quantityInput.value =
                    quantity;

            }
        );

    }


    if (quantityPlus && quantityInput) {

        quantityPlus.addEventListener(
            "click",
            () => {

                let quantity =
                    Number(quantityInput.value) || 1;

                quantity += 1;

                quantityInput.value =
                    quantity;

            }
        );

    }


    updateWishlistButton();

    updateWishlistCount();

    updateCartCount();

});