const desc = document.getElementById('desc');
desc.addEventListener('input', () => {
    desc.style.height = 'auto';
    desc.style.height = `${desc.scrollHeight}px`;
});
