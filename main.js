(function () {
    const images = [
        { src: "img/projects/iphone15.jpg", alt: "iPhone 15 project preview" },
        { src: "img/projects/dbz.jpg", alt: "Dragon Ball Z project preview" },
        { src: "img/projects/batanes.jpg", alt: "Batanes project preview" },
        { src: "img/projects/despicableme.jpg", alt: "Despicable Me project preview" },
        { src: "img/projects/kathelia.jpg", alt: "Kathelia project preview" },
        { src: "img/projects/learnexus.jpg", alt: "LearneXus project preview" },
        { src: "img/projects/wael.jpg", alt: "Wael project preview" },
        { src: "img/cert.png", alt: "Certificate" },
        { src: "img/me.jpg", alt: "Portrait" },
        { src: "img/lbg.png", alt: "Logo" },
        { src: "img/dbg.png", alt: "Decorative image" }
    ];

    const img1 = document.getElementById("galleryImg1");
    const img2 = document.getElementById("galleryImg2");
    const prev = document.getElementById("galleryPrev");
    const next = document.getElementById("galleryNext");

    if (!img1 || !img2 || !prev || !next) return;

    let startIndex = 0;
    let lightboxIndex = 0;

    function render() {
        const secondIndex = (startIndex + 1) % images.length;
        img1.src = images[startIndex].src;
        img1.alt = images[startIndex].alt;
        img2.src = images[secondIndex].src;
        img2.alt = images[secondIndex].alt;
    }

    prev.addEventListener("click", function () {
        startIndex = (startIndex - 1 + images.length) % images.length;
        render();
    });

    next.addEventListener("click", function () {
        startIndex = (startIndex + 1) % images.length;
        render();
    });

    const lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";
    lightbox.setAttribute("aria-hidden", "true");

    lightbox.innerHTML =
        '<div class="gallery-lightbox-counter"></div>' +
        '<button class="gallery-lightbox-close" type="button" aria-label="Close">×</button>' +
        '<button class="gallery-lightbox-nav gallery-lightbox-prev" type="button" aria-label="Previous">‹</button>' +
        '<img class="gallery-lightbox-image" alt="Zoomed gallery image">' +
        '<button class="gallery-lightbox-nav gallery-lightbox-next" type="button" aria-label="Next">›</button>' +
        '<div class="gallery-lightbox-hint">Use arrow keys to navigate • ESC to close</div>';

    document.body.appendChild(lightbox);

    const lbImage = lightbox.querySelector(".gallery-lightbox-image");
    const lbCounter = lightbox.querySelector(".gallery-lightbox-counter");
    const lbClose = lightbox.querySelector(".gallery-lightbox-close");
    const lbPrev = lightbox.querySelector(".gallery-lightbox-prev");
    const lbNext = lightbox.querySelector(".gallery-lightbox-next");

    function updateLightbox() {
        const item = images[lightboxIndex];
        lbImage.src = item.src;
        lbImage.alt = item.alt;
        lbCounter.textContent = (lightboxIndex + 1) + " / " + images.length;
    }

    function openLightbox(index) {
        lightboxIndex = (index + images.length) % images.length;
        updateLightbox();
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
    }

    function stepLightbox(delta) {
        lightboxIndex = (lightboxIndex + delta + images.length) % images.length;
        updateLightbox();
    }

    img1.addEventListener("click", function () {
        openLightbox(startIndex);
    });

    img2.addEventListener("click", function () {
        openLightbox((startIndex + 1) % images.length);
    });

    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function () { stepLightbox(-1); });
    lbNext.addEventListener("click", function () { stepLightbox(1); });

    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") stepLightbox(-1);
        if (e.key === "ArrowRight") stepLightbox(1);
    });

    render();
})();

(function () {
    const cards = document.querySelectorAll(".project-card");
    if (!cards.length) return;

    cards.forEach(function (card) {
        card.setAttribute("tabindex", "0");
        card.addEventListener("keypress", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const onclick = card.getAttribute("onclick") || "";
                const match = onclick.match(/'(.*?)'/);
                if (match && match[1]) {
                    window.open(match[1], "_blank");
                }
            }
        });
    });
})();

(function () {
    const revealTargets = document.querySelectorAll("[data-reveal]");
    if (!revealTargets.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = parseInt(el.dataset.delay, 10) || 0;
            setTimeout(function () {
                el.classList.add("in-view");
            }, delay);
            observer.unobserve(el);
        });
    }, { threshold: 0.12 });

    revealTargets.forEach(function (el) {
        observer.observe(el);
    });
})();