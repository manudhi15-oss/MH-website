document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("sellerApplicationForm");
    const message = document.getElementById("sellerFormMessage");

    const sellerApplicationsKey =
        "earthEssentialSellerApplications";

    function getApplications() {
        try {
            return JSON.parse(
                localStorage.getItem(sellerApplicationsKey)
            ) || [];
        } catch (error) {
            return [];
        }
    }

    function saveApplications(applications) {
        localStorage.setItem(
            sellerApplicationsKey,
            JSON.stringify(applications)
        );
    }

    function showMessage(text, type) {

        if (!message) {
            return;
        }

        message.textContent = text;
        message.className =
            "seller-form-message " + type;
        message.style.display = "block";
    }

    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const sellerName =
            document.getElementById("sellerName").value.trim();

        const sellerEmail =
            document.getElementById("sellerEmail").value.trim();

        const sellerPhone =
            document.getElementById("sellerPhone").value.trim();

        const businessName =
            document.getElementById("businessName").value.trim();

        const sellerCategory =
            document.getElementById("sellerCategory").value;

        const productName =
            document.getElementById("productName").value.trim();

        const productPrice =
            Number(
                document.getElementById("productPrice").value
            );

        const productStock =
            Number(
                document.getElementById("productStock").value
            );

        const productDescription =
            document
                .getElementById("productDescription")
                .value
                .trim();

        const productImage =
            document
                .getElementById("productImage")
                .value
                .trim();


        if (
            !sellerName ||
            !sellerEmail ||
            !sellerPhone ||
            !businessName ||
            !sellerCategory ||
            !productName ||
            productPrice < 0 ||
            productStock < 0 ||
            !productDescription
        ) {

            showMessage(
                "Please fill all required fields correctly.",
                "error"
            );

            return;
        }


        const applications =
            getApplications();


        const application = {

            id:
                "seller_" +
                Date.now(),

            sellerName:
                sellerName,

            sellerEmail:
                sellerEmail,

            sellerPhone:
                sellerPhone,

            businessName:
                businessName,

            category:
                sellerCategory,

            productName:
                productName,

            price:
                productPrice,

            stock:
                productStock,

            description:
                productDescription,

            image:
                productImage,

            status:
                "pending",

            submittedAt:
                new Date().toISOString()

        };


        applications.push(application);

        saveApplications(applications);


        showMessage(
            "Application submitted successfully! Our admin will review your product.",
            "success"
        );


        form.reset();


        window.scrollTo({
            top: message.offsetTop - 100,
            behavior: "smooth"
        });

    });

});