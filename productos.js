//Espera a que todos los elementos de la página se carguen para continuar con el script

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready (){
    //Agregar producto
    var botonesAgregarAlCarrito = document.getElementsByClassName('btn-item');
    for(var i = 0; i < botonesAgregarAlCarrito.length; i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);

    }
}

function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;

    // Obtiene los datos específicos del producto que fue clicado
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    // Agregar los elementos al carrito (envía parámetros)
    agregarItemAlCarrito(titulo, precio, imagenSrc);
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    // Recupera los productos almacenados en localStorage, o inicia con un array vacío
    const memoria = JSON.parse(localStorage.getItem("item")) || [];

    // Intenta encontrar el producto en el array por su título (o algún identificador único)
    const productoExistente = memoria.find(producto => producto.titulo === titulo);

    if (productoExistente) {
        // Si el producto ya existe, solo aumenta la cantidad
        productoExistente.cantidad += 1;
        alert("Se ha sumado 1 producto más al carrito");
    } else {
        // Si el producto no existe, crea uno nuevo y lo agrega al array
        const nuevoProducto = {
            titulo: titulo,
            precio: precio,
            imagenSrc: imagenSrc,
            cantidad: 1
        };
        memoria.push(nuevoProducto);//nidea pa que sirve nasdjadj
        alert("Se ha agregado el producto al carrito con éxito");
    }
    // Guarda el array actualizado en localStorage
    localStorage.setItem("item", JSON.stringify(memoria));
}