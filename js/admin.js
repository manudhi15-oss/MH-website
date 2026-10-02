document.addEventListener("DOMContentLoaded", () => {

    const navItems = document.querySelectorAll(".admin-nav-item");
    const sections = document.querySelectorAll(".admin-section");
    const pageTitle = document.getElementById("adminPageTitle");
    const sidebar = document.querySelector(".admin-sidebar");
    const mobileMenu = document.getElementById("adminMobileMenu");

    const sectionTitles = {
        dashboard: "Dashboard",
        products: "Products",
        orders: "Orders",
        sellers: "Sellers",
        offers: "Offers",
        customers: "Customers"
    };


    function showSection(sectionName) {

        sections.forEach(section => {
            section.classList.remove("active");
        });

        navItems.forEach(item => {
            item.classList.remove("active");
        });


        const targetSection =
            document.getElementById(
                sectionName + "Section"
            );

        const targetNav =
            document.querySelector(
                `.admin-nav-item[data-section="${sectionName}"]`
            );


        if (targetSection) {
            targetSection.classList.add("active");
        }

        if (targetNav) {
            targetNav.classList.add("active");
        }

        if (pageTitle) {
            pageTitle.textContent =
                sectionTitles[sectionName] || "Dashboard";
        }

        if (sidebar) {
            sidebar.classList.remove("open");
        }

        if (sectionName === "dashboard") {
            updateDashboard();
        }

        if (sectionName === "products") {
            renderProducts();
        }

        if (sectionName === "orders") {
            renderOrders();
        }

        if (sectionName === "customers") {
            renderCustomers();
        }

        if (sectionName === "offers") {
            renderOffers();
        }

    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const sectionName =
                item.dataset.section;

            showSection(sectionName);

        });

    });


    document.querySelectorAll("[data-goto]")
        .forEach(button => {

            button.addEventListener("click", () => {

                showSection(
                    button.dataset.goto
                );

            });

        });


    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            () => {

                if (sidebar) {
                    sidebar.classList.toggle("open");
                }

            }
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (!sidebar || !mobileMenu) {
                return;
            }

            if (
                window.innerWidth <= 800 &&
                sidebar.classList.contains("open") &&
                !sidebar.contains(event.target) &&
                !mobileMenu.contains(event.target)
            ) {

                sidebar.classList.remove("open");

            }

        }
    );


    function getProducts() {

        let baseProducts = [];

        if (typeof products !== "undefined") {
            baseProducts = products;
        }

        let adminProducts = [];

        try {

            adminProducts =
                JSON.parse(
                    localStorage.getItem(
                        "earthEssentialAdminProducts"
                    )
                ) || [];

        } catch (error) {

            adminProducts = [];

        }

        return [
            ...baseProducts,
            ...adminProducts
        ];

    }


    function getOrders() {

        let orders = [];

        try {

            orders =
                JSON.parse(
                    localStorage.getItem(
                        "earthEssentialOrders"
                    )
                ) || [];

        } catch (error) {

            orders = [];

        }


        if (!Array.isArray(orders)) {
            orders = [];
        }


        return orders;

    }


    function getUsers() {

        let users = [];

        try {

            users =
                JSON.parse(
                    localStorage.getItem(
                        "earthEssentialUsers"
                    )
                ) || [];

        } catch (error) {

            users = [];

        }


        if (!Array.isArray(users)) {
            users = [];
        }


        return users;

    }


    function getWishlist() {

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


        if (!Array.isArray(wishlist)) {
            wishlist = [];
        }


        return wishlist;

    }


    function formatAdminPrice(price) {

        return "₹" +
            Number(price || 0)
                .toLocaleString("en-IN");

    }


    function updateDashboard() {

        const allProducts =
            getProducts();

        const orders =
            getOrders();

        const users =
            getUsers();

        const wishlist =
            getWishlist();


        let totalSales = 0;


        orders.forEach(order => {

            let orderTotal =
                Number(
                    order.total ||
                    order.grandTotal ||
                    order.amount ||
                    0
                );


            if (
                !orderTotal &&
                Array.isArray(order.items)
            ) {

                orderTotal =
                    order.items.reduce(
                        (total, item) => {

                            return total +
                                (
                                    Number(item.price) *
                                    Number(
                                        item.quantity || 1
                                    )
                                );

                        },
                        0
                    );

            }


            totalSales += orderTotal;

        });


        const totalSalesElement =
            document.getElementById(
                "totalSales"
            );

        const totalProductsElement =
            document.getElementById(
                "totalProducts"
            );

        const totalOrdersElement =
            document.getElementById(
                "totalOrders"
            );

        const totalCustomersElement =
            document.getElementById(
                "totalCustomers"
            );


        if (totalSalesElement) {
            totalSalesElement.textContent =
                formatAdminPrice(totalSales);
        }

        if (totalProductsElement) {
            totalProductsElement.textContent =
                allProducts.length;
        }

        if (totalOrdersElement) {
            totalOrdersElement.textContent =
                orders.length;
        }

        if (totalCustomersElement) {
            totalCustomersElement.textContent =
                users.length;
        }


        const overviewProducts =
            document.getElementById(
                "overviewProducts"
            );

        const overviewOrders =
            document.getElementById(
                "overviewOrders"
            );

        const overviewCustomers =
            document.getElementById(
                "overviewCustomers"
            );

        const overviewWishlist =
            document.getElementById(
                "overviewWishlist"
            );


        if (overviewProducts) {
            overviewProducts.textContent =
                allProducts.length;
        }

        if (overviewOrders) {
            overviewOrders.textContent =
                orders.length;
        }

        if (overviewCustomers) {
            overviewCustomers.textContent =
                users.length;
        }

        if (overviewWishlist) {
            overviewWishlist.textContent =
                wishlist.length;
        }

    }


    function renderProducts() {

        const table =
            document.getElementById(
                "adminProductsTable"
            );

        if (!table) {
            return;
        }


        const allProducts =
            getProducts();


        if (allProducts.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        No products found.
                    </td>
                </tr>
            `;

            return;

        }


        table.innerHTML =
            allProducts.map(product => {

                const image =
                    product.image || "";


                return `
                    <tr>

                        <td>
                            <div style="
                                display:flex;
                                align-items:center;
                                gap:10px;
                            ">

                                ${
                                    image
                                        ? `
                                            <img
                                                src="${image}"
                                                alt="${product.name || "Product"}"
                                                style="
                                                    width:42px;
                                                    height:42px;
                                                    object-fit:cover;
                                                    border-radius:8px;
                                                    background:#fce4ec;
                                                "
                                                onerror="
                                                    this.style.display='none'
                                                "
                                            >
                                        `
                                        : ""
                                }

                                <strong>
                                    ${product.name || "Unnamed Product"}
                                </strong>

                            </div>
                        </td>

                        <td>
                            ${product.categoryName || product.category || "-"}
                        </td>

                        <td>
                            ${formatAdminPrice(product.price)}
                        </td>

                        <td>
                            ${product.stock ?? "Demo"}
                        </td>

                        <td>
                            <span class="admin-status">
                                Active
                            </span>
                        </td>

                        <td>
                            <button
                                type="button"
                                class="admin-action-button"
                                data-product-id="${product.id}"
                            >
                                View
                            </button>
                        </td>

                    </tr>
                `;

            }).join("");


        table.querySelectorAll(
            ".admin-action-button"
        ).forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.productId;

                    const product =
                        allProducts.find(
                            item =>
                                String(item.id) ===
                                String(id)
                        );


                    if (!product) {
                        return;
                    }


                    alert(
                        `${product.name}\n\nPrice: ${formatAdminPrice(product.price)}\nCategory: ${product.categoryName || product.category || "-"}`
                    );

                }
            );

        });

    }


    function renderOrders() {

        const table =
            document.getElementById(
                "adminOrdersTable"
            );

        if (!table) {
            return;
        }


        const orders =
            getOrders();


        if (orders.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        No orders found yet.
                    </td>
                </tr>
            `;

            return;

        }


        table.innerHTML =
            orders.map(
                (order, index) => {

                    const orderId =
                        order.orderId ||
                        order.id ||
                        `ORD-${index + 1}`;


                    const customer =
                        order.customerName ||
                        order.name ||
                        order.customer?.name ||
                        "Customer";


                    const items =
                        Array.isArray(order.items)
                            ? order.items.length
                            : Number(order.itemCount || 0);


                    const total =
                        Number(
                            order.total ||
                            order.grandTotal ||
                            order.amount ||
                            0
                        );


                    const status =
                        order.status ||
                        "Placed";


                    const date =
                        order.date ||
                        order.createdAt ||
                        "";


                    let formattedDate =
                        "-";


                    if (date) {

                        const parsedDate =
                            new Date(date);

                        if (
                            !Number.isNaN(
                                parsedDate.getTime()
                            )
                        ) {

                            formattedDate =
                                parsedDate.toLocaleDateString(
                                    "en-IN"
                                );

                        } else {

                            formattedDate = date;

                        }

                    }


                    const statusClass =
                        status
                            .toLowerCase()
                            .includes("cancel")
                            ? "cancelled"
                            : status
                                .toLowerCase()
                                .includes("pending")
                                ? "pending"
                                : "";


                    return `
                        <tr>

                            <td>
                                <strong>
                                    ${orderId}
                                </strong>
                            </td>

                            <td>
                                ${customer}
                            </td>

                            <td>
                                ${items}
                            </td>

                            <td>
                                ${formatAdminPrice(total)}
                            </td>

                            <td>
                                <span class="
                                    admin-status
                                    ${statusClass}
                                ">
                                    ${status}
                                </span>
                            </td>

                            <td>
                                ${formattedDate}
                            </td>

                        </tr>
                    `;

                }
            ).join("");

    }


    function renderCustomers() {

        const table =
            document.getElementById(
                "adminCustomersTable"
            );

        if (!table) {
            return;
        }


        const users =
            getUsers();


        if (users.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="4">
                        No registered customers found.
                    </td>
                </tr>
            `;

            return;

        }


        table.innerHTML =
            users.map(user => {

                let joined =
                    user.createdAt || "";


                if (joined) {

                    const date =
                        new Date(joined);

                    if (
                        !Number.isNaN(
                            date.getTime()
                        )
                    ) {

                        joined =
                            date.toLocaleDateString(
                                "en-IN"
                            );

                    }

                }


                return `
                    <tr>

                        <td>
                            <strong>
                                ${user.name || "-"}
                            </strong>
                        </td>

                        <td>
                            ${user.email || "-"}
                        </td>

                        <td>
                            ${user.phone || "-"}
                        </td>

                        <td>
                            ${joined || "-"}
                        </td>

                    </tr>
                `;

            }).join("");

    }


    function getOffers() {

        let offers = [];

        try {

            offers =
                JSON.parse(
                    localStorage.getItem(
                        "earthEssentialOffers"
                    )
                ) || [];

        } catch (error) {

            offers = [];

        }


        if (!Array.isArray(offers)) {
            offers = [];
        }


        return offers;

    }


    function saveOffers(offers) {

        localStorage.setItem(
            "earthEssentialOffers",
            JSON.stringify(offers)
        );

    }


    function renderOffers() {

        const container =
            document.getElementById(
                "adminOffersList"
            );

        if (!container) {
            return;
        }


        const offers =
            getOffers();


        if (offers.length === 0) {

            container.innerHTML = `
                <div class="empty-admin-state">

                    <div>
                        ％
                    </div>

                    <h3>
                        No Offers Added
                    </h3>

                    <p>
                        Click "Add Offer" to create
                        your first promotion.
                    </p>

                </div>
            `;

            return;

        }


        container.innerHTML =
            offers.map(
                (offer, index) => {

                    return `
                        <div class="offer-card">

                            <button
                                type="button"
                                class="offer-delete"
                                data-offer-index="${index}"
                                aria-label="Delete offer"
                            >
                                ×
                            </button>

                            <h3>
                                ${offer.title}
                            </h3>

                            <p>
                                ${offer.discount}
                            </p>

                        </div>
                    `;

                }
            ).join("");


        container.querySelectorAll(
            ".offer-delete"
        ).forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.offerIndex
                        );


                    const currentOffers =
                        getOffers();


                    currentOffers.splice(
                        index,
                        1
                    );


                    saveOffers(
                        currentOffers
                    );

                    renderOffers();

                }
            );

        });

    }


    const productModal =
        document.getElementById(
            "productModal"
        );

    const offerModal =
        document.getElementById(
            "offerModal"
        );


    function openModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    const addProductButton =
        document.getElementById(
            "addProductButton"
        );


    if (addProductButton) {

        addProductButton.addEventListener(
            "click",
            () => {

                openModal(productModal);

            }
        );

    }


    const addOfferButton =
        document.getElementById(
            "addOfferButton"
        );


    if (addOfferButton) {

        addOfferButton.addEventListener(
            "click",
            () => {

                openModal(offerModal);

            }
        );

    }


    document.querySelectorAll(
        "[data-close-modal]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const modalId =
                    button.dataset.closeModal;

                closeModal(
                    document.getElementById(
                        modalId
                    )
                );

            }
        );

    });


    document.querySelectorAll(
        ".admin-modal"
    ).forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal(modal);

                }

            }
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            document.querySelectorAll(
                ".admin-modal.open"
            ).forEach(modal => {

                closeModal(modal);

            });

        }
    );


    const productForm =
        document.getElementById(
            "productForm"
        );


    if (productForm) {

        productForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "adminProductName"
                    ).value.trim();


                const category =
                    document.getElementById(
                        "adminProductCategory"
                    ).value;


                const price =
                    Number(
                        document.getElementById(
                            "adminProductPrice"
                        ).value
                    );


                const stock =
                    Number(
                        document.getElementById(
                            "adminProductStock"
                        ).value
                    );


                if (
                    !name ||
                    !category ||
                    !Number.isFinite(price) ||
                    price < 0 ||
                    !Number.isFinite(stock) ||
                    stock < 0
                ) {

                    alert(
                        "Please enter valid product details."
                    );

                    return;

                }


                const categoryNames = {

                    makeup: "Makeup",

                    skincare: "Skincare",

                    "hair-care": "Hair Care",

                    fragrance: "Fragrance",

                    "bath-body": "Bath & Body",

                    "beauty-tools": "Beauty Tools"

                };


                const newProduct = {

                    id:
                        "admin-" +
                        Date.now(),

                    name: name,

                    category: category,

                    categoryName:
                        categoryNames[category] ||
                        category,

                    price: price,

                    oldPrice: price,

                    discount: 0,

                    rating: 0,

                    reviews: 0,

                    badge: "NEW",

                    stock: stock,

                    image: ""

                };


                let adminProducts = [];


                try {

                    adminProducts =
                        JSON.parse(
                            localStorage.getItem(
                                "earthEssentialAdminProducts"
                            )
                        ) || [];

                } catch (error) {

                    adminProducts = [];

                }


                adminProducts.push(
                    newProduct
                );


                localStorage.setItem(
                    "earthEssentialAdminProducts",
                    JSON.stringify(
                        adminProducts
                    )
                );


                productForm.reset();

                closeModal(productModal);

                renderProducts();

                updateDashboard();


                alert(
                    "Product added successfully."
                );

            }
        );

    }


    const offerForm =
        document.getElementById(
            "offerForm"
        );


    if (offerForm) {

        offerForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const title =
                    document.getElementById(
                        "offerTitle"
                    ).value.trim();


                const discount =
                    document.getElementById(
                        "offerDiscount"
                    ).value.trim();


                if (!title || !discount) {

                    alert(
                        "Please enter offer details."
                    );

                    return;

                }


                const offers =
                    getOffers();


                offers.push({

                    id:
                        Date.now(),

                    title:
                        title,

                    discount:
                        discount,

                    createdAt:
                        new Date().toISOString()

                });


                saveOffers(
                    offers
                );


                offerForm.reset();

                closeModal(offerModal);

                renderOffers();


                alert(
                    "Offer added successfully."
                );

            }
        );

    }


    const adminLogout =
        document.getElementById(
            "adminLogout"
        );


    if (adminLogout) {

        adminLogout.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "earthEssentialAdmin"
                );

                window.location.href =
                    "login.html";

            }
        );

    }


    updateDashboard();

    renderProducts();

    renderOrders();

    renderCustomers();

    renderOffers();
    function getSellerCategoryName(category) {

    const categories = {
        makeup: "Makeup",
        skincare: "Skincare",
        "hair-care": "Hair Care",
        fragrance: "Fragrance",
        "bath-body": "Bath & Body",
        "beauty-tools": "Beauty Tools"
    };

    return categories[category] || "Beauty";
}

        const sellerApplicationsKey = "earthEssentialSellerApplications";
    const sellersTable = document.getElementById("adminSellersTable");

    function getSellerApplications() {
        try {
            return JSON.parse(
                localStorage.getItem(sellerApplicationsKey)
            ) || [];
        } catch (error) {
            return [];
        }
    }

    function saveSellerApplications(applications) {
        localStorage.setItem(
            sellerApplicationsKey,
            JSON.stringify(applications)
        );
    }

    function escapeSellerText(value) {
        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function renderSellerApplications() {

        if (!sellersTable) {
            return;
        }

        const applications = getSellerApplications();

        if (applications.length === 0) {

            sellersTable.innerHTML = `
                <tr>
                    <td colspan="8">
                        <div class="empty-admin-state">
                            <div>♙</div>
                            <h3>No Seller Applications</h3>
                            <p>
                                New seller applications will appear here.
                            </p>
                        </div>
                    </td>
                </tr>
            `;

            return;
        }

        sellersTable.innerHTML = applications.map(application => {

            const status = application.status || "pending";

            return `
                <tr>

                    <td>
                        <strong>
                            ${escapeSellerText(application.sellerName)}
                        </strong>
                        <small>
                            ${escapeSellerText(application.sellerEmail)}
                        </small>
                    </td>

                    <td>
                        ${escapeSellerText(application.businessName)}
                    </td>

                    <td>
                        ${escapeSellerText(application.productName)}
                    </td>

                    <td>
                        ${escapeSellerText(application.category)}
                    </td>

                    <td>
                        ₹${Number(application.price || 0).toLocaleString("en-IN")}
                    </td>

                    <td>
                        ${Number(application.stock || 0)}
                    </td>

                    <td>
                        <span class="seller-status ${status}">
                            ${escapeSellerText(status)}
                        </span>
                    </td>

                    <td>

                        ${
                            status === "pending"
                            ? `
                                <button
                                    type="button"
                                    class="seller-approve-button"
                                    data-seller-action="approve"
                                    data-seller-id="${application.id}"
                                >
                                    Approve
                                </button>

                                <button
                                    type="button"
                                    class="seller-reject-button"
                                    data-seller-action="reject"
                                    data-seller-id="${application.id}"
                                >
                                    Reject
                                </button>
                            `
                            : `
                                <button
                                    type="button"
                                    class="seller-delete-button"
                                    data-seller-action="delete"
                                    data-seller-id="${application.id}"
                                >
                                    Delete
                                </button>
                            `
                        }

                    </td>

                </tr>
            `;

        }).join("");
    }


    if (sellersTable) {

        sellersTable.addEventListener("click", (event) => {

            const button =
                event.target.closest("button[data-seller-action]");

            if (!button) {
                return;
            }

            const action =
                button.dataset.sellerAction;

            const sellerId =
                button.dataset.sellerId;

            let applications =
                getSellerApplications();

            const seller =
                applications.find(
                    item => item.id === sellerId
                );

            if (!seller) {
                return;
            }


            if (action === "approve") {

    seller.status = "approved";
    seller.approvedAt = new Date().toISOString();

    const sellerProductsKey =
        "earthEssentialSellerProducts";

    let sellerProducts = [];

    try {
        sellerProducts =
            JSON.parse(
                localStorage.getItem(sellerProductsKey)
            ) || [];
    } catch (error) {
        sellerProducts = [];
    }

    const alreadyAdded = sellerProducts.some(
        product =>
            String(product.sellerApplicationId) ===
            String(seller.id)
    );

    if (!alreadyAdded) {

        const approvedProduct = {

            id:
                "seller_" +
                Date.now(),

            sellerApplicationId:
                seller.id,

            sellerName:
                seller.sellerName,

            businessName:
                seller.businessName,

            name:
                seller.productName,

            category:
                seller.category,

            categoryName:
                getSellerCategoryName(
                    seller.category
                ),

            subcategory:
                seller.category,

            price:
                Number(seller.price) || 0,

            oldPrice:
                Number(seller.price) || 0,

            discount:
                0,

            rating:
                0,

            reviews:
                0,

            badge:
                "SELLER PRODUCT",

            image:
                seller.image ||
                "https://placehold.co/700x800/FCE4EC/E91E63?text=Earth+%26+Essential",

            stock:
                Number(seller.stock) || 0,

            description:
                seller.description || "",

            sellerApproved:
                true

        };

        sellerProducts.push(
            approvedProduct
        );

        localStorage.setItem(
            sellerProductsKey,
            JSON.stringify(sellerProducts)
        );
    }

    saveSellerApplications(
        applications
    );

    renderSellerApplications();

    alert(
        "Seller approved and product added to Shop."
    );

    return;
}


            if (action === "reject") {

                seller.status = "rejected";
                seller.rejectedAt =
                    new Date().toISOString();

                saveSellerApplications(applications);

                renderSellerApplications();

                alert("Seller application rejected.");

                return;
            }


            if (action === "delete") {

                const confirmed =
                    confirm(
                        "Are you sure you want to delete this seller application?"
                    );

                if (!confirmed) {
                    return;
                }

                applications =
                    applications.filter(
                        item => item.id !== sellerId
                    );

                saveSellerApplications(applications);

                renderSellerApplications();

                return;
            }

        });

    }

    renderSellerApplications();

});

