document.addEventListener("DOMContentLoaded", () => {

    const ordersKey = "earthEssentialOrders";

    const successOrderId =
        document.getElementById("successOrderId");

    const successOrderTotal =
        document.getElementById("successOrderTotal");

    const successPayment =
        document.getElementById("successPayment");


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


    function getLatestOrder() {

        const orders = getOrders();

        if (!orders.length) {
            return null;
        }

        return orders[orders.length - 1];

    }


    function generateOrderId() {

        const date = new Date();

        const year =
            date.getFullYear();

        const month =
            String(date.getMonth() + 1).padStart(2, "0");

        const day =
            String(date.getDate()).padStart(2, "0");

        const random =
            Math.floor(
                1000 + Math.random() * 9000
            );

        return `EE-${year}${month}${day}-${random}`;

    }


    function getOrderValue(order) {

        if (!order) {
            return 0;
        }

        if (order.total !== undefined) {
            return Number(order.total) || 0;
        }

        if (order.grandTotal !== undefined) {
            return Number(order.grandTotal) || 0;
        }

        if (order.orderTotal !== undefined) {
            return Number(order.orderTotal) || 0;
        }

        if (order.amount !== undefined) {
            return Number(order.amount) || 0;
        }

        return 0;

    }


    function getPaymentMethod(order) {

        if (!order) {
            return "Demo Payment";
        }

        return (
            order.paymentMethod ||
            order.payment ||
            order.paymentType ||
            "Demo Payment"
        );

    }


    function displayOrder() {

        let order =
            getLatestOrder();


        if (!order) {

            order = {
                id: generateOrderId(),
                total: 0,
                paymentMethod: "Demo Payment"
            };

        }


        let orderId =
            order.id ||
            order.orderId ||
            order.orderID;


        if (!orderId) {

            orderId =
                generateOrderId();

        }


        const total =
            getOrderValue(order);


        const payment =
            getPaymentMethod(order);


        if (successOrderId) {

            successOrderId.textContent =
                orderId;

        }


        if (successOrderTotal) {

            successOrderTotal.textContent =
                formatPrice(total);

        }


        if (successPayment) {

            successPayment.textContent =
                payment;

        }

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

document.addEventListener("DOMContentLoaded", () => {

    const ordersKey = "earthEssentialOrders";

    const successOrderId =
        document.getElementById("successOrderId");

    const successOrderTotal =
        document.getElementById("successOrderTotal");

    const successPayment =
        document.getElementById("successPayment");


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


    function getCurrentOrder() {

        const orders = getOrders();

        if (orders.length === 0) {
            return null;
        }

        const params =
            new URLSearchParams(window.location.search);

        const orderId =
            params.get("id");


        if (orderId) {

            const matchedOrder =
                orders.find(
                    order =>
                        String(order.orderId) ===
                        String(orderId)
                );

            if (matchedOrder) {
                return matchedOrder;
            }

        }


        return orders[0];

    }


    function displayOrder() {

        const order =
            getCurrentOrder();


        if (!order) {

            if (successOrderId) {
                successOrderId.textContent = "—";
            }

            if (successOrderTotal) {
                successOrderTotal.textContent = "₹0";
            }

            if (successPayment) {
                successPayment.textContent = "—";
            }

            return;

        }


        if (successOrderId) {

            successOrderId.textContent =
                order.orderId || "—";

        }


        if (successOrderTotal) {

            successOrderTotal.textContent =
                formatPrice(order.total);

        }


        if (successPayment) {

            successPayment.textContent =
                order.paymentMethod || "—";

        }

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


    displayOrder();

    updateCartCount();

    updateWishlistCount();

});
        wishlistCount.textContent =
            wishlist.length;

    }


    displayOrder();

    updateCartCount();

    updateWishlistCount();

});