// ===============================================
// Archivo: js/app.js (FINAL con Modales Y Slider)
// ===============================================

/**
 * Función global para mostrar el modal de notificación.
 * Reemplaza a alert().
 */
const showModal = (message, type = 'success') => {
    const modalElement = document.getElementById('globalModal');
    if (!modalElement || typeof bootstrap === 'undefined') {
        alert(message); 
        return;
    }

    const titles = {
        'success': 'Éxito',
        'error': 'Error',
        'warning': 'Advertencia'
    };
    const titleText = titles[type] || 'Notificación';
    
    const bootstrapModal = new bootstrap.Modal(modalElement);
    
    const titleElement = document.getElementById('globalModalLabel');
    const bodyElement = modalElement.querySelector('.modal-body');
    const headerElement = modalElement.querySelector('.modal-header');
    
    let iconClass = 'fa-check-circle';
    let headerClass = 'bg-success';

    if (type === 'error') {
        iconClass = 'fa-times-circle';
        headerClass = 'bg-danger';
    } else if (type === 'warning') {
        iconClass = 'fa-exclamation-triangle';
        headerClass = 'bg-warning text-dark';
    }

    headerElement.className = `modal-header text-white ${headerClass}`;
    titleElement.innerHTML = `<i class="fas ${iconClass} me-2"></i> ${titleText}`; 

    bodyElement.innerHTML = `<p>${message}</p>`;
    bootstrapModal.show();
};


// -----------------------------------------------------
// Lógica para el Hero Slider (REINTEGRADA)
// -----------------------------------------------------

/**
 * Lógica para el Hero Slider automático en index.html
 */
const startSlider = () => {
    const slides = document.querySelectorAll('.slide');
    // Solo iniciar si estamos en la página correcta y hay slides
    if (document.getElementById('hero-slider') === null || slides.length === 0) return; 

    let currentSlide = 0;

    const changeSlide = () => {
        // 1. Eliminar la clase 'active' de la diapositiva actual
        slides[currentSlide].classList.remove('active');

        // 2. Calcular el índice de la siguiente diapositiva (loop)
        currentSlide = (currentSlide + 1) % slides.length;

        // 3. Añadir la clase 'active' a la nueva diapositiva
        slides[currentSlide].classList.add('active');
    };

    // Iniciar el temporizador para cambiar la diapositiva cada 5 segundos
    setInterval(changeSlide, 5000);
};


// -----------------------------------------------------
// Lógica de Contacto y Ejecución
// -----------------------------------------------------

/**
 * Función que maneja el envío y la validación del formulario de contacto.
 */
const handleContactForm = (e) => {
    e.preventDefault();
    const form = document.getElementById('contact-form');
    
    if (!form.checkValidity()) {
        showModal('Por favor, completa todos los campos requeridos correctamente.', 'error');
        return;
    }

    showModal('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
    form.reset(); 
};

// Conexión principal de los scripts al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar el Slider en la página de inicio
    startSlider(); 

    // Conectar el formulario de Contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});