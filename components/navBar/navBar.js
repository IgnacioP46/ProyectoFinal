import moment from 'moment';
import "../navBar/navBar.css";
import { ButtoN } from '../button/button';

document.body.className = localStorage.getItem("theme") || "";

export const changeTheme = () => {
  const themeBtn = document.querySelector("#themeBtn");
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("Diseño");

    if (document.body.classList.contains("Diseño")) {
      localStorage.setItem("theme", "Diseño");
    } else {
      localStorage.setItem("theme", "Accesible");
    }

    changeText();
  });
};

export const changeText = () => {
  const themeBtn = document.querySelector("#themeBtn");
  if (document.body.classList.contains("Diseño")) {
    themeBtn.innerText = "Accesible";
  } else {
    themeBtn.innerText = "Diseño";
  }
};



export const Navbar = () => {
  const clockContainer = document.createElement('div');
  clockContainer.classList.add('clock');

  const updateClock = () => {
    const currentTime = moment().format('D MMMM YYYY, h:mm:ss a');
    clockContainer.innerHTML = currentTime;
  };

  setInterval(updateClock, 1000);
  updateClock();

  return `
    <nav>
      <ul>
        <li class="dropdown">
          <a href="#" class="dropbtn">
            <div class="nav-line-1">Menu</div>
          </a>
          <div class="dropdown-content">
            <a href="#" id="homelink">Inicio</a>
            <a href="#" id="carritolink">Carrito</a>
            <a href="#" id="loginlink">Iniciar sesión</a>
            <a href="#" id="signuplink">Registrarse</a>
          </div>
        </li>
        ${ButtoN("", "", "Accesible", "themeBtn")}
      </ul>
      <div class="clock-container">${clockContainer.outerHTML}</div>
    </nav>
  `;
};
