import './style.css';
import { changeText, Navbar } from './components/navBar/navBar';
import { footer } from './components/footer/footer';
import { home } from './pages/home/home';
import { showUserProfile } from './pages/Usuarios/usuarios';
import { showCart } from './pages/carrito/carrito';
import { showProductDetails } from './pages/pageArticulo/PA';
import { showLogin } from './pages/login/login';
import { showSignUp } from './pages/singUp/singUp';
import { linkPage } from './utils/linkPage';
import { changeTheme } from './components/navBar/navBar';

export const API_URL ="http://localhost:3000";


document.querySelector('header').innerHTML = Navbar();
document.querySelector('footer').innerHTML = footer();

linkPage('#homelink', home);
linkPage('#usuariolink', showUserProfile);
linkPage('#carritolink', showCart);
linkPage('#loginlink', showLogin);
linkPage('#signuplink', showSignUp);


home();

changeTheme();
changeText();