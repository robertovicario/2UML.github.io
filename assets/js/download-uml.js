document.getElementById("btn-download").addEventListener("click", function() {
    var img = document.getElementById("img-uml");
    var url = img.src;
    var filename = "uml.png";

    fetch(url)
        .then(function(response) {
            return response.blob();
        })
        .then(function(blob) {
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
});
