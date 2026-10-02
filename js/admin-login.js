document.addEventListener("DOMContentLoaded", () => {

    const ADMIN_EMAIL = "admin@earthessential.com";
    const ADMIN_PASSWORD = "Admin@123";

    const form = document.getElementById("adminLoginForm");
    const emailInput = document.getElementById("adminEmail");
    const passwordInput = document.getElementById("adminPassword");
    const togglePassword = document.getElementById("togglePassword");
    const errorMessage = document.getElementById("adminLoginError");

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {

            const isPassword =
                passwordInput.type === "password";

            passwordInput.type =
                isPassword ? "text" : "password";

            togglePassword.textContent =
                isPassword ? "Hide" : "Show";

            togglePassword.setAttribute(
                "aria-label",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );
        });
    }

    if (form) {
        form.addEventListener("submit", (event) => {

            event.preventDefault();

            const email =
                emailInput.value.trim().toLowerCase();

            const password =
                passwordInput.value;

            if (errorMessage) {
                errorMessage.style.display = "none";
                errorMessage.textContent = "";
            }

            if (
                email === ADMIN_EMAIL &&
                password === ADMIN_PASSWORD
            ) {

                localStorage.setItem(
                    "earthEssentialAdmin",
                    "true"
                );

                window.location.href =
                    "admin.html";

                return;
            }

            if (errorMessage) {

                errorMessage.textContent =
                    "Invalid admin email or password.";

                errorMessage.style.display =
                    "block";
            }

            passwordInput.value = "";
            passwordInput.focus();
        });
    }

});