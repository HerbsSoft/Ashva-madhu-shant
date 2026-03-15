$(document).ready(function () {
    var formShown = false;

    function startTimerSafely() {
        if (typeof window.startLandingTimer === "function") {
            window.startLandingTimer();
        } else {
            console.log("startLandingTimer not found");
        }
    }

    function showOrderForm(source) {
        if (formShown) return;
        formShown = true;

        $("#container_video").removeClass("fullscreen");
        $("body").removeClass("noscroll");

        $("#popup").hide();
        $("#close").fadeOut();
        $("#open-video").fadeOut();
        $("#play").fadeOut();

        var video = $("#video").get(0);
        if (video) {
            try {
                video.pause();
            } catch (e) {}
        }

        $("#video").fadeOut("fast", function () {
            $("#order").fadeIn("fast").addClass("show-order");

            $("#formFb").addClass("form-highlight");
            setTimeout(function () {
                $("#formFb").removeClass("form-highlight");
            }, 2200);

            $("html, body").animate(
                { scrollTop: $("#order").offset().top - 20 },
                250
            );
        });

        console.log("Form shown from:", source || "unknown");
    }

    window.showLandingForm = showOrderForm;

    const playBtn = document.getElementById("play");
    const openBtn = document.getElementById("open-video");
    const closeBtn = document.getElementById("close");

    if (playBtn) {
        playBtn.addEventListener("click", function () {
            window.scrollTo(0, 0);
            $("#play").fadeOut("fast", function () {
                $("#video").prop("muted", false).trigger("play");
                $("#container_video").addClass("fullscreen");
                $("body").addClass("noscroll");
                $("#close").fadeIn();
                $("#popup").hide();

                startTimerSafely();
            });
        });
    }

    if (openBtn) {
        openBtn.addEventListener("click", function () {
            window.scrollTo(0, 0);
            $("#open-video").fadeOut("fast", function () {
                $("#container_video").addClass("fullscreen");
                $("body").addClass("noscroll");
                $("#close").fadeIn();

                var video = $("#video").get(0);
                if (video) {
                    video.play().catch(function () {});
                }

                startTimerSafely();
            });
        });
    }

    $("#video").on("ended", function () {
        showOrderForm("video_ended");
    });

    if (closeBtn) {
        $(closeBtn).on("click", function () {
            $(this).hide();
            $("#container_video").removeClass("fullscreen");
            $("body").removeClass("noscroll");
            $("#open-video").fadeIn("fast");
            $("#popup").fadeOut("fast");
        });
    }
});