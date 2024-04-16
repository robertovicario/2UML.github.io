document.getElementById("btn-theme").addEventListener("click", () => {
    let html = document.documentElement;
    let currentTheme = html.getAttribute("data-bs-theme");

    if (currentTheme === "light") {
        html.setAttribute("data-bs-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        html.setAttribute("data-bs-theme", "light");
        localStorage.setItem("theme", "light");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let html = document.documentElement;
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        html.setAttribute("data-bs-theme", savedTheme);
    }
});
