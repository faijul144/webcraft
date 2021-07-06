"use strict";

// Set data-img as background style
document.querySelectorAll("[data-img]").forEach(function (item) {
  let bgImageSrc = item.getAttribute("data-img");
  item.style.backgroundImage = `url(${bgImageSrc})`;
});
