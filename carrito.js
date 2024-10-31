document.addEventListener('DOMContentLoaded', function() {
    cargarCarritoDesdeLocalStorage();
    comprarCarrito();
});

function cargarCarritoDesdeLocalStorage() {
    // Obtener los productos desde localStorage
    const productosCarrito = JSON.parse(localStorage.getItem("item")) || [];

    // Seleccionar el contenedor donde se mostrarán los productos del carrito
    const carritoContenedor = document.getElementsByClassName('carrito-items')[0];

    // Limpiar el contenedor en caso de que haya elementos previos
    carritoContenedor.innerHTML = '';

    // Recorrer los productos guardados y mostrarlos en el carrito
    productosCarrito.forEach(producto => {
        const carritoItem = document.createElement('div');
        //Producto
        carritoItem.classList.add('carrito-item');
        //Estructura del producto
        carritoItem.innerHTML = `
            <div class="selector-cantidad">
                <i class="fa fa-arrow-up sumar-cantidad" aria-hidden="true"></i>
                <input type="text" value="${producto.cantidad}" class="carrito-item-cantidad" disabled>
                <i class="fa fa-arrow-down restar-cantidad" aria-hidden="true"></i>
            </div>
            <img src="${producto.imagenSrc}" alt="${producto.titulo}" width="80px">
            <div class="item-producto">
                <span class="producto-titulo">${producto.titulo}</span>
                <span class="producto-detalle">Me puse la gucci con un short de nike buzo y cadena estoy que goteo</span>
            </div>
            <div class="item-precio">
                <span class="precio">${producto.precio}</span>
                <button class="btn-eliminar">(Eliminar)</button>
            </div>
        `;
        carritoContenedor.appendChild(carritoItem);

        // Agrega event listeners para los botones de cantidad y eliminación
        carritoItem.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
        carritoItem.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);
        carritoItem.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);
    });

    // Actualizar el total del carrito después de cargar los elementos
    actualizarTotalCarrito();
}

// Actualiza el total del carrito
function actualizarTotalCarrito() {
    const carritoContenedor = document.getElementsByClassName('carrito-items')[0];
    const carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;

    for (let i = 0; i < carritoItems.length; i++) {
        const item = carritoItems[i];
        const precioElemento = item.getElementsByClassName('precio')[0];
        const precio = parseFloat(precioElemento.innerText.replace('$', ''));
        const cantidad = item.getElementsByClassName('carrito-item-cantidad')[0].value;
        total += precio * cantidad;
    }

    //Redondea el total
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}

// Elimina un item del carrito y actualiza localStorage
function eliminarItemCarrito(event) {
    const buttonClicked = event.target;
    const item = buttonClicked.parentElement.parentElement; // Selecciona el elemento del carrito
    const titulo = item.getElementsByClassName('producto-titulo')[0].innerText.trim().toLowerCase(); // Obtiene el título del producto

    // Eliminar del DOM
    item.remove();

    // Eliminar del localStorage
    let productosCarrito = JSON.parse(localStorage.getItem("item")) || []; // Obtiene los productos del localStorage
    productosCarrito = productosCarrito.filter(producto => producto.titulo.toLowerCase() !== titulo); // Filtra el producto a eliminar
    localStorage.setItem("item", JSON.stringify(productosCarrito)); // Guarda los productos restantes en el localStorage

    // Actualizar el total del carrito después de eliminar el producto
    actualizarTotalCarrito();
}

// Sumar cantidad y actualizar localStorage
function sumarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    let cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;

        //Funciones implementadas de actualización Local Storage
    actualizarLocalStorage(selector);
    actualizarTotalCarrito();
}

//Función Restar cantidad (la misma estructura que la función "sumarCantidad", con la diferencia de tener un condicional)
function restarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    //Busca el valor de la cantidad de items (producto) 
    let cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    
    //Siempre y cuando el valor de la cantidad sea mayor a 1, se podrá restar la cantidad. Es imposible restar la cantidad de 1
    if (cantidadActual > 1) {
        cantidadActual--;
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    }

    //Funciones implementadas de actualización Local Storage
    actualizarLocalStorage(selector);
    actualizarTotalCarrito();
}

// Función para actualizar el localStorage cuando cambia la cantidad de un producto
function actualizarLocalStorage(selector) {
    const titulo = selector.parentElement.getElementsByClassName('producto-titulo')[0].innerText;
    const nuevaCantidad = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);

    let productosCarrito = JSON.parse(localStorage.getItem("item")) || [];
    const producto = productosCarrito.find(producto => producto.titulo === titulo);
    if (producto) {
        producto.cantidad = nuevaCantidad;
        localStorage.setItem("item", JSON.stringify(productosCarrito));
    }
}

/*-------------------------------------------------------------------------*/

//Función Comprar Carrito
function comprarCarrito() {
    //Busca el valor del boton "Continuar al pago" por su clase para luego agregarle un evento
    const botonPagar = document.getElementsByClassName("btn-pagar");
    Array.from(botonPagar).forEach(boton => {
        boton.addEventListener('click', function() {
            // Verificar si el carrito tiene productos
            const productosCarrito = JSON.parse(localStorage.getItem("item")) || [];
            if (productosCarrito.length === 0) {
                //Si no tiene productos dentro del carrito, envia error mensaje
                alert("Error: No hay productos en el carrito.");
                return;
            }
            //Si tiene productos dentro del carrito, envia mensaje de éxito
            alert("Su compra se ha realizado con éxito");

            // Limpiar localStorage
            localStorage.clear();

            // Redirigir a otra página
           res.send("Pago"); // !!!!!!!!!!!!!!!!!IMPORTANTE elegir la pagina a donde quieres redirigirte!!!!!!!!!!!!!!!!!!!!!
        });
    });
}