document.addEventListener("DOMContentLoaded", () => {

    const registerForm =
        document.getElementById("registerForm");

    const nameInput =
        document.getElementById("registerName");

    const emailInput =
        document.getElementById("registerEmail");

    const phoneInput =
        document.getElementById("registerPhone");

    const passwordInput =
        document.getElementById("registerPassword");

    const confirmPasswordInput =
        document.getElementById("registerConfirmPassword");

    const togglePassword =
        document.getElementById("toggleRegisterPassword");

    const toggleConfirmPassword =
        document.getElementById("toggleConfirmPassword");

    const registerMessage =
        document.getElementById("registerMessage");


    function getUsers() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "earthEssentialUsers"
                )
            ) || [];

        } catch (error) {

            return [];

        }

    }


    function saveUsers(users) {

        localStorage.setItem(
            "earthEssentialUsers",
            JSON.stringify(users)
        );

    }


    function showMessage(message, type = "error") {

        if (!registerMessage) {
            return;
        }

        registerMessage.textContent =
            message;

        registerMessage.className =
            "register-message show";

        if (type === "success") {

            registerMessage.classList.add(
                "success"
            );

        }

    }


    function hideMessage() {

        if (!registerMessage) {
            return;
        }

        registerMessage.textContent = "";

        registerMessage.className =
            "register-message";

    }


    function togglePasswordVisibility(
        input,
        button
    ) {

        if (!input || !button) {
            return;
        }

        const isPassword =
            input.type === "password";


        input.type =
            isPassword
                ? "text"
                : "password";


        button.textContent =
            isPassword
                ? "Hide"
                : "Show";


        button.setAttribute(
            "aria-label",
            isPassword
                ? "Hide password"
                : "Show password"
        );

    }


    if (togglePassword) {

        togglePassword.addEventListener(
            "click",
            () => {

                togglePasswordVisibility(
                    passwordInput,
                    togglePassword
                );

            }
        );

    }


    if (toggleConfirmPassword) {

        toggleConfirmPassword.addEventListener(
            "click",
            () => {

                togglePasswordVisibility(
                    confirmPasswordInput,
                    toggleConfirmPassword
                );

            }
        );

    }


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


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                hideMessage();


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const email =
                    emailInput
                        ? emailInput.value
                            .trim()
                            .toLowerCase()
                        : "";


                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";


                const password =
                    passwordInput
                        ? passwordInput.value
                        : "";


                const confirmPassword =
                    confirmPasswordInput
                        ? confirmPasswordInput.value
                        : "";


                if (!name) {

                    showMessage(
                        "Please enter your full name."
                    );

                    if (nameInput) {
                        nameInput.focus();
                    }

                    return;

                }


                if (name.length < 2) {

                    showMessage(
                        "Please enter a valid name."
                    );

                    if (nameInput) {
                        nameInput.focus();
                    }

                    return;

                }


                if (!email) {

                    showMessage(
                        "Please enter your email address."
                    );

                    if (emailInput) {
                        emailInput.focus();
                    }

                    return;

                }


                if (
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        .test(email)
                ) {

                    showMessage(
                        "Please enter a valid email address."
                    );

                    if (emailInput) {
                        emailInput.focus();
                    }

                    return;

                }


                if (
                    phone &&
                    !/^\d{10}$/.test(phone)
                ) {

                    showMessage(
                        "Phone number must contain 10 digits."
                    );

                    if (phoneInput) {
                        phoneInput.focus();
                    }

                    return;

                }


                if (!password) {

                    showMessage(
                        "Please create a password."
                    );

                    if (passwordInput) {
                        passwordInput.focus();
                    }

                    return;

                }


                if (password.length < 6) {

                    showMessage(
                        "Password must be at least 6 characters."
                    );

                    if (passwordInput) {
                        passwordInput.focus();
                    }

                    return;

                }


                if (!confirmPassword) {

                    showMessage(
                        "Please confirm your password."
                    );

                    if (confirmPasswordInput) {
                        confirmPasswordInput.focus();
                    }

                    return;

                }


                if (password !== confirmPassword) {

                    showMessage(
                        "Passwords do not match."
                    );

                    if (confirmPasswordInput) {
                        confirmPasswordInput.focus();
                    }

                    return;

                }


                const users =
                    getUsers();


                const existingUser =
                    users.find(
                        user =>
                            String(user.email || "")
                                .trim()
                                .toLowerCase() === email
                    );


                if (existingUser) {

                    showMessage(
                        "An account with this email already exists. Please login."
                    );

                    return;

                }


                const newUser = {

                    id: Date.now(),

                    name: name,

                    email: email,

                    phone: phone,

                    password: password,

                    createdAt:
                        new Date().toISOString()

                };


                users.push(newUser);

                saveUsers(users);


                localStorage.setItem(
                    "earthEssentialUser",
                    JSON.stringify({
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email,
                        phone: newUser.phone,
                        loginAt:
                            new Date().toISOString()
                    })
                );


                showMessage(
                    "Account created successfully. Redirecting...",
                    "success"
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "account.html";

                    },
                    900
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