document.addEventListener("DOMContentLoaded", () => {

    const loginForm =
        document.getElementById("loginForm");

    const emailInput =
        document.getElementById("loginEmail");

    const passwordInput =
        document.getElementById("loginPassword");

    const togglePassword =
        document.getElementById("togglePassword");

    const loginMessage =
        document.getElementById("loginMessage");


    function getUsers() {

        try {

            return JSON.parse(
                localStorage.getItem("earthEssentialUsers")
            ) || [];

        } catch (error) {

            return [];

        }

    }


    function showMessage(message, type = "error") {

        if (!loginMessage) {
            return;
        }

        loginMessage.textContent =
            message;

        loginMessage.className =
            "login-message show";

        if (type === "success") {
            loginMessage.classList.add("success");
        }

    }


    function hideMessage() {

        if (!loginMessage) {
            return;
        }

        loginMessage.textContent = "";

        loginMessage.className =
            "login-message";

    }


    if (togglePassword && passwordInput) {

        togglePassword.addEventListener(
            "click",
            () => {

                const isPassword =
                    passwordInput.type === "password";


                passwordInput.type =
                    isPassword
                        ? "text"
                        : "password";


                togglePassword.textContent =
                    isPassword
                        ? "Hide"
                        : "Show";


                togglePassword.setAttribute(
                    "aria-label",
                    isPassword
                        ? "Hide password"
                        : "Show password"
                );

            }
        );

    }


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                hideMessage();


                const email =
                    emailInput
                        ? emailInput.value.trim().toLowerCase()
                        : "";


                const password =
                    passwordInput
                        ? passwordInput.value
                        : "";


                if (!email) {

                    showMessage(
                        "Please enter your email address."
                    );

                    if (emailInput) {
                        emailInput.focus();
                    }

                    return;

                }


                if (!email.includes("@")) {

                    showMessage(
                        "Please enter a valid email address."
                    );

                    if (emailInput) {
                        emailInput.focus();
                    }

                    return;

                }


                if (!password) {

                    showMessage(
                        "Please enter your password."
                    );

                    if (passwordInput) {
                        passwordInput.focus();
                    }

                    return;

                }


                const users =
                    getUsers();


                if (users.length === 0) {

                    showMessage(
                        "No account found. Please create an account first."
                    );

                    return;

                }


                const user =
                    users.find(
                        item =>
                            String(item.email || "")
                                .trim()
                                .toLowerCase() === email &&
                            String(item.password || "") === password
                    );


                if (!user) {

                    showMessage(
                        "Incorrect email or password."
                    );

                    return;

                }


                const loggedInUser = {

                    id:
                        user.id ||
                        Date.now(),

                    name:
                        user.name ||
                        user.fullName ||
                        "User",

                    email:
                        user.email ||
                        email,

                    phone:
                        user.phone ||
                        "",

                    loginAt:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "earthEssentialUser",
                    JSON.stringify(loggedInUser)
                );


                showMessage(
                    "Login successful. Redirecting...",
                    "success"
                );


                const redirect =
                    new URLSearchParams(
                        window.location.search
                    ).get("redirect");


                setTimeout(
                    () => {

                        if (redirect) {

                            window.location.href =
                                decodeURIComponent(redirect);

                        } else {

                            window.location.href =
                                "account.html";

                        }

                    },
                    700
                );

            }
        );

    }


    const cartCount =
        document.querySelector(".cart-count");


    if (cartCount) {

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


    const wishlistCount =
        document.querySelector(".wishlist-count");


    if (wishlistCount) {

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

});