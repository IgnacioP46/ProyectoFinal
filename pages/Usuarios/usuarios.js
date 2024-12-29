import "./usuarios.css";
import { API_URL } from "../../main";
import Swal from "sweetalert2";

export function showUserProfile() {
    const main = document.querySelector("main");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
        main.innerHTML = `<p class="pUsuario">No hay ningún usuario autenticado. Por favor, inicia sesión.</p>`;
        return;
    }

    // Renderizar el perfil del usuario
    fetch(`${API_URL}/users/${savedUser.id}`)
        .then((res) => res.json())
        .then((user) => {
            renderUserProfile(user);
        })
        .catch((error) => {
            console.error("Error al cargar el perfil del usuario:", error);
            main.innerHTML = `<p class="pUsuario">Error al cargar el perfil. Por favor, inténtalo más tarde.</p>`;
        });

    function renderUserProfile(user) {
        main.innerHTML = `
            <h1 class="tituloPerfil">Perfil del Usuario</h1>
            <div class="perfil-container">
                <div class="avatar-section">
                    <img src="${user.avatar || './assets/default-avatar.png'}" alt="Avatar" id="user-avatar" class="avatar">
                    <input type="file" id="upload-avatar" accept="image/*" />
                </div>
                <div class="info-section">
                    <label>Nombre:</label>
                    <input type="text" id="user-name" value="${user.username}" />
                    
                    <label>Apellido:</label>
                    <input type="text" id="user-lastname" value="${user.lastname}" />
                    
                    <label>Email:</label>
                    <input type="email" id="user-email" value="${user.email}" />
                    
                    <label>Dirección:</label>
                    <input type="text" id="user-address" value="${user.address}" />
                    
                    <label>Total Gastado (€):</label>
                    <input type="number" id="user-totalSpent" value="${user.totalSpent}" disabled />
                </div>
                <div class="actions-section">
                    <button id="save-profile">Guardar Cambios</button>
                    <button id="delete-profile" class="danger">Eliminar Perfil</button>
                </div>
            </div>
        `;

        // Evento para cambiar el avatar
        document.querySelector("#upload-avatar").addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const updatedUser = { ...user, avatar: reader.result };
                    updateUser(updatedUser, "Avatar actualizado correctamente.");
                };
                reader.readAsDataURL(file);
            }
        });

        // Evento para guardar cambios
        document.querySelector("#save-profile").addEventListener("click", () => {
            const updatedUser = {
                ...user,
                username: document.querySelector("#user-name").value.trim(),
                lastname: document.querySelector("#user-lastname").value.trim(),
                email: document.querySelector("#user-email").value.trim(),
                address: document.querySelector("#user-address").value.trim(),
            };

            updateUser(updatedUser, "Perfil actualizado correctamente.");
        });

        // Evento para eliminar el perfil
        document.querySelector("#delete-profile").addEventListener("click", () => {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "¡Esta acción eliminará tu perfil de forma permanente!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`${API_URL}/users/${user.id}`, {
                        method: "DELETE",
                    })
                        .then(() => {
                            Swal.fire("Eliminado", "Tu perfil ha sido eliminado.", "success").then(() => {
                                localStorage.removeItem("user");
                                window.location.reload();
                            });
                        })
                        .catch((error) => {
                            console.error("Error al eliminar el perfil:", error);
                            Swal.fire("Error", "No se pudo eliminar el perfil. Por favor, inténtalo más tarde.", "error");
                        });
                }
            });
        });
    }

    function updateUser(updatedUser, successMessage) {
        fetch(`${API_URL}/users/${updatedUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
        })
            .then(() => {
                Swal.fire("Éxito", successMessage, "success");
                localStorage.setItem("user", JSON.stringify(updatedUser));
                renderUserProfile(updatedUser); // Refrescar el perfil
            })
            .catch((error) => {
                console.error("Error al actualizar el perfil:", error);
                Swal.fire("Error", "No se pudo actualizar el perfil. Por favor, inténtalo más tarde.", "error");
            });
    }
}
