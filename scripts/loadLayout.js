window.loadLayout = function (callback) {
  fetch("partials/header.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("header").innerHTML = html;
      const currentPage =
        window.location.pathname.split("/").pop().replace(".html", "") ||
        "index";
      document.querySelectorAll(".nav-menu a").forEach((link) => {
        if (link.dataset.page === currentPage) link.classList.add("active");
      });
      if (callback) callback();
    });

  fetch("partials/footer.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("footer").innerHTML = html;
    });
};
