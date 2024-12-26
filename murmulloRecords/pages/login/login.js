import "../login/login.css";
import { ButtoN } from "../../components/button/button";
import { API_URL } from "../../main";
import Swal from 'sweetalert2';

export function showLogin() {
    const main = document.querySelector("main");
    main.innerHTML = `
        <h1 class="tituloLogin">ENTRAR</h1>
        <div class="container">
            <form id="loginForm" novalidate>
                <div class="form-group">
                    <label for="email">Correo Electrónico: </label>
                    <input type="email" id="email" name="email" placeholder="email@example.com" required>
                    <span class="error" id="errorEmail"></span>
                </div>
                <div class="form-group">
                    <label for="clave">Clave: </label>
                    <input type="password" id="clave" name="clave" placeholder="Contraseña" required>
                    <span class="error" id="errorClave"></span>
                </div>
                ${ButtoN("", "button", "Iniciar sesión", "submitBtn")}
            </form>
        </div>
    `;

    const submitButton = document.querySelector("#submitBtn");
    submitButton.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();

        const email = document.querySelector("#email").value.trim();
        const clave = document.querySelector("#clave").value.trim();
        const nombre = document.querySelector("#nombre").value.trim();



        let isValid = true;

        fetch(API_URL)
            .then((res) => res.json())
            .then((users) => {

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                if (!email || !emailPattern.test(email)) {
                    showError("errorEmail", "El correo debe tener un formato válido (ej. usuario@dominio.com).");
                    isValid = false;
                } else {
                    hideError("errorEmail");
                }

                if (!clave || clave.length < 8) {
                    showError("errorClave", "La clave debe tener al menos 8 caracteres.");
                    isValid = false;
                } else {
                    hideError("errorClave");
                }

                if (isValid) {
                    const user = users.find(
                        (user) => user.email === email && user.password === clave);

                    if (!user) {
                        Swal.fire({
                            title: 'Error',
                            text: 'El correo o la clave son incorrectos. Inténtalo de nuevo.',
                            icon: 'error',
                            confirmButtonText: 'Reintentar',
                        });
                        return;

                    } else {
                        Swal.fire({
                            title: '{¡Bienvenido, + ${user.username}!',
                            text: 'Has iniciado sesión correctamente.',
                            icon: 'success',
                            confirmButtonText: 'Ir al inicio',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        }).then(() => {
                            window.location = 'home';
                        });
                    };

                    localStorage.setItem("user", JSON.stringify(user));
                    checkUser(user)
                }
            })
            
            });

};

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

