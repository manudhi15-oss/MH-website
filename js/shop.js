document.addEventListener("DOMContentLoaded", () => {
    const productGrid = document.getElementById("productGrid");
    const productCount = document.getElementById("productCount");
    const noProducts = document.getElementById("noProducts");
    const sortProducts = document.getElementById("sortProducts");
    const clearFilters = document.getElementById("clearFilters");

    const categoryInputs = document.querySelectorAll(
        'input[name="category"]'
    );

    const priceInputs = document.querySelectorAll(
        'input[name="price"]'
    );

    let currentCategory = "all";
    let currentPrice = "all";
    let currentSort = "default";

    function getUrlParameters() {
        const params = new URLSearchParams(window.location.search);

        const category = params.get("category");
        const search = params.get("search");

        if (category) {
            currentCategory = category;

            categoryInputs.forEach(input => {
                input.checked = input.value === category;
            });
        }

        return {
            category,
            search
        };
    }

    function createStars(rating) {
        const fullStars = Math.round(rating);

        return "★".repeat(fullStars) +
            "☆".repeat(5 - fullStars);
    }

    function createProductCard(product, index) {
        return `
            <article class="product-card" style="animation-delay:${index * 0.04}s">

                <div class="product-image">

                    <span class="product-badge">
                        ${product.badge}
                    </span>

                    <button
                        class="wishlist-button"
                        type="button"
                        data-product-id="${product.id}"
                        aria-label="Add ${product.name} to wishlist"
                    >
                        ♡
                    </button>

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="this.src='https://placehold.co/700x800/FCE4EC/E91E63?text=Earth+%26+Essential'"
                    >

                    <a
                        href="product.html?id=${product.id}"
                        class="quick-view"
                    >
                        View Product
                    </a>

                </div>

                <div class="product-info">

                    <span class="product-category">
                        ${product.categoryName}
                    </span>

                    <h3>${product.name}</h3>

                    <div class="rating">
                        ${createStars(product.rating)}
                        <span>(${product.reviews})</span>
                    </div>

                    <div class="price">
                        <strong>${formatPrice(product.price)}</strong>
                        <del>${formatPrice(product.oldPrice)}</del>
                    </div>

                </div>

            </article>
        `;
    }

    function filterProducts() {
        let filtered = [...getAllProducts()];

        if (currentCategory !== "all") {
            filtered = filtered.filter(
                product => product.category === currentCategory
            );
        }

        if (currentPrice !== "all") {
            filtered = filtered.filter(product => {

                const price = product.price;

                if (currentPrice === "0-500") {
                    return price < 500;
                }

                if (currentPrice === "500-1000") {
                    return price >= 500 && price <= 1000;
                }

                if (currentPrice === "1000-2000") {
                    return price > 1000 && price <= 2000;
                }

                if (currentPrice === "2000+") {
                    return price > 2000;
                }

                return true;
            });
        }

        const params = new URLSearchParams(window.location.search);
        const search = params.get("search");

        if (search) {
            const searchTerm = search.toLowerCase();

            filtered = filtered.filter(product => {
                return (
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.categoryName.toLowerCase().includes(searchTerm) ||
                    product.subcategory.toLowerCase().includes(searchTerm)
                );
            });
        }

        if (currentSort === "price-low") {
            filtered.sort((a, b) => a.price - b.price);
        }

        if (currentSort === "price-high") {
            filtered.sort((a, b) => b.price - a.price);
        }

        if (currentSort === "name") {
            filtered.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        if (currentSort === "rating") {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        return filtered;
    }

    function renderProducts() {
        const filteredProducts = filterProducts();

        productGrid.innerHTML = "";

        productCount.textContent =
            `${filteredProducts.length} Product${filteredProducts.length !== 1 ? "s" : ""}`;

        if (filteredProducts.length === 0) {
            noProducts.classList.add("show");
            return;
        }

        noProducts.classList.remove("show");

        filteredProducts.forEach((product, index) => {
            productGrid.insertAdjacentHTML(
                "beforeend",
                createProductCard(product, index)
            );
        });

        setupWishlistButtons();
    }

    function setupWishlistButtons() {
        const wishlistButtons =
            document.querySelectorAll(".wishlist-button");

        wishlistButtons.forEach(button => {

            button.addEventListener("click", () => {

                button.classList.toggle("active");

                button.textContent =
                    button.classList.contains("active")
                        ? "♥"
                        : "♡";

            });

        });
    }

    categoryInputs.forEach(input => {

        input.addEventListener("change", () => {

            currentCategory = input.value;

            renderProducts();

        });

    });

    priceInputs.forEach(input => {

        input.addEventListener("change", () => {

            currentPrice = input.value;

            renderProducts();

        });

    });

    if (sortProducts) {

        sortProducts.addEventListener("change", () => {

            currentSort = sortProducts.value;

            renderProducts();

        });

    }

    if (clearFilters) {

        clearFilters.addEventListener("click", () => {

            currentCategory = "all";
            currentPrice = "all";
            currentSort = "default";

            categoryInputs.forEach(input => {
                input.checked = input.value === "all";
            });

            priceInputs.forEach(input => {
                input.checked = input.value === "all";
            });

            sortProducts.value = "default";

            window.history.replaceState(
                {},
                "",
                "shop.html"
            );

            renderProducts();

        });

    }

    getUrlParameters();
    renderProducts();
});