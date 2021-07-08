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

// Sticky Menu
const w = $(window);
const header = $("header");
w.bind("scroll", function () {
  w.scrollTop() > 150
    ? header.removeClass("header").addClass("sticky")
    : header.removeClass("sticky").addClass("header");
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

// Main Observer For Animation
const options = {
  treshold: 0,
  rootMargin: "0px 0px -250px 0px",
};
const animationObserver = new IntersectionObserver(function (entries) {
  $(entries).each(function () {
    if (!this.isIntersecting) {
      $(this.target).removeClass("appear");
    } else {
      $(this.target).addClass("appear");
      if ($(this.target).hasClass("grid__item")) {
        let gridLinks = $(this.target);
        gridLinks.each(function () {
          animationObserver.unobserve(this);
        });
      }
    }
  });
}, options);

// Init Observer For Animation

const animations = [".slide", ".pop-up"];

$(animations).each(function () {
  $(this).each(function () {
    let animationDelay = $(this).attr("delay");
    animationDelay != "" || animationDelay != undefined
      ? $(this).css("transition-delay", animationDelay + "s")
      : "";
    animationObserver.observe(this);
  });
});
