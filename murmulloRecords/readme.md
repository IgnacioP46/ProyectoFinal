# Murmullo Records 🎶

**Murmullo Records** es una tienda web de música especializada en la venta de vinilos y cassettes. El proyecto está diseñado para ofrecer una experiencia de usuario fluida y moderna, donde los clientes pueden explorar una amplia colección de discos, ver detalles de cada producto, agregar artículos al carrito y realizar compras de manera sencilla.

## 📖 Descripción del Proyecto

Murmullo Records es una aplicación web donde los usuarios pueden:
- Navegar por una amplia selección de vinilos y cassettes.
- Ver detalles de cada producto, incluyendo descripción, precio, y vista previa de la carátula.
- Añadir productos al carrito y gestionar las cantidades.
- Realizar un proceso de registro e inicio de sesión.
- Cambiar el tema de la página entre "Diseño" y "Accesible" para mejorar la experiencia visual.

## 🚀 Funcionalidades

- **Explorar Productos**: Los usuarios pueden navegar por las categorías de vinilos y cassettes.
- **Detalles de Productos**: Cada producto tiene una página de detalles con información completa.
- **Carrito de Compras**: Se pueden agregar productos al carrito, ajustar cantidades y ver el precio total.
- **Registro e Inicio de Sesión**: Los usuarios pueden registrarse e iniciar sesión para guardar su información de compra.
- **Cambiar Tema**: Un botón permite cambiar entre dos modos de visualización, ajustando el diseño de la web para mayor accesibilidad.

## 🛠️ Tecnologías Utilizadas

- **Framework de Construcción**: [Vite](https://vitejs.dev/)
- **Lenguajes**: JavaScript, HTML5, CSS3
- **Librerías**:
  - `anime.js` para animaciones suaves de imágenes.
  - `SweetAlert2` para mostrar mensajes y alertas.
  - `moment.js` para mostrar y formatear la fecha y la hora en tiempo real.
- **Herramientas**:
  - `Node.js` para la gestión del entorno de desarrollo.
  - `Nodemailer` para el manejo de correos en procesos de contacto y soporte.

## 📦 Estructura del Proyecto
murmullo-records/public/ # Archivos estáticos y activo 
componentes/ # Componentes reutilizables como botones y navbar
pages/ # Páginas principales como Home, Carrito, Iniciar sesión, etc.
utils/ # Utilidades como funciones de limpieza y navegación
data/ # Datos estáticos, como la lista de productos
main.js # Punto de entrada principal de la aplicación
style.css # Estilos generales de la aplicación
index.html # Archivo HTML principal
README.md # Documentación del proyecto
package.json # Dependencias y scripts del proyecto
vite.config.js