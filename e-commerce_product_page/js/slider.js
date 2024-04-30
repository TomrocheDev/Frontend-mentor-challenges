function initializeSwiperLarge() {
    var swiper = new Swiper(".lg-product-swiper", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class='${className}'><img class="img-fluid thumbnail" alt="Item thumbnail ${index}" /></span>`;
            },
        },
    });

    const thumbnails = document.querySelectorAll(".thumbnail");
    const imagePaths = [
        "images/image-product-1-thumbnail.jpg",
        "images/image-product-2-thumbnail.jpg",
        "images/image-product-3-thumbnail.jpg",
        "images/image-product-4-thumbnail.jpg",
    ];

    imagePaths.map((path, index) => thumbnails[index].setAttribute("src", path));
}

function initializeSwiperSmall() {
    var swiper = new Swiper(".sm-product-swiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

window.addEventListener("load", () => {
    window.innerWidth > 768 ? initializeSwiperLarge() : initializeSwiperSmall();
});

window.addEventListener("resize", () => {
    window.innerWidth > 768 ? initializeSwiperLarge() : initializeSwiperSmall();
});
