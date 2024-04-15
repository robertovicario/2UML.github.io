const pathname = window.location.pathname.replace(/\/$/, '');

const compiler_uml = document.getElementById('compiler');
const img_uml = document.getElementById('img-uml');

function render() {
    plantuml.renderPng(compiler_uml.value)
        .then(blob => {
            img_uml.src = window.URL.createObjectURL(blob);
        })
        .catch(error => {
            console.error(error);
        });
}

compiler_uml.addEventListener('input', render);

let currentPath = window.location.pathname === "/" ? "" : window.location.pathname;
const jarPath = `/app/${currentPath}assets/lib`;
plantuml.initialize(jarPath)
    .then(() => {
        render(); // Initial render
    })
    .catch(error => {
        console.error("Error initializing PlantUML:", error);
    });
