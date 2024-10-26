import "../singUp/singUp.css";
import { ButtoN } from "../../components/button/button";
import Swal from 'sweetalert2';

export function showSignUp() {
    const main = document.querySelector("main");
    main.innerHTML = `
        <h1 class="tituloSignUp">REGISTRO</h1>
        <div class="container">
            <form id="signUpForm" novalidate>
                <div class="form-group">
                    <label for="nombre">Nombre: </label>
                    <input type="text" id="nombre" name="nombre" placeholder="Nombre" required>
                    <span class="error" id="errorNombre"></span>
                </div>
                <div class="form-group">
                    <label for="apellidos">Apellidos: </label>
                    <input type="text" id="apellidos" name="apellidos" placeholder="Apellidos" required>
                    <span class="error" id="errorApellidos"></span>
                </div>
                <div class="form-group">
                    <label for="email">Correo Electrónico: </label>
                    <input type="email" id="email" name="email" placeholder="email@example.com" required>
                    <span class="error" id="errorEmail"></span>
                </div>
                <div class="form-group">
                    <label for="direccion">Calle y número de envío: </label>
                    <input type="text" id="direccion" name="direccion" placeholder="Calle y número" required>
                    <span class="error" id="errorDireccion"></span>
                </div>
                <div class="form-group">
                    <label for="clave">Clave: </label>
                    <input type="password" id="clave" name="clave" placeholder="Contraseña" required>
                    <span class="error" id="errorClave"></span>
                </div>
                ${ButtoN("", "button", "Registrarse", "submitBtn")}
            </form>
        </div>
    `;

    const submitButton = document.querySelector("#submitBtn");
    submitButton.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();

        const nombre = document.querySelector("#nombre").value.trim();
        const apellidos = document.querySelector("#apellidos").value.trim();
        const email = document.querySelector("#email").value.trim();
        const direccion = document.querySelector("#direccion").value.trim();
        const clave = document.querySelector("#clave").value.trim();

        let isValid = true;

        if (!nombre) {
            showError("errorNombre", "El nombre es obligatorio.");
            isValid = false;
        } else {
            hideError("errorNombre");
        }

        if (!apellidos) {
            showError("errorApellidos", "Los apellidos son obligatorios.");
            isValid = false;
        } else {
            hideError("errorApellidos");
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!email || !emailPattern.test(email)) {
            showError("errorEmail", "El correo debe tener un formato válido (ej. usuario@dominio.com).");
            isValid = false;
        } else {
            hideError("errorEmail");
        }

        if (!direccion) {
            showError("errorDireccion", "La dirección es obligatoria.");
            isValid = false;
        } else {
            hideError("errorDireccion");
        }

        const clavePattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[.,\-+_@]).{8,}$/;
        if (!clave || !clavePattern.test(clave)) {
            showError("errorClave", "La clave debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y un caracter especial (., -, +, _).");
            isValid = false;
        } else {
            hideError("errorClave");
        }

        if (isValid) {
            localStorage.setItem('userName', nombre);
            localStorage.setItem('userLastName', apellidos);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userAddress', direccion);
            localStorage.setItem('userClave', clave);

            Swal.fire({
                title: '¡Enhorabuena!',
                text: 'Te has registrado correctamente.',
                icon: 'success',
                confirmButtonText: 'Ir al inicio',
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then(() => {
                window.location.host  = 'home';
            });
        }
    });

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
} 
