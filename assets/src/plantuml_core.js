const pathname = window.location.pathname.match(/^.*[\/]/)[0]
window.location.hash.substr(1).split('&').reduce(function (res, item) {
    var parts = item.split('=')
    res[parts[0]] = parts[1]
    return res
}, {})
const editor = document.getElementById('message-2');

function _render() {
    plantuml.renderPng(editor.value).then((blob) => {
        document.getElementById('img-diagram').style.background = "url(" + window.URL.createObjectURL(blob) + ") center / contain no-repeat";
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
    document.addEventListener('DOMContentLoaded', (event) => {
        debouncedRender()
    });

    editor.addEventListener('input', (event) => {
        debouncedRender()
    })
})
