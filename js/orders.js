document.addEventListener("DOMContentLoaded", () => {

    const ordersKey = "earthEssentialOrders";

    const ordersList =
        document.getElementById("ordersList");

    const emptyOrders =
        document.getElementById("emptyOrders");


    function getOrders() {

        try {

            return JSON.parse(
                localStorage.getItem(ordersKey)
            ) || [];

        } catch (error) {

            return [];

        }

    }


    function formatPrice(price) {

        return "₹" +
            Number(price || 0).toLocaleString("en-IN");

    }


    function formatDate(dateValue) {

        if (!dateValue) {
            return "Date not available";
        }

        const date =
            new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return dateValue;
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    function getStatusClass(status) {

        return String(status || "")
            .toLowerCase()
            .replace(/\s+/g, "-");

    }


    function getProductImage(item) {

        return (
            item.image ||
            "https://placehold.co/200x220/FCE4EC/E91E63?text=Beauty"
        );

    }


    function createProductHTML(item) {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;


        return `
            <div class="order-product">

                <div class="order-product-image">

                    <img
                        src="${getProductImage(item)}"
                        alt="${item.name || "Product"}"
                        onerror="this.src='https://placehold.co/200x220/FCE4EC/E91E63?text=Beauty'"
                    >

                </div>


                <div class="order-product-details">

                    <h3>
                        ${item.name || "Product"}
                    </h3>

                    <p>
                        ${item.categoryName || ""}
                    </p>

                    <p>
                        Quantity: ${quantity}
                    </p>

                </div>


                <div class="order-product-price">

                    <strong>
                        ${formatPrice(price * quantity)}
                    </strong>

                    <span>
                        ${formatPrice(price)} each
                    </span>

                </div>

            </div>
        `;

    }


    function createOrderHTML(order) {

        const status =
            order.status || "Placed";

        const statusClass =
            getStatusClass(status);


        const items =
            Array.isArray(order.items)
                ? order.items
                : [];


        const productsHTML =
            items.length
                ? items.map(createProductHTML).join("")
                : `
                    <p>
                        No product information available.
                    </p>
                `;


        const orderId =
            order.orderId || "—";


        const orderDate =
            formatDate(order.orderDate);


        const paymentMethod =
            order.paymentMethod || "—";


        const total =
            Number(order.total) || 0;


        return `
            <article class="order-card">

                <div class="order-card-header">

                    <div class="order-card-info">

                        <div class="order-card-info-item">

                            <span>
                                Order ID
                            </span>

                            <strong>
                                ${orderId}
                            </strong>

                        </div>


                        <div class="order-card-info-item">

                            <span>
                                Order Date
                            </span>

                            <strong>
                                ${orderDate}
                            </strong>

                        </div>


                        <div class="order-card-info-item">

                            <span>
                                Payment
                            </span>

                            <strong>
                                ${paymentMethod}
                            </strong>

                        </div>

                    </div>


                    <span
                        class="order-status ${statusClass}"
                    >
                        ${status}
                    </span>

                </div>


                <div class="order-card-body">

                    <div class="order-products">

                        ${productsHTML}

                    </div>


                    <div class="order-card-footer">

                        <div class="order-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ${formatPrice(total)}
                            </strong>

                        </div>


                        <div class="order-payment">

                            Payment:
                            <strong>
                                ${paymentMethod}
                            </strong>

                        </div>


                        <a
                            href="order-success.html?id=${encodeURIComponent(orderId)}"
                            class="view-order-button"
                        >
                            View Order
                        </a>

                    </div>

                </div>

            </article>
        `;

    }


    function renderOrders() {

        const orders =
            getOrders();


        if (!ordersList) {
            return;
        }


        if (orders.length === 0) {

            ordersList.innerHTML = "";

            if (emptyOrders) {
                emptyOrders.style.display = "block";
            }

            return;

        }


        if (emptyOrders) {
            emptyOrders.style.display = "none";
        }


        ordersList.innerHTML =
            orders
                .map(createOrderHTML)
                .join("");

    }


    function updateCartCount() {

        const cartCount =
            document.querySelector(".cart-count");


        if (!cartCount) {
            return;
        }


        let cart = [];

        try {

            cart =
                JSON.parse(
                    localStorage.getItem(
                        "earthEssentialCart"
                    )
                ) || [];

        } catch (error) {

            cart = [];

        }


        const totalQuantity =
            cart.reduce(
                (total, item) => {

                    return total +
                        (Number(item.quantity) || 0);

                },
                0
            );


        cartCount.textContent =
            totalQuantity;

    }


    function updateWishlistCount() {

        const wishlistCount =
            document.querySelector(
                ".wishlist-count"
            );


        if (!wishlistCount) {
            return;
        }


        let wishlist = [];

        try {

            wishlist =
                JSON.parse(
                    localStorage.getItem(
                        "earthEssentialWishlist"
                    )
                ) || [];

        } catch (error) {

            wishlist = [];

        }


        wishlistCount.textContent =
            wishlist.length;

    }


    renderOrders();

    updateCartCount();

    updateWishlistCount();

});