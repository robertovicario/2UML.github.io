// Themes: https://codemirror.net/5/demo/theme.html
export function initializeCompiler() {
    return CodeMirror.fromTextArea(document.getElementById("compiler"), {
        lineNumbers: true,
        mode: 'htmlmixed',
        theme: 'the-matrix'
    });
}
