import "../home/home.css";
import { cleanPage } from "../../utils/cleanPage";
import { showProductDetails } from "../pageArticulo/PA";
import { products } from "../../components/data/data";
import { targetasGrupo } from "../../components/artistCard/artistCard";
import anime from 'animejs/lib/anime.es.js';

export const home = () => {
  const main = document.querySelector("main");
  cleanPage(main);
  main.innerHTML = `
  <h1>MURMULO RECORDS</h1>
        <section id="vinilo">
            <h2>Vinilo</h2>
            <div class="gallery" id="vinilo-gallery"></div>
        </section>
        <section id="cassette">
            <h2>Indie</h2>
            <div class="gallery" id="cassette-gallery"></div>
        </section>
  `;

  function displayProducts() {
    products.forEach(product => {
      const gallery = document.getElementById(`${product.formato}-gallery`);
      const productCard = targetasGrupo(product);

      productCard.addEventListener('mouseenter', () => {
        anime({
          targets: productCard.querySelector('img'),
          duration: 500,
          easing: 'easeInOutQuad',
          complete: () => {
            productCard.querySelector('img').src = product.imagenTras;
          }
        });
      });

      productCard.addEventListener('mouseleave', () => {
        anime({
          targets: productCard.querySelector('img'),
          duration: 500,
          easing: 'easeInOutQuad',
          complete: () => {
            productCard.querySelector('img').src = product.imagen;
          }
        });
      });

      productCard.addEventListener('click', () => {
        window.location.hash = `#productDetails&id=${encodeURIComponent(product.nombre)}`;
        showProductDetails();
      });

      gallery.appendChild(productCard);
    });
  }

  displayProducts();
};
