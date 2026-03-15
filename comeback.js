(function () {
    function showOrderFromBack() {
        if (typeof window.showLandingForm === "function") {
            window.showLandingForm("browser_back");
            return;
        }

        var order = document.getElementById("order");
        var formBox = document.getElementById("formFb");
        var video = document.getElementById("video");
        var popup = document.getElementById("popup");
        var play = document.getElementById("play");
        var openVideo = document.getElementById("open-video");
        var closeBtn = document.getElementById("close");
        var container = document.getElementById("container_video");

        if (video) {
            try { video.pause(); } catch (e) {}
            video.style.display = "none";
        }

        if (popup) popup.style.display = "none";
        if (play) play.style.display = "none";
        if (openVideo) openVideo.style.display = "none";
        if (closeBtn) closeBtn.style.display = "none";
        if (container) container.classList.remove("fullscreen");

        document.body.classList.remove("noscroll");

        if (order) {
            order.style.display = "block";
            order.classList.add("show-order");
            order.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        if (formBox) {
            formBox.classList.add("form-highlight");
            setTimeout(function () {
                formBox.classList.remove("form-highlight");
            }, 2200);
        }
    }

    try {
        var cleanUrl = window.location.href.split("#")[0];
        history.pushState({ page: 1 }, "", cleanUrl + "#1");
        history.pushState({ page: 2 }, "", cleanUrl + "#2");

        window.addEventListener("popstate", function () {
            showOrderFromBack();
            history.pushState({ page: 2 }, "", cleanUrl + "#2");
        });
    } catch (e) {
        console.log("Back form error:", e);
    }
})();