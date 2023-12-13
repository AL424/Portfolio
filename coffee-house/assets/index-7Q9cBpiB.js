(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const burgerIcon = document.querySelector(".burger-icon");
const nav = document.querySelector(".nav-wrap");
burgerIcon.addEventListener("click", () => {
  [burgerIcon, nav].forEach((elem) => {
    elem.classList.toggle("open");
  });
  window.scrollTo(0, 0);
  document.body.classList.toggle("no-scroll");
});
const links = document.querySelectorAll(".logo, .nav__link");
const menuClose = () => {
  [burgerIcon, nav].forEach((elem) => {
    elem.classList.remove("open");
  });
  document.body.classList.remove("no-scroll");
};
links.forEach((link) => {
  link.addEventListener("click", () => menuClose());
});
window.addEventListener("resize", (event) => {
  if (event.target.innerWidth >= 769)
    menuClose();
});
//# sourceMappingURL=index-7Q9cBpiB.js.map
