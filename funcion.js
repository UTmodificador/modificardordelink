function modifyURL() {
    let urlInput = document.getElementById("urlInput").value.trim();
    let messageElement = document.getElementById("message");

    if (urlInput === "") {
        alert("Por favor, ingresa una URL.");
        return;
    }

    try {
        let url = new URL(urlInput);
        let pathParts = url.pathname.split("/");

        // Reemplazar "/get" por "/qnap"
        if (pathParts[1] === "get") {
            pathParts[1] = "qnap";
        }

        // Insertar "/tmp" después de "/imagenes"
        let imagenesIndex = pathParts.indexOf("imagenes");
        if (imagenesIndex !== -1 && imagenesIndex + 1 < pathParts.length) {
            pathParts.splice(imagenesIndex + 1, 0, "tmp");
        }

        let modifiedURL = url.origin + pathParts.join("/");
        document.getElementById("result").value = modifiedURL;

        // Copiar al portapapeles
        navigator.clipboard.writeText(modifiedURL).then(() => {
            messageElement.innerText = "✅ Enlace modificado correctamente y copiado al portapapeles";
            messageElement.style.visibility = "visible"; // Hace visible el mensaje
        }).catch(() => {
            messageElement.innerText = "⚠️ Enlace modificado, pero no se pudo copiar automáticamente.";
            messageElement.style.visibility = "visible";
        });

        // Abrir la URL modificada en una nueva pestaña
        window.open(modifiedURL, '_blank');
    } catch (error) {
        alert("URL no válida. Asegúrate de ingresarla correctamente.");
    }
}






