const pathname = window.location.pathname.match(/^.*[\/]/)[0]
window.location.hash.substr(1).split('&').reduce(function (res, item) {
    var parts = item.split('=')
    res[parts[0]] = parts[1]
    return res
}, {})
const editor = document.getElementById('compiler');

function _render() {
    plantuml.renderPng(editor.value).then((blob) => {
        document.getElementById('img-uml').src = window.URL.createObjectURL(blob);
    }).catch((error) => {
        console.log(error)
    })
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

const debouncedRender = debounce(() => _render())

let currentPath = window.location.pathname;
if (currentPath == "/") {
    currentPath = "";
}

const jarPath = `/app/${currentPath}assets/lib`;
plantuml.initialize(jarPath).then(() => {
    document.addEventListener('DOMContentLoaded', (e) => {
        debouncedRender();
    });
    editor.addEventListener('input', (e) => {
        debouncedRender();
    });
})
