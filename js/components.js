// ===============================================
// Archivo: js/components.js (FINAL con "Sobre Nosotros")
// ===============================================

const getLoggedInUser = () => {
    const userJSON = localStorage.getItem('usuarioLogueado');
    return userJSON ? JSON.parse(userJSON) : null;
};

const createNavbar = () => {
    const user = getLoggedInUser();
    let authLinks = '';

    if (user) {
        authLinks = `
            <span class="navbar-text me-3 text-white">
                Hola, <strong>${user.name.split(' ')[0]}!</strong>
            </span>
            <button class="btn btn-outline-light me-2" onclick="handleLogout()">Cerrar Sesión</button>
        `;
    } else {
        authLinks = `
            <a href="login.html" class="btn btn-outline-light me-2">Iniciar Sesión</a>
            <a href="register.html" class="btn btn-primary">Registrarme</a>
        `;
    }

    const navbarHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow-sm">
            <div class="container">
                <a class="navbar-brand text-white" href="index.html"><i class="fas fa-seedling me-2"></i> Vivero Alma</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="productos.html">Productos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="carrito.html">Carrito</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="contacto.html">Contacto</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="sobre-nosotros.html">Sobre Nosotros</a>
                        </li>
                    </ul>
                    <div class="d-flex">
                        ${authLinks}
                    </div>
                </div>
            </div>
        </nav>
    `;

    document.getElementById('navbar').innerHTML = navbarHTML;
};

const createFooter = () => {
    const footerHTML = `
        <footer class="bg-light text-center text-lg-start mt-auto">
            <div class="container p-4">
                <div class="row">
                    <div class="col-md-6 text-md-start mb-3 mb-md-0">
                        <h5 class="text-success mb-3"><i class="fas fa-seedling"></i> Vivero Alma</h5>
                        <p class="text-muted">Especialistas en plantas de interior y diseño de jardines urbanos.</p>
                    </div>

                    <div class="col-md-6 text-md-end">
                        <h5 class="text-success mb-3">Síguenos</h5>
                        <a href="#" class="text-dark me-3" style="font-size: 1.5rem;" title="Facebook"><i class="fab fa-facebook-square"></i></a>
                        <a href="#" class="text-dark me-3" style="font-size: 1.5rem;" title="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="text-dark" style="font-size: 1.5rem;" title="Twitter/X"><i class="fab fa-twitter-square"></i></a>
                    </div>
                </div>
                
                <hr class="mt-3 mb-3">
                <p class="text-center mb-0">© 2025 <i class="fas fa-seedling"></i> Vivero Alma | Proyecto Final del Curso de Desarrollo Web.</p>
            </div>
        </footer>
    `;
    document.getElementById('footer').innerHTML = footerHTML;
};


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('navbar')) {
        createNavbar();
    }
    if (document.getElementById('footer')) {
        createFooter();
    }
});