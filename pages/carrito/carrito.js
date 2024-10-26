import "../carrito/carrito.css";
import Swal from 'sweetalert2';

export function showCart() {
    const main = document.querySelector("main");
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

    if (cartItems.length > 0) {
        let totalPrice = 0;

        const cartInfo = cartItems.map(item => {
            totalPrice += item.totalPrice;
            return `
                <div class="cart-item">
                    <img class="imgCarrito" src="${item.imagen}" alt="${item.nombre}" />
                    <h2 class="h2Carrito">${item.nombre}</h2>
                    <p class="pCarrito">Artista: ${item.artista}</p>
                    <p class="pCarrito">Cantidad: ${item.cantidad}</p>
                    <p class="pCarrito">Precio Total: ${item.totalPrice.toFixed(2)}€</p>
                </div>
            `;
        }).join("");

        main.innerHTML = `
            <h1 class="h1Carrito">CARRITO</h1>
            <section class = "carritoSEc">
                ${cartInfo}
                <h3 class="h3Carrito">Precio Total de todos los productos: ${totalPrice.toFixed(2)}€</h3>
                <button id="buy-button">Comprar</button>
            </section>
        `;

        document.querySelector("#buy-button").addEventListener("click", () => {
            Swal.fire({
                title: '¡Compra realizada!',
                text: 'Gracias por tu compra en Murmullo Records',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            sessionStorage.removeItem('cart');
            showCart();
        });

    } else {
        main.innerHTML = `
            <h1 class="h1Carrito">Carrito de Compras</h1>
            <img class="imgCarritoV" src="public/assets/carritoVacio.png" alt="carrito vacio">
            <h4 class="h4Carrito">Oops! Parece que aún no has añadido nada a tu carrito.</h4>
            <h4 class="h4Carrito">Continúa comprando para agregar productos a tu carrito</h4>
        `;
    }
}
