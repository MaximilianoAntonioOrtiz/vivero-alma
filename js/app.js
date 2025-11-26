// ===============================================
// Archivo: js/app.js (Control del Modal y Lógica General)
// FINAL CON TÍTULOS EN ESPAÑOL
// ===============================================

/**
 * Función global para mostrar el modal de notificación.
 * @param {string} message - El mensaje a mostrar.
 * @param {string} type - Tipo de notificación ('success', 'error', 'warning').
 */
const showModal = (message, type = 'success') => {
    const modalElement = document.getElementById('globalModal');
    if (!modalElement || typeof bootstrap === 'undefined') {
        // Fallback si Bootstrap no carga
        alert(message); 
        return;
    }

    // --- Mapeo de Títulos a Español (NUEVA LÓGICA) ---
    const titles = {
        'success': 'Éxito',
        'error': 'Error',
        'warning': 'Advertencia'
    };
    const titleText = titles[type] || 'Notificación';
    
    // Inicializar el objeto Modal de Bootstrap
    const bootstrapModal = new bootstrap.Modal(modalElement);
    
    const titleElement = document.getElementById('globalModalLabel');
    const bodyElement = modalElement.querySelector('.modal-body');
    const headerElement = modalElement.querySelector('.modal-header');
    
    // --- Configurar Título, Icono y Color ---
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
    // Usamos el texto mapeado en español: titleText
    titleElement.innerHTML = `<i class="fas ${iconClass} me-2"></i> ${titleText}`; 

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