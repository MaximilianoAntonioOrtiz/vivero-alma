// ===============================================
// Archivo: js/auth.js
// Lógica de Autenticación (Login, Register, Logout)
// ===============================================

const getUsers = () => {
    const usersJSON = localStorage.getItem('vivero_users');
    return usersJSON ? JSON.parse(usersJSON) : [];
};

const handleRegister = (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');
    const passwordInput = document.getElementById('regPassword');
    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!name || !email || !password) {
        alert('Error: Todos los campos son obligatorios.'); return;
    }
    if (password.length < 6) {
        alert('Error: La contraseña debe tener al menos 6 caracteres.'); return;
    }
    const users = getUsers();
    if (users.some(user => user.email === email)) {
        alert('Error: Ya existe una cuenta registrada con este correo.'); return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('vivero_users', JSON.stringify(users));
    window.location.href = 'login.html';
};

const handleLogin = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert('Error: Por favor, ingrese email y contraseña.'); return;
    }
    const users = getUsers();
    const userFound = users.find(user => user.email === email);

    if (!userFound) {
        alert('Error: El correo electrónico no está registrado.'); return;
    }
    if (userFound.password !== password) {
        alert('Error: Contraseña incorrecta.'); return;
    }

    const userSession = { email: userFound.email, name: userFound.name };
    localStorage.setItem('usuarioLogueado', JSON.stringify(userSession));
    window.location.href = 'index.html';
};

/** Cierra la sesión del usuario. ES GLOBAL para el onclick. */
const handleLogout = () => {
    localStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
};


document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});