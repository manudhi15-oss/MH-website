document.addEventListener("DOMContentLoaded", () => {
    const wishlistKey = "earthEssentialWishlist";
    const cartKey = "earthEssentialCart";

    const grid = document.getElementById("wishlistGrid");
    const empty = document.getElementById("emptyWishlist");
    const itemCount = document.getElementById("wishlistItemCount");
    const clearButton = document.getElementById("clearWishlist");

    function getWishlist() {
        return JSON.parse(localStorage.getItem(wishlistKey) || "[]");
    }

    function saveWishlist(list) {
        localStorage.setItem(wishlistKey, JSON.stringify(list));
    }

    function updateCount() {
        const list = getWishlist();

        const headerCount = document.querySelector(".wishlist-count");
        if (headerCount) {
            headerCount.textContent = list.length;
        }

        if (itemCount) {
            itemCount.textContent = `(${list.length})`;
        }
    }

    function renderWishlist() {
        const list = getWishlist();

        updateCount();

        if (!grid || !empty) {
            return;
        }

        if (list.length === 0) {
            grid.innerHTML = "";
            grid.style.display = "none";
            empty.style.display = "block";
            return;
        }

        grid.style.display = "grid";
        empty.style.display = "none";

        grid.innerHTML = list.map(product => `
            <article class="product-card wishlist-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <button type="button" class="wishlist-remove" data-id="${product.id}">♥</button>
                </div>

                <div class="product-info">
                    <span class="product-category">${product.categoryName}</span>
                    <h3>${product.name}</h3>

                    <div class="price">
                        <strong>₹${Number(product.price).toLocaleString("en-IN")}</strong>
                        <del>₹${Number(product.oldPrice).toLocaleString("en-IN")}</del>
                    </div>

                    <div class="wishlist-actions">
                        <a href="product.html?id=${product.id}" class="view-product-button">
                            View Product
                        </a>

                        <button type="button" class="wishlist-cart-button" data-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </article>
        `).join("");

        document.querySelectorAll(".wishlist-remove").forEach(button => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);

                const updated = getWishlist().filter(
                    product => Number(product.id) !== id
                );

                saveWishlist(updated);
                renderWishlist();
            });
        });

        document.querySelectorAll(".wishlist-cart-button").forEach(button => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);
                const product = getWishlist().find(
                    item => Number(item.id) === id
                );

                if (!product) {
                    return;
                }

                let cart = JSON.parse(
                    localStorage.getItem(cartKey) || "[]"
                );

                const existing = cart.find(
                    item => Number(item.id) === id
                );

                if (existing) {
                    existing.quantity = Number(existing.quantity || 0) + 1;
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
                        quantity: 1
                    });
                }

                localStorage.setItem(
                    cartKey,
                    JSON.stringify(cart)
                );

                const cartCount = document.querySelector(".cart-count");

                if (cartCount) {
                    cartCount.textContent = cart.reduce(
                        (total, item) => total + Number(item.quantity || 0),
                        0
                    );
                }

                button.textContent = "Added ✓";

                setTimeout(() => {
                    button.textContent = "Add to Cart";
                }, 1200);
            });
        });
    }

    if (clearButton) {
        clearButton.addEventListener("click", () => {
            if (getWishlist().length === 0) {
                return;
            }

            localStorage.removeItem(wishlistKey);
            renderWishlist();
        });
    }

    renderWishlist();
});