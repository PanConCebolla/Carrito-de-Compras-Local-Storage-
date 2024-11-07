document.addEventListener('DOMContentLoaded', function() {
    cargarHistorialDesdeLocalStorage();
});

function cargarHistorialDesdeLocalStorage() {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];
    const contenedorCompra = document.getElementsByClassName('contenedor-Compra')[0];
    contenedorCompra.innerHTML = '';

    historial.forEach(producto => {
        const historialItem = document.createElement('div');
        historialItem.classList.add('contenedor-Informacion');
        historialItem.innerHTML = `
            <img src="${producto.imagenSrc}" alt="${producto.titulo}">
            <p>${producto.titulo}</p>
            <p>Cant. ${producto.cantidad}</p>
            <p>${producto.precio}</p>
            <p>Compra realizada: ${producto.fecha}</p>
        `;
        contenedorCompra.appendChild(historialItem);
    });
}