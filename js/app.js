// ===============================================
// Archivo: js/app.js (Control del Modal y Lógica General)
// ===============================================

/**
 * Función global para mostrar el modal de notificación.
 * @param {string} message - El mensaje a mostrar.
 * @param {string} type - Tipo de notificación ('success', 'error', 'warning').
 */
const showModal = (message, type = 'success') => {
    const modalElement = document.getElementById('globalModal');
    if (!modalElement) return;

    // Inicializar el objeto Modal de Bootstrap (si no existe)
    const bootstrapModal = new bootstrap.Modal(modalElement);
    
    const titleElement = document.getElementById('globalModalLabel');
    const bodyElement = modalElement.querySelector('.modal-body');
    const headerElement = modalElement.querySelector('.modal-header');
    
    // --- Configurar Título e Icono ---
    let iconClass = 'fa-check-circle'; // Default Success
    let headerClass = 'bg-success';

    if (type === 'error') {
        iconClass = 'fa-times-circle';
        headerClass = 'bg-danger';
    } else if (type === 'warning') {
        iconClass = 'fa-exclamation-triangle';
        headerClass = 'bg-warning text-dark';
    }

    headerElement.className = `modal-header text-white ${headerClass}`;
    titleElement.innerHTML = `<i class="fas ${iconClass} me-2"></i> ${type.charAt(0).toUpperCase() + type.slice(1)}`; // Título capitalizado

    // --- Configurar Cuerpo y Mostrar ---
    bodyElement.innerHTML = `<p>${message}</p>`;
    bootstrapModal.show();
};

// Conectar el listener al formulario de Contacto (mantener la funcionalidad)
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const form = document.getElementById('contact-form');
            
            if (!form.checkValidity()) {
                showModal('Por favor, completa todos los campos requeridos correctamente.', 'error');
                return;
            }

            showModal('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
            form.reset(); 
        });
    }
});