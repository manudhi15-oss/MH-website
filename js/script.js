document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");

            const isOpen = mobileMenu.classList.contains("open");

            menuButton.setAttribute("aria-expanded", isOpen);
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
        });
    }

    const searchButton = document.querySelector(".search-button");
    const searchPanel = document.querySelector(".search-panel");
    const searchClose = document.querySelector(".search-close");
    const searchInput = document.querySelector("#searchInput");
    const searchForm = document.querySelector("#searchForm");

    function openSearch() {
        if (!searchPanel) return;

        searchPanel.classList.add("open");

        setTimeout(() => {
            if (searchInput) {
                searchInput.focus();
            }
        }, 150);
    }

    function closeSearch() {
        if (!searchPanel) return;

        searchPanel.classList.remove("open");

        if (searchInput) {
            searchInput.value = "";
        }
    }

    if (searchButton) {
        searchButton.addEventListener("click", openSearch);
    }

    if (searchClose) {
        searchClose.addEventListener("click", closeSearch);
    }

    if (searchForm) {
        searchForm.addEventListener("submit", event => {
            event.preventDefault();

            const searchValue = searchInput
                ? searchInput.value.trim()
                : "";

            if (searchValue) {
                window.location.href =
                    "shop.html?search=" +
                    encodeURIComponent(searchValue);
            }
        });
    }

    document.addEventListener("click", event => {
        if (
            searchPanel &&
            searchPanel.classList.contains("open") &&
            !searchPanel.contains(event.target) &&
            searchButton &&
            !searchButton.contains(event.target)
        ) {
            closeSearch();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeSearch();

            if (mobileMenu) {
                mobileMenu.classList.remove("open");
            }
        }
    });

    const wishlistKey = "earthEssentialWishlist";

    function getWishlist() {
        try {
            return JSON.parse(
                localStorage.getItem(wishlistKey)
            ) || [];
        } catch {
            return [];
        }
    }

    function saveWishlist(wishlist) {
        localStorage.setItem(
            wishlistKey,
            JSON.stringify(wishlist)
        );
    }

    function updateWishlistCount() {
        const count = getWishlist().length;

        document.querySelectorAll(".wishlist-count").forEach(
            element => {
                element.textContent = count;
            }
        );
    }

    function getProductId(button) {
        if (button.dataset.productId) {
            return Number(button.dataset.productId);
        }

        const card =
            button.closest(".product-card");

        if (!card) {
            return null;
        }

        const productLink =
            card.querySelector(
                'a[href*="product.html?id="]'
            );

        if (!productLink) {
            return null;
        }

        const href =
            productLink.getAttribute("href");

        const match =
            href.match(/[?&]id=(\d+)/);

        if (!match) {
            return null;
        }

        return Number(match[1]);
    }

    function updateWishlistButtons() {
        const wishlist = getWishlist();

        document.querySelectorAll(
            ".wishlist-button"
        ).forEach(button => {

            const productId =
                getProductId(button);

            if (!productId) {
                return;
            }

            const saved =
                wishlist.some(
                    item =>
                        Number(item.id) ===
                        Number(productId)
                );

            button.classList.toggle(
                "active",
                saved
            );

            button.textContent =
                saved ? "♥" : "♡";

            button.setAttribute(
                "aria-label",
                saved
                    ? "Remove from wishlist"
                    : "Add to wishlist"
            );
        });
    }

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".wishlist-button"
                );

            if (!button) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            if (
                typeof getProductById !==
                "function"
            ) {
                console.error(
                    "products.js is not loaded."
                );
                return;
            }

            const productId =
                getProductId(button);

            if (!productId) {
                console.error(
                    "Wishlist product ID not found."
                );
                return;
            }

            const product =
                getProductById(productId);

            if (!product) {
                console.error(
                    "Wishlist product not found:",
                    productId
                );
                return;
            }

            let wishlist =
                getWishlist();

            const existingIndex =
                wishlist.findIndex(
                    item =>
                        Number(item.id) ===
                        Number(product.id)
                );

            if (existingIndex !== -1) {

                wishlist.splice(
                    existingIndex,
                    1
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

            updateWishlistButtons();
            updateWishlistCount();
        }
    );

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
        } catch {
            cart = [];
        }

        const total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    Number(item.quantity || 0),
                0
            );

        cartCount.textContent = total;
    }

    updateWishlistButtons();
    updateWishlistCount();
    updateCartCount();
});