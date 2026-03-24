var $documment = $(document);
var $window = $(window);
var $html = $("html");
var $body = $("body");

$documment.ready(function () {
    jQuery(document).ready(function ($) {
        var count = $(".tab-triggers [id^='tab-trigger-']").length;
        var duration = 400;

        // Preload all tab images
        for (var p = 2; p <= count; p++) {
            var src = $(".tab-image-" + p)
                .closest(".fusion-image-element")
                .find("img")
                .attr("src");
            if (src) {
                new Image().src = src;
            }
        }

        // Set first trigger as active on load
        $("#tab-trigger-1").addClass("tab-trigger-active");

        for (var i = 1; i <= count; i++) {
            (function (idx) {
                $("#tab-trigger-" + idx).on("click", function () {
                    for (var j = 1; j <= count; j++) {
                        var $panel = $(".tab-panel-" + j);
                        var $img = $(".tab-image-" + j).closest(".fusion-image-element");
                        var $trigger = $("#tab-trigger-" + j);

                        if (j === idx) {
                            $panel.show();
                            $img.stop(true).css("pointer-events", "auto").animate({ opacity: 1 }, duration);
                            $trigger.addClass("tab-trigger-active");
                        } else {
                            $panel.hide();
                            $img.stop(true).css("pointer-events", "none").animate({ opacity: 0 }, duration);
                            $trigger.removeClass("tab-trigger-active");
                        }
                    }
                });
            })(i);
        }
    });
});

$window.ready(function () {});

$window.on("scroll", function () {});
