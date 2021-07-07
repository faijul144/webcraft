"use strict";

// Smooth Scroll
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });

// Small Menu
$(".hamberger").on("click", function (e) {
  e.preventDefault();
  !$(this).hasClass("open")
    ? $(this).addClass("open")
    : $(this).removeClass("open");
  !$(this).parent().find(".nav-menu").hasClass("open")
    ? $(".nav-menu").addClass("open")
    : $(".nav-menu").removeClass("open");
});

// Set data-img as background style
$("[data-img]").each(function () {
  let bgImageSrc = $(this).attr("data-img");
  $(this).css("background-image", `url(${bgImageSrc})`);
});
