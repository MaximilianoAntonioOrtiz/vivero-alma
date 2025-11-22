// ===============================================
// Archivo: js/app.js
// Lógica y Validaciones Generales (Ej: Contacto)
// ===============================================

/**
 * Función que maneja el envío y la validación del formulario de contacto.
 */
const handleContactForm = (e) => {
    e.preventDefault();
    
    // Obtener elementos del formulario
    const form = document.getElementById('contact-form');
    
    // Simple validación de Bootstrap (chequea el 'required' del HTML)
    // NOTA: Para proyectos más avanzados, usarías JS para validación campo por campo.
    if (!form.checkValidity()) {
        // Si el formulario no es válido (campos requeridos vacíos), muestra un mensaje
        alert('Por favor, completa todos los campos requeridos correctamente.');
        return;
    }

    // Si todo es válido:
    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
    form.reset(); // Limpia el formulario
    
    // NOTA: Aquí terminaría el proceso, ya que no estamos usando un backend.
};

// Conectar el listener al formulario de Contacto
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});