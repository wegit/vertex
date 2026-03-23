var $documment = $(document);
var $window = $(window);
var $html = $("html");
var $body = $("body");

$documment.ready(function () {
    jQuery(document).ready(function ($) {
        var count = 5;

        for (var i = 1; i <= count; i++) {
            (function (idx) {
                $("#tab-trigger-" + idx).on("click", function () {
                    for (var j = 1; j <= count; j++) {
                        var $panel = $(".tab-panel-" + j);
                        var $img = $(".tab-image-" + j).closest(".fusion-image-element");
                        var $trigger = $("#tab-trigger-" + j);

                        if (j === idx) {
                            $panel.stop(true).fadeIn(400);
                            $img.stop(true).fadeIn(400);
                            $trigger.css({ fontWeight: "800", borderLeft: "4px solid #5b2d8e" });
                        } else {
                            $panel.stop(true).fadeOut(200);
                            $img.stop(true).fadeOut(200);
                            $trigger.css({ fontWeight: "700", borderLeft: "none" });
                        }
                    }
                });
            })(i);
        }
    });
});

$window.ready(function () {});

$window.on("scroll", function () {});
