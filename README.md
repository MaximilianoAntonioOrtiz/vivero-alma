# 🌿 Vivero Alma – E-commerce  
Proyecto realizado para el curso de Desarrollo Web (HTML, CSS, JavaScript y Bootstrap)

---

## 📌 Descripción del Proyecto  
**Vivero Alma** es un e-commerce orientado a la venta de plantas, macetas y productos relacionados con jardinería.  
El objetivo del proyecto es aplicar conocimientos de **HTML**, **CSS**, **Bootstrap**, **JavaScript** y **localStorage**, desarrollando una tienda funcional, responsive y con sistema de usuarios.

---

## 🛠 Tecnologías Utilizadas
- **HTML5**  
- **CSS3**  
- **Bootstrap 5**  
- **JavaScript (ES6)**  
- **localStorage**  
- **Diseño Responsive**

---

## 📂 Estructura del Proyecto

````📁 vivero-alma
├── 📂 css
├── 📂 js
├── 📂 img
├── 📝 index.html
├── 🛒 productos.html
├── 🌱 detalle.html
├── 🧺 carrito.html
├── ✉️ contacto.html
├── 🔐 login.html
└── 🆕 register.html


---

## 🔐 Sistema de Usuarios (Login / Registro)

El proyecto implementa un sistema de autenticación utilizando **localStorage**, que permite:

### ✔ Registro de usuarios
El usuario puede crear una cuenta proporcionando:
- Nombre  
- Email  
- Contraseña  
- Confirmación de contraseña  

**Validaciones realizadas:**
- Todos los campos obligatorios  
- Formato válido de email  
- Contraseñas iguales  
- Contraseña mínimo 6 caracteres  
- El email no puede estar previamente registrado  

Los usuarios se guardan en `localStorage`.

---

### ✔ Inicio de sesión (Login)
El sistema verifica:
- Si el email está registrado  
- Si la contraseña es correcta  

Si la autenticación es exitosa, se guarda en `localStorage` el objeto:


---

### ✔ Sesión activa
- Se muestra en la navbar: **"Hola, (nombre)"**  
- Se oculta el botón de Login  
- Aparece la opción “Cerrar sesión”  

### ✔ Cerrar sesión
El usuario puede cerrar sesión limpiando `usuarioLogueado` del almacenamiento local.

---

## 🛒 Carrito de Compras
El carrito funciona mediante localStorage y permite:

- Agregar productos desde Productos o Detalle  
- Guardar los ítems en localStorage  
- Mostrar productos agregados  
- Eliminar productos del carrito  
- Calcular el total automáticamente  
- Mantener el carrito incluso tras recargar la página  

---

## 📱 Diseño Responsive
El sitio es completamente responsive utilizando:
- Grillas de Bootstrap  
- Navbar responsive  
- Cards adaptables  
- Imágenes escalables  

---

## 🧪 Funcionalidades Principales
- Listado de productos dinámico  
- Vista de detalle de producto  
- Carrito persistente  
- Registro y login con validaciones  
- Gestión completa de sesión  
- Página de contacto funcional (sin backend)  

---

## 👤 Autor
**Maximiliano Ortiz**  
Proyecto final del curso de Desarrollo Web.

---

## 📄 Licencia
Este proyecto es de uso educativo. Las imágenes utilizadas provienen de bancos de imágenes libres (Unsplash, Pexels).

