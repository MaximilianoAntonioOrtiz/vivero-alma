// ===============================================
// Archivo: js/auth.js (FINAL con Modales)
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
        showModal('Error: Todos los campos son obligatorios.', 'error'); 
        return;
    }
    if (password.length < 6) {
        showModal('Error: La contraseña debe tener al menos 6 caracteres.', 'error'); 
        return;
    }
    const users = getUsers();
    if (users.some(user => user.email === email)) {
        showModal('Error: Ya existe una cuenta registrada con este correo.', 'error'); 
        return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('vivero_users', JSON.stringify(users));
    
    showModal('¡Registro exitoso! Ya puedes iniciar sesión.', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500); 
};

const handleLogin = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        showModal('Error: Por favor, ingrese email y contraseña.', 'error'); 
        return;
    }
    const users = getUsers();
    const userFound = users.find(user => user.email === email);

    if (!userFound) {
        showModal('Error: El correo electrónico no está registrado.', 'error'); 
        return;
    }
    if (userFound.password !== password) {
        showModal('Error: Contraseña incorrecta.', 'error'); 
        return;
    }

    const userSession = { email: userFound.email, name: userFound.name };
    localStorage.setItem('usuarioLogueado', JSON.stringify(userSession));
    
    showModal(`¡Bienvenido, ${userFound.name}! Sesión iniciada.`, 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500); 
};

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