document.addEventListener("DOMContentLoaded", () => {

    const cartKey = "earthEssentialCart";
    const orderKey = "earthEssentialOrders";

    const checkoutProducts = document.getElementById("checkoutProducts");
    const emptyCheckout = document.getElementById("emptyCheckout");

    const summaryItemCount = document.getElementById("summaryItemCount");
    const checkoutSubtotal = document.getElementById("checkoutSubtotal");
    const checkoutShipping = document.getElementById("checkoutShipping");
    const checkoutTotal = document.getElementById("checkoutTotal");
    const shippingMessage = document.getElementById("shippingMessage");

    const placeOrderButton = document.getElementById("placeOrder");
    const checkoutError = document.getElementById("checkoutError");

    const cart = JSON.parse(
        localStorage.getItem(cartKey)
    ) || [];


    function formatPrice(price) {
        return "₹" + Number(price).toLocaleString("en-IN");
    }


    function getCartQuantity() {
        return cart.reduce((total, item) => {
            return total + (Number(item.quantity) || 0);
        }, 0);
    }


    function getSubtotal() {
        return cart.reduce((total, item) => {
            return total +
                (Number(item.price) || 0) *
                (Number(item.quantity) || 0);
        }, 0);
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


    function renderCart() {

        if (!checkoutProducts) {
            return;
        }


        if (cart.length === 0) {

            checkoutProducts.innerHTML = "";

            if (emptyCheckout) {
                emptyCheckout.style.display = "block";
            }

            if (summaryItemCount) {
                summaryItemCount.textContent = "0 items";
            }

            if (checkoutSubtotal) {
                checkoutSubtotal.textContent = "₹0";
            }

            if (checkoutShipping) {
                checkoutShipping.textContent = "₹0";
            }

            if (checkoutTotal) {
                checkoutTotal.textContent = "₹0";
            }

            if (shippingMessage) {
                shippingMessage.textContent =
                    "Your cart is empty.";
            }

            if (placeOrderButton) {
                placeOrderButton.disabled = true;
            }

            return;
        }


        if (emptyCheckout) {
            emptyCheckout.style.display = "none";
        }


        checkoutProducts.innerHTML = cart.map(item => {

            const quantity =
                Number(item.quantity) || 1;

            const itemTotal =
                Number(item.price) * quantity;


            return `
                <div class="checkout-product">

                    <div class="checkout-product-image">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                            onerror="this.src='https://placehold.co/300x350/FCE4EC/E91E63?text=Earth+%26+Essential'"
                        >

                    </div>


                    <div class="checkout-product-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            Qty: ${quantity}
                        </p>

                    </div>


                    <div class="checkout-product-price">
                        ${formatPrice(itemTotal)}
                    </div>

                </div>
            `;

        }).join("");


        const quantity = getCartQuantity();
        const subtotal = getSubtotal();
        const shipping = getShipping(subtotal);
        const total = subtotal + shipping;


        if (summaryItemCount) {

            summaryItemCount.textContent =
                `${quantity} ${quantity === 1 ? "item" : "items"}`;

        }


        if (checkoutSubtotal) {
            checkoutSubtotal.textContent =
                formatPrice(subtotal);
        }


        if (checkoutShipping) {

            checkoutShipping.textContent =
                shipping === 0
                    ? "FREE"
                    : formatPrice(shipping);

        }


        if (checkoutTotal) {
            checkoutTotal.textContent =
                formatPrice(total);
        }


        if (shippingMessage) {

            if (subtotal >= 999) {

                shippingMessage.textContent =
                    "You got FREE shipping on this order.";

            } else {

                const remaining =
                    999 - subtotal;

                shippingMessage.textContent =
                    `Add ${formatPrice(remaining)} more for FREE shipping.`;

            }

        }


        if (placeOrderButton) {
            placeOrderButton.disabled = false;
        }

    }


    function clearErrors() {

        document
            .querySelectorAll(".form-error")
            .forEach(error => {
                error.textContent = "";
            });


        document
            .querySelectorAll(
                ".form-group input, .form-group textarea, .form-group select"
            )
            .forEach(field => {
                field.classList.remove("error");
            });


        if (checkoutError) {

            checkoutError.textContent = "";

            checkoutError.classList.remove("show");

        }

    }


    function showFieldError(fieldId, errorId, message) {

        const field =
            document.getElementById(fieldId);

        const error =
            document.getElementById(errorId);


        if (field) {
            field.classList.add("error");
        }


        if (error) {
            error.textContent = message;
        }

    }


    function validateForm() {

        clearErrors();

        let isValid = true;


        const fullName =
            document.getElementById("fullName");

        const phone =
            document.getElementById("phone");

        const email =
            document.getElementById("email");

        const address =
            document.getElementById("address");

        const city =
            document.getElementById("city");

        const state =
            document.getElementById("state");

        const pincode =
            document.getElementById("pincode");


        if (!fullName || fullName.value.trim().length < 2) {

            showFieldError(
                "fullName",
                "fullNameError",
                "Please enter your full name."
            );

            isValid = false;

        }


        const phoneValue =
            phone ? phone.value.trim() : "";

        if (!/^[6-9]\d{9}$/.test(phoneValue)) {

            showFieldError(
                "phone",
                "phoneError",
                "Enter a valid 10-digit mobile number."
            );

            isValid = false;

        }


        const emailValue =
            email ? email.value.trim() : "";

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                emailValue
            )
        ) {

            showFieldError(
                "email",
                "emailError",
                "Enter a valid email address."
            );

            isValid = false;

        }


        if (!address || address.value.trim().length < 10) {

            showFieldError(
                "address",
                "addressError",
                "Please enter your complete address."
            );

            isValid = false;

        }


        if (!city || city.value.trim().length < 2) {

            showFieldError(
                "city",
                "cityError",
                "Please enter your city."
            );

            isValid = false;

        }


        if (!state || state.value === "") {

            showFieldError(
                "state",
                "stateError",
                "Please select your state."
            );

            isValid = false;

        }


        const pincodeValue =
            pincode ? pincode.value.trim() : "";

        if (!/^\d{6}$/.test(pincodeValue)) {

            showFieldError(
                "pincode",
                "pincodeError",
                "Enter a valid 6-digit pincode."
            );

            isValid = false;

        }


        return isValid;

    }


    function getPaymentMethod() {

        const selectedPayment =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        if (!selectedPayment) {
            return "cod";
        }


        return selectedPayment.value;

    }


    function getPaymentName(method) {

        if (method === "upi") {
            return "UPI";
        }

        if (method === "card") {
            return "Credit / Debit Card";
        }

        return "Cash on Delivery";

    }


    function generateOrderId() {

        const now =
            Date.now().toString().slice(-8);

        const random =
            Math.floor(
                100 + Math.random() * 900
            );


        return `EE${now}${random}`;

    }


    function saveOrder() {

        const subtotal =
            getSubtotal();

        const shipping =
            getShipping(subtotal);

        const total =
            subtotal + shipping;


        const paymentMethod =
            getPaymentMethod();


        const order = {

            orderId: generateOrderId(),

            orderDate:
                new Date().toISOString(),

            status:
                "Order Placed",

            paymentMethod:
                getPaymentName(paymentMethod),

            customer: {

                name:
                    document
                        .getElementById("fullName")
                        .value
                        .trim(),

                phone:
                    document
                        .getElementById("phone")
                        .value
                        .trim(),

                email:
                    document
                        .getElementById("email")
                        .value
                        .trim(),

                address:
                    document
                        .getElementById("address")
                        .value
                        .trim(),

                city:
                    document
                        .getElementById("city")
                        .value
                        .trim(),

                state:
                    document
                        .getElementById("state")
                        .value,

                pincode:
                    document
                        .getElementById("pincode")
                        .value
                        .trim()

            },

            items:
                cart.map(item => ({

                    id:
                        item.id,

                    name:
                        item.name,

                    image:
                        item.image,

                    price:
                        Number(item.price),

                    quantity:
                        Number(item.quantity) || 1

                })),

            subtotal:
                subtotal,

            shipping:
                shipping,

            total:
                total

        };


        const existingOrders =
            JSON.parse(
                localStorage.getItem(orderKey)
            ) || [];


        existingOrders.unshift(order);


        localStorage.setItem(
            orderKey,
            JSON.stringify(existingOrders)
        );


        localStorage.removeItem(cartKey);


        localStorage.setItem(
            "earthEssentialLastOrder",
            JSON.stringify(order)
        );


        return order;

    }


    if (placeOrderButton) {

        placeOrderButton.addEventListener(
            "click",
            () => {

                if (cart.length === 0) {

                    if (checkoutError) {

                        checkoutError.textContent =
                            "Your cart is empty. Please add a product before placing an order.";

                        checkoutError.classList.add(
                            "show"
                        );

                    }

                    return;

                }


                const isValid =
                    validateForm();


                if (!isValid) {

                    const firstError =
                        document.querySelector(
                            ".form-group .error"
                        );


                    if (firstError) {
                        firstError.focus();
                    }


                    return;

                }


                placeOrderButton.disabled = true;


                placeOrderButton.innerHTML = `
                    <span>
                        Placing Order...
                    </span>

                    <span>
                        ✓
                    </span>
                `;


                const order =
                    saveOrder();


                setTimeout(() => {

                    window.location.href =
                        "order-success.html?id=" +
                        encodeURIComponent(
                            order.orderId
                        );

                }, 500);

            }
        );

    }


    const phoneInput =
        document.getElementById("phone");


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                phoneInput.value =
                    phoneInput.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

            }
        );

    }


    const pincodeInput =
        document.getElementById("pincode");


    if (pincodeInput) {

        pincodeInput.addEventListener(
            "input",
            () => {

                pincodeInput.value =
                    pincodeInput.value
                        .replace(/\D/g, "")
                        .slice(0, 6);

            }
        );

    }


    document
        .querySelectorAll(
            ".form-group input, .form-group textarea, .form-group select"
        )
        .forEach(field => {

            field.addEventListener(
                "input",
                () => {

                    field.classList.remove(
                        "error"
                    );

                    const error =
                        document.getElementById(
                            `${field.id}Error`
                        );

                    if (error) {
                        error.textContent = "";
                    }

                }
            );

            field.addEventListener(
                "change",
                () => {

                    field.classList.remove(
                        "error"
                    );

                    const error =
                        document.getElementById(
                            `${field.id}Error`
                        );

                    if (error) {
                        error.textContent = "";
                    }

                }
            );

        });


    renderCart();

});