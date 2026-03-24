var $documment = $(document);
var $window = $(window);
var $html = $("html");
var $body = $("body");

$documment.ready(function () {
    jQuery(document).ready(function ($) {
        var $triggers = $(".tab-triggers .tab-trigger");
        var count = $triggers.length;
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

        // Set up ARIA on the trigger container
        $(".tab-triggers").attr("role", "tablist");

        // Set up ARIA on each trigger and panel
        for (var i = 1; i <= count; i++) {
            var $trigger = $("#tab-trigger-" + i);
            var $panel = $(".tab-panel-" + i);

            $trigger
                .attr("role", "tab")
                .attr("tabindex", "0")
                .attr("aria-selected", i === 1 ? "true" : "false")
                .attr("aria-controls", "tab-panel-" + i);

            $panel
                .attr("role", "tabpanel")
                .attr("id", "tab-panel-" + i)
                .attr("aria-labelledby", "tab-trigger-" + i)
                .attr("tabindex", "0");
        }

        // Set first trigger as active on load
        $("#tab-trigger-1").addClass("tab-trigger-active");

        function restoreTabindex() {
            setTimeout(function () {
                for (var t = 1; t <= count; t++) {
                    $("#tab-trigger-" + t).attr("tabindex", "0");
                }
            }, 50);
        }

        function activateTab(idx) {
            for (var j = 1; j <= count; j++) {
                var $panel = $(".tab-panel-" + j);
                var $img = $(".tab-image-" + j).closest(".fusion-image-element");
                var $trigger = $("#tab-trigger-" + j);

                if (j === idx) {
                    $panel.show();
                    $img.stop(true).css("pointer-events", "auto").animate({ opacity: 1 }, duration);
                    $trigger.addClass("tab-trigger-active").attr("aria-selected", "true");
                } else {
                    $panel.hide();
                    $img.stop(true).css("pointer-events", "none").animate({ opacity: 0 }, duration);
                    $trigger.removeClass("tab-trigger-active").attr("aria-selected", "false");
                }
            }

            // Return focus to the activated trigger and restore tabindex
            $("#tab-trigger-" + idx).focus();
            restoreTabindex();
        }

        // Restore tabindex on load in case Avada overrides it
        restoreTabindex();

        for (var i = 1; i <= count; i++) {
            (function (idx) {
                $(document).on("click", "#tab-trigger-" + idx + " p", function () {
                    activateTab(idx);
                });

                $("#tab-trigger-" + idx).on("keydown", function (e) {
                    var key = e.key;
                    if (key === "Enter" || key === " ") {
                        e.preventDefault();
                        activateTab(idx);
                    } else if (key === "ArrowDown" || key === "ArrowRight") {
                        e.preventDefault();
                        var next = idx < count ? idx + 1 : 1;
                        $("#tab-trigger-" + next).focus();
                    } else if (key === "ArrowUp" || key === "ArrowLeft") {
                        e.preventDefault();
                        var prev = idx > 1 ? idx - 1 : count;
                        $("#tab-trigger-" + prev).focus();
                    } else if (key === "Home") {
                        e.preventDefault();
                        $("#tab-trigger-1").focus();
                    } else if (key === "End") {
                        e.preventDefault();
                        $("#tab-trigger-" + count).focus();
                    }
                });
            })(i);
        }
    });
});

$window.ready(function () {});

$window.on("scroll", function () {});
