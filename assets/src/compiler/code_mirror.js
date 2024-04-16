/**
 * Themes: https://codemirror.net/5/demo/theme.html
 * 
 * @returns {CodeMirror} - An instance of CodeMirror editor.
 */
export function initializeCompiler() {
    return CodeMirror.fromTextArea(document.getElementById("compiler"), {
        lineNumbers: true,
        mode: 'htmlmixed',
        theme: 'the-matrix'
    });
}
