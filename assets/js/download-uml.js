document.getElementById("btn-download").addEventListener("click", function() {
    let img = document.getElementById("img-uml");
    let url = img.src;

    let filename = prompt("2UML will save your diagram as:", "2UML_Your_Diagram");
    if (filename === null) {
        return;
    }

    fetch(url)
    .then(function(response) {
        return response.blob();
    })
    .then(function(blob) {
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        
        if (filename === "") {
            link.download = "2UML_Your_Diagram.png"
        } else {
            link.download = `${filename}.png` || "2UML_Your_Diagram.png";
        }

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
