import "./carrito/carrito.css";
import { API_URL } from "../../main";
import Swal from "sweetalert2";

export function showCart() {
    const main = document.querySelector("main");
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

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
            <section class="carritoSEc">
                ${cartInfo}
                <h3 class="h3Carrito">Precio Total de todos los productos: ${totalPrice.toFixed(2)}€</h3>
                <button id="buy-button">Comprar</button>
            </section>
        `;

        document.querySelector("#buy-button").addEventListener("click", () => {
            finalizePurchase(cartItems);
        });

    } else {
        main.innerHTML = `
            <h1 class="h1Carrito">Carrito de Compras</h1>
            <img class="imgCarritoV" src="./assets/carrito vacio.png" alt="carrito vacio">
            <h4 class="h4Carrito">Oops! Parece que aún no has añadido nada a tu carrito.</h4>
            <h4 class="h4Carrito">Continúa comprando para agregar productos a tu carrito</h4>
        `;
    }
}

function savePurchaseToUser(cartItems) {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        console.log("Compra realizada sin usuario registrado.");
        return;
    }

    const totalCartPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

    fetch(`${API_URL}/users/${savedUser.id}`)
        .then(response => response.json())
        .then(user => {
            const updatedUser = {
                ...user,
                purchasedItems: mergePurchasedItems(user.purchasedItems || [], cartItems),
                totalSpent: (user.totalSpent || 0) + totalCartPrice,
            };

            fetch(`${API_URL}/users/${savedUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            })
                .then(() => {
                    Swal.fire("¡Compra guardada!", "Los datos se han actualizado en tu perfil.", "success");
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                })
                .catch(error => console.error("Error al guardar en el servidor:", error));
        })
        .catch(error => console.error("Error al recuperar usuario:", error));
}

function mergePurchasedItems(existingItems, newItems) {
    const itemMap = new Map();

    existingItems.forEach(item => itemMap.set(item.id, item));
    newItems.forEach(item => itemMap.set(item.id, item));

    return Array.from(itemMap.values());
}

function finalizePurchase(cartItems) {
    if (!cartItems || cartItems.length === 0) {
        Swal.fire("El carrito está vacío", "Agrega productos antes de comprar.", "warning");
        return;
    }

    const totalCartPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

    Swal.fire({
        title: "Compra realizada",
        text: `Has comprado:\n${cartItems.map(item => `${item.nombre} - ${item.totalPrice.toFixed(2)}€`).join("\n")}\n\nTotal: ${totalCartPrice.toFixed(2)}€`,
        icon: "success",
        confirmButtonText: "Aceptar",
    });

    savePurchaseToUser(cartItems);

    sessionStorage.removeItem("cart");
    showCart();
}
