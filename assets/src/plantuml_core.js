import { initializeCompiler } from "../js/code_mirror.js";

const pathname = window.location.pathname.replace(/\/$/, '');
const compiler = initializeCompiler();
const compiler_uml = document.getElementById('compiler');
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

function debounce(func, delay = 400) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
const debouncedRender = debounce(() => render())

compiler.on('change',()=>debouncedRender());
let currentPath = window.location.pathname;
if (currentPath.includes('index.html')) {
    currentPath = currentPath.replace('index.html', '');
}
currentPath = currentPath === "/" ? "" : window.location.pathname;


const jarPath = `/app/${currentPath}assets/lib`;

plantuml.initialize(jarPath)
    .then(() => {
        render();
    })
    .catch(error => {
        console.error("Error: ", error);
    });
    