/**
 * This script initializes a PlantUML compiler using CodeMirror for real-time rendering of UML diagrams.
 */
import { initializeCompiler } from "./code_mirror.js";

/**
 * It renders the UML diagram to a PNG blob and sets it as the source of the <img> element.
 */
let currentPath = window.location.pathname.replace('index.html', '');;
const compiler = initializeCompiler();
const img_uml = document.getElementById('img-uml');
function render() {
    plantuml.renderPng(compiler.getValue())
        .then(blob => {
            img_uml.src = window.URL.createObjectURL(blob);
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
        render();
    })
    .catch(error => {
        console.error("Error: ", error);
    });
    