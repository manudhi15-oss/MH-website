document.addEventListener("DOMContentLoaded", () => {

    const menuItems =
        document.querySelectorAll(".account-menu-item[data-section]");

    const panels = {
        profile: document.getElementById("profileSection"),
        orders: document.getElementById("ordersSection"),
        wishlist: document.getElementById("wishlistSection"),
        settings: document.getElementById("settingsSection")
    };


    function showSection(sectionName) {

        menuItems.forEach(item => {
            item.classList.toggle(
                "active",
                item.dataset.section === sectionName
            );
        });


        Object.keys(panels).forEach(key => {

            if (!panels[key]) {
                return;
            }

            panels[key].classList.toggle(
                "active",
                key === sectionName
            );

        });

    }


    menuItems.forEach(item => {

        item.addEventListener("click", () => {

            const section =
                item.dataset.section;

            if (panels[section]) {
                showSection(section);
            }

        });

    });


    function getUser() {

        try {

            return JSON.parse(
                localStorage.getItem("earthEssentialUser")
            );

        } catch (error) {

            return null;

        }

    }


    function updateProfile() {

        const user =
            getUser();


        const accountUserName =
            document.getElementById("accountUserName");

        const accountUserEmail =
            document.getElementById("accountUserEmail");

        const profileName =
            document.getElementById("profileName");

        const profileEmail =
            document.getElementById("profileEmail");

        const profilePhone =
            document.getElementById("profilePhone");


        if (!user) {

            if (accountUserName) {
                accountUserName.textContent =
                    "Guest User";
            }

            if (accountUserEmail) {
                accountUserEmail.textContent =
                    "Please login";
            }

            if (profileName) {
                profileName.textContent =
                    "Guest User";
            }

            if (profileEmail) {
                profileEmail.textContent =
                    "Not logged in";
            }

            if (profilePhone) {
                profilePhone.textContent =
                    "Not added";
            }

            return;

        }


        const name =
            user.name ||
            user.fullName ||
            "User";


        const email =
            user.email ||
            "Email not available";


        const phone =
            user.phone ||
            "Not added";


        if (accountUserName) {
            accountUserName.textContent =
                name;
        }


        if (accountUserEmail) {
            accountUserEmail.textContent =
                email;
        }


        if (profileName) {
            profileName.textContent =
                name;
        }


        if (profileEmail) {
            profileEmail.textContent =
                email;
        }


        if (profilePhone) {
            profilePhone.textContent =
                phone;
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


    const logoutButton =
        document.getElementById("logoutButton");


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            () => {

                const user =
                    getUser();


                if (!user) {

                    window.location.href =
                        "login.html";

                    return;

                }


                const confirmLogout =
                    window.confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {
                    return;
                }


                localStorage.removeItem(
                    "earthEssentialUser"
                );


                window.location.href =
                    "login.html";

            }
        );

    }


    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const requestedSection =
        urlParams.get("section");


    if (
        requestedSection &&
        panels[requestedSection]
    ) {

        showSection(requestedSection);

    } else {

        showSection("profile");

    }


    updateProfile();
    updateCartCount();
    updateWishlistCount();

});