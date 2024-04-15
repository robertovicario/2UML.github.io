document.getElementById("btn-theme").addEventListener("click", () => {
    let html = document.documentElement;
    let currentTheme = html.getAttribute("data-bs-theme");

    if (currentTheme === "light") {
        html.setAttribute("data-bs-theme", "dark");
    } else {
        html.setAttribute("data-bs-theme", "light");
    }
});
