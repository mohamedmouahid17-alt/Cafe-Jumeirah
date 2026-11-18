const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-card");
const sections = document.querySelectorAll(".menu section");

searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase().trim();

    products.forEach(product => {
        const productName = product.querySelector("h4").textContent.toLowerCase();
        const description = product.querySelector("p").textContent.toLowerCase();

        product.style.display =
            productName.includes(searchValue) ||
            description.includes(searchValue)
            ? "block"
            : "none";
    });

    sections.forEach(section => {
        const visibleProducts = section.querySelectorAll(
            ".product-card:not([style*='display: none'])"
        );

        section.style.display = visibleProducts.length ? "block" : "none";
    });
});
const animatedCards = document.querySelectorAll(".product-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-card");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

animatedCards.forEach(card => {
    card.classList.add("hidden-card");
    observer.observe(card);
});
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", function () {
    const visibleProducts = [...products].filter(
        product => product.style.display !== "none"
    );

    noResults.style.display =
        visibleProducts.length === 0 ? "block" : "none";
});