import "../pageArticulo/PA.css";
import { products } from "../../components/data/data";
import { cleanPage } from "../../utils/cleanPage";
import { ButtoN } from "../../components/button/button";
import Swal from 'sweetalert2';
import anime from 'animejs/lib/anime.es.js';


export const showProductDetails = () => {
    const main = document.querySelector("main");
    cleanPage(main);

    const productName = decodeURIComponent(
        new URLSearchParams(window.location.hash.split("&").slice(1).join("&")).get("id")
    );
    const product = products.find((p) => p.nombre === productName);

    if (!product) {
        main.innerHTML = '<h1>Producto no encontrado</h1>';
        return;
    }

    main.innerHTML = `
        <h1 class="tituloPA">${product.nombre}</h1>
        <section class = "sectionPA">
            <img class="imgPA" src="${product.imagen}" alt="${product.nombre}" id="productImage"/>
            <h2 class="h2PA">${product.artista}</h2>
            <p class="descripcionPA">${product.descipcion}</p>
            <p class="selloPA">Sello: ${product.sello}</p>
            <p class="formatoPA">Formato: ${product.formato}</p>
            <p class="precioPA">Precio: ${product.precio}€</p>
            <div class="contador">
                <button id="decrement-btn">-</button>
                <span id="vinyl-count">1</span>
                <button id="increment-btn">+</button>
            </div>
            ${ButtoN("", "", "Comprar", "add-to-cart")}
            <iframe class="spotyPA" src="${product.spotify}" width="500" height="150" frameborder="0" allow="encrypted-media"></iframe>
        </section>
    `;

    let count = 1;

    function updateCount(value) {
        count += value;
        if (count < 1) count = 1;
        document.querySelector("#vinyl-count").innerText = count;
    }

    document.querySelector("#increment-btn").addEventListener("click", () => updateCount(1));
    document.querySelector("#decrement-btn").addEventListener("click", () => updateCount(-1));

    document.querySelector("#add-to-cart").addEventListener("click", (event) => {
        event.preventDefault();
        const cartItem = {
            nombre: product.nombre,
            artista: product.artista,
            cantidad: count,
            totalPrice: product.precio * count,
            imagen: product.imagen,
        };

        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        cart.push(cartItem);
        sessionStorage.setItem('cart', JSON.stringify(cart));

        Swal.fire({
            title: '¡Producto añadido al carrito!',
            html: `
                <strong>${cartItem.nombre}</strong> ha sido añadido al carrito.<br>
                Cantidad: ${cartItem.cantidad}<br>
                Precio total: ${cartItem.totalPrice.toFixed(2)}€
            `,
            icon: 'success',
            confirmButtonText: 'Continuar comprando',
        });
    });

    const productImage = document.querySelector("#productImage");

    productImage.addEventListener('mouseenter', () => {
        anime({
            targets: productImage,
            scale: 1.05,
            duration: 500,
            easing: 'easeInOutQuad',
            complete: () => {
                productImage.src = product.imagenTras;
            }
        });
    });

    productImage.addEventListener('mouseleave', () => {
        anime({
            targets: productImage,
            scale: 1,
            duration: 500,
            easing: 'easeInOutQuad',
            complete: () => {
                productImage.src = product.imagen;
            }
        });
    });
};
