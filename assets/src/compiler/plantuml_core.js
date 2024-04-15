/**
 * This script initializes a PlantUML compiler using CodeMirror for real-time rendering of UML diagrams.
 */
import { initializeCompiler } from "./code_mirror.js";

/**
 * It renders the UML diagram to a PNG blob and sets it as the source of the <img> element.
 */
let currentPath = window.location.pathname.replace('index.html', '');
const compiler = initializeCompiler();
const loader_img_uml = document.getElementById('loader-img-uml');
const img_uml = document.getElementById('img-uml');

loader_img_uml.classList.remove('none');
img_uml.classList.add('none');

setTimeout(() => {
    loader_img_uml.classList.add('none');
    img_uml.classList.remove('none');
}, 5000);

function render() {
    loader_img_uml.classList.remove('none');
    img_uml.classList.add('none');

    plantuml.renderPng(compiler.getValue())
        .then(blob => {
            img_uml.src = window.URL.createObjectURL(blob);
            setTimeout(() => {
                loader_img_uml.classList.add('none');
                img_uml.classList.remove('none');
            }, 2000);
        })
        .catch(error => {
            console.error(error);
        });
}

/**
 * Debounces a function to avoid calling it too frequently.
 * 
 * @param {Function} func - The function to be debounced.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
function debounce(func, delay = 500) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => func.apply(this, args), delay);
    };
}
compiler.on('change', debounce(render));

currentPath = currentPath === "/" ? "" : window.location.pathname;
const jarPath = `/app/${currentPath}assets/lib`;

plantuml.initialize(jarPath)
    .then(() => {
        loader_img_uml.classList.add('none');
        img_uml.classList.remove('none');

        render();
    })
    .catch(error => {
        console.error("Error: ", error);
    });
