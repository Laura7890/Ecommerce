// Obtén el carrito del backend
async function obtenerProductosEnCarrito() {
    try {
        const response = await fetch('/api/cart');
        if (!response.ok) throw new Error("No se pudo obtener el carrito del servidor");
        const productosEnCarrito = await response.json();

        // Muestra el contenido del carrito en el frontend
        if (productosEnCarrito.length > 0) {
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.remove("disabled");
            contenedorCarritoAcciones.classList.remove("disabled");
            contenedorCarritoComprado.classList.add("disabled");

            // Cargar productos al contenedor
            cargarProductosEnCarrito(productosEnCarrito);
        } else {
            contenedorCarritoVacio.classList.remove("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.add("disabled");
        }
    } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
    }
}

function cargarProductosEnCarrito(productos) {
    contenedorCarritoProductos.innerHTML = "";  // Limpia el contenedor

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-producto-titulo">${producto.titulo}</div>
            <div class="carrito-producto-cantidad">${producto.cantidad}</div>
            <div class="carrito-producto-precio">$${producto.precio}</div>
            <button class="carrito-eliminar" data-id="${producto.id}">Eliminar</button>
        `;
        contenedorCarritoProductos.append(div);
    });

    // Agrega eventos para eliminar productos del carrito
    document.querySelectorAll(".carrito-eliminar").forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

async function eliminarDelCarrito(e) {
    const idProducto = e.currentTarget.dataset.id;

    try {
        const response = await fetch(`/api/cart/${idProducto}`, { method: 'DELETE' });
        if (!response.ok) throw new Error("No se pudo eliminar el producto del carrito");

        // Actualizar el carrito después de eliminar
        obtenerProductosEnCarrito();
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
    }
}

// Llama a la función al cargar el archivo para mostrar el carrito actual
obtenerProductosEnCarrito();