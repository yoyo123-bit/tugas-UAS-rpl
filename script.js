
// ====================================
// 1. ANIMASI SAAT SCROLL
// ====================================

const revealElements = document.querySelectorAll(
    ".about, .product-card, .benefit, .testimonial-box, .contact-container"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

function revealOnScroll() {
    revealElements.forEach(element => {
        const position = element.getBoundingClientRect().top;

        if (position < window.innerHeight - 80) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


// ====================================
// 2. BACK TO TOP
// ====================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// ====================================
// 3. AUTO TESTIMONIAL SLIDER
// ====================================

let autoSlider;

function startAutoSlider() {
    autoSlider = setInterval(function() {
        changeReview(1);
    }, 5000);
}

function resetAutoSlider() {
    clearInterval(autoSlider);
    startAutoSlider();
}

// Jalankan slider otomatis
startAutoSlider();

// Tombol manual tetap bisa digunakan
document.querySelectorAll(".slider-buttons button")
    .forEach(button => {
        button.addEventListener("click", resetAutoSlider);
    });


// ====================================
// 4. NOTIFICATION
// ====================================

const notification = document.createElement("div");

notification.id = "notification";
document.body.appendChild(notification);

function showNotification(text) {
    notification.textContent = text;
    notification.classList.add("show");

    setTimeout(function() {
        notification.classList.remove("show");
    }, 3000);
}


// ====================================
// 5. EFEK TOMBOL ORDER
// ====================================

document.querySelectorAll(
    '.product-card .btn'
).forEach(button => {

    button.addEventListener("click", function() {
        const productName = this
            .closest(".product-card")
            .querySelector("h3")
            .textContent;

        sessionStorage.setItem(
            "selectedProduct",
            productName
        );
    });

});


// ====================================
// 6. MENGAMBIL PRODUK PILIHAN
// ====================================

const questionField = document.getElementById("question");

const selectedProduct = sessionStorage.getItem(
    "selectedProduct"
);

if (selectedProduct && questionField) {
    questionField.value =
        "Saya ingin memesan " + selectedProduct;

    sessionStorage.removeItem("selectedProduct");
}


// ====================================
// 7. FORM SUCCESS NOTIFICATION
// ====================================

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const question = document.getElementById("question").value.trim();

    if (!name || !phone || !question) {
        showNotification("Mohon lengkapi semua kolom!");
        return;
    }

    if (!/^[0-9+\-\s]{8,20}$/.test(phone)) {
        showNotification("Nomor HP tidak valid!");
        return;
    }

    showNotification(
        "Terima kasih " + name + "! Form berhasil divalidasi."
    );

    form.reset();

});
