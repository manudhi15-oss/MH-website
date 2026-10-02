document.addEventListener("DOMContentLoaded", () => {

    const cartKey = "earthEssentialCart";

    const cartProducts = document.getElementById("cartProducts");
    const cartLayout = document.getElementById("cartLayout");
    const cartEmpty = document.getElementById("cartEmpty");

    const cartItemCount = document.getElementById("cartItemCount");
    const cartSubtotal = document.getElementById("cartSubtotal");
    const cartShipping = document.getElementById("cartShipping");
    const cartTotal = document.getElementById("cartTotal");
    const cartShippingMessage = document.getElementById("cartShippingMessage");

    const clearCartButton = document.getElementById("clearCart");
    const checkoutButton = document.getElementById("checkoutButton");


    function getCart() {

        try {

            return JSON.parse(
                localStorage.getItem(cartKey)
            ) || [];

        } catch (error) {

            return [];

        }

    }


    function saveCart(cart) {

        localStorage.setItem(
            cartKey,
            JSON.stringify(cart)
        );

    }


    function formatPrice(price) {

        return "₹" +
            Number(price || 0).toLocaleString("en-IN");

    }


    function getTotalQuantity(cart) {

        return cart.reduce(
            (total, item) => {

                return total +
                    (Number(item.quantity) || 0);

            },
            0
        );

    }


    function getSubtotal(cart) {

        return cart.reduce(
            (total, item) => {

                const price =
                    Number(item.price) || 0;

                const quantity =
                    Number(item.quantity) || 0;

                return total +
                    (price * quantity);

            },
            0
        );

    }


    function getShipping(subtotal) {

        if (subtotal <= 0) {
            return 0;
        }

        if (subtotal >= 999) {
            return 0;
        }

        return 49;

    }


    function updateHeaderCartCount(cart) {

        const cartCount =
            document.querySelector(".cart-count");

        if (!cartCount) {
            return;
        }

        cartCount.textContent =
            getTotalQuantity(cart);

    }


    function renderCart() {

        const cart = getCart();


        if (!cartProducts) {
            return;
        }


        if (cart.length === 0) {

            cartProducts.innerHTML = "";

            if (cartLayout) {
                cartLayout.style.display = "none";
            }

            if (cartEmpty) {
                cartEmpty.style.display = "block";
            }

            updateSummary([]);

            updateHeaderCartCount([]);

            return;

        }


        if (cartLayout) {
            cartLayout.style.display = "grid";
        }

        if (cartEmpty) {
            cartEmpty.style.display = "none";
        }


        cartProducts.innerHTML =
            cart.map(item => {

                const quantity =
                    Number(item.quantity) || 1;

                const price =
                    Number(item.price) || 0;

                const oldPrice =
                    Number(item.oldPrice) || 0;

                const total =
                    price * quantity;


                return `

                    <article
                        class="cart-product"
                        data-product-id="${item.id}"
                    >

                        <div class="cart-product-image">

                            <img
                                src="${item.image || ""}"
                                alt="${item.name || "Product"}"
                                onerror="this.src='https://placehold.co/300x350/FCE4EC/E91E63?text=Earth+%26+Essential'"
                            >

                        </div>


                        <div class="cart-product-info">

                            <p class="cart-product-category">
                                ${item.categoryName || item.category || "Beauty"}
                            </p>

                            <h3>
                                ${item.name || "Product"}
                            </h3>


                            <div class="cart-product-price">

                                <strong>
                                    ${formatPrice(price)}
                                </strong>

                                ${
                                    oldPrice > price
                                    ? `<del>${formatPrice(oldPrice)}</del>`
                                    : ""
                                }

                            </div>


                            <div class="cart-product-actions">

                                <div class="quantity-control">

                                    <button
                                        type="button"
                                        class="quantity-button quantity-minus"
                                        data-id="${item.id}"
                                        aria-label="Decrease quantity"
                                    >
                                        −
                                    </button>

                                    <span class="quantity-value">
                                        ${quantity}
                                    </span>

                                    <button
                                        type="button"
                                        class="quantity-button quantity-plus"
                                        data-id="${item.id}"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>

                                </div>


                                <button
                                    type="button"
                                    class="remove-cart-item"
                                    data-id="${item.id}"
                                >
                                    Remove
                                </button>

                            </div>

                        </div>


                        <div class="cart-product-total">

                            <span>
                                Item Total
                            </span>

                            <strong>
                                ${formatPrice(total)}
                            </strong>

                        </div>

                    </article>

                `;

            }).join("");


        updateSummary(cart);

        updateHeaderCartCount(cart);

    }


    function updateSummary(cart) {

        const quantity =
            getTotalQuantity(cart);

        const subtotal =
            getSubtotal(cart);

        const shipping =
            getShipping(subtotal);

        const total =
            subtotal + shipping;


        if (cartItemCount) {

            cartItemCount.textContent =
                `${quantity} ${quantity === 1 ? "item" : "items"}`;

        }


        if (cartSubtotal) {

            cartSubtotal.textContent =
                formatPrice(subtotal);

        }


        if (cartShipping) {

            cartShipping.textContent =
                shipping === 0 && subtotal > 0
                    ? "FREE"
                    : formatPrice(shipping);

        }


        if (cartTotal) {

            cartTotal.textContent =
                formatPrice(total);

        }


        if (cartShippingMessage) {

            if (subtotal === 0) {

                cartShippingMessage.textContent =
                    "Free shipping on orders over ₹999";

            } else if (subtotal >= 999) {

                cartShippingMessage.textContent =
                    "🎉 You unlocked FREE shipping!";

            } else {

                const remaining =
                    999 - subtotal;

                cartShippingMessage.textContent =
                    `Add ${formatPrice(remaining)} more for FREE shipping.`;

            }

        }


        if (checkoutButton) {

            if (cart.length === 0) {

                checkoutButton.style.pointerEvents =
                    "none";

                checkoutButton.style.opacity =
                    "0.5";

            } else {

                checkoutButton.style.pointerEvents =
                    "auto";

                checkoutButton.style.opacity =
                    "1";

            }

        }

    }


    function changeQuantity(id, change) {

        const cart = getCart();

        const product =
            cart.find(
                item =>
                    Number(item.id) === Number(id)
            );


        if (!product) {
            return;
        }


        let quantity =
            Number(product.quantity) || 1;


        quantity += change;


        if (quantity <= 0) {

            removeProduct(id);

            return;

        }


        product.quantity =
            quantity;


        saveCart(cart);

        renderCart();

    }


    function removeProduct(id) {

        let cart =
            getCart();


        cart =
            cart.filter(
                item =>
                    Number(item.id) !== Number(id)
            );


        saveCart(cart);

        renderCart();

    }


    function clearCart() {

        const cart =
            getCart();


        if (cart.length === 0) {
            return;
        }


        const confirmed =
            window.confirm(
                "Are you sure you want to remove all products from your cart?"
            );


        if (!confirmed) {
            return;
        }


        localStorage.removeItem(cartKey);

        renderCart();

    }


    if (cartProducts) {

        cartProducts.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest("button");


                if (!button) {
                    return;
                }


                const id =
                    button.dataset.id;


                if (!id) {
                    return;
                }


                if (
                    button.classList.contains(
                        "quantity-minus"
                    )
                ) {

                    changeQuantity(
                        id,
                        -1
                    );

                }


                if (
                    button.classList.contains(
                        "quantity-plus"
                    )
                ) {

                    changeQuantity(
                        id,
                        1
                    );

                }


                if (
                    button.classList.contains(
                        "remove-cart-item"
                    )
                ) {

                    removeProduct(id);

                }

            }
        );

    }


    if (clearCartButton) {

        clearCartButton.addEventListener(
            "click",
            clearCart
        );

    }


    renderCart();

});