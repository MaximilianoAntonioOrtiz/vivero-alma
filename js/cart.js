// ===============================================
// Archivo: js/cart.js
// Lógica completa del Carrito (Guardar, Mostrar, Eliminar)
// ===============================================

const getCart = () => {
    const cartJSON = localStorage.getItem('vivero_cart');
    return cartJSON ? JSON.parse(cartJSON) : [];
};

const saveCart = (cart) => {
    localStorage.setItem('vivero_cart', JSON.stringify(cart));
};

const addToCart = (productId) => {
    if (typeof products === 'undefined') {
        alert("Error: El catálogo de productos no está disponible. Revisa la carga de products.js.");
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    let quantityAdded;

    if (existingItem) {
        existingItem.quantity += 1;
        quantityAdded = existingItem.quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
        quantityAdded = 1;
    }

    saveCart(cart);
    alert(`¡"${product.name}" añadido al carrito! Cantidad actual: ${quantityAdded}`);
};

/**
 * Asigna el event listener a todos los botones '.add-to-cart'.
 * Es llamado por products.js después de que se dibujan los botones.
 */
const setupAddToCartListeners = () => {
    const cartButtons = document.querySelectorAll('.add-to-cart');
    
    console.log(`[Carrito] Botones de añadir encontrados: ${cartButtons.length}`); 
    
    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            if (!isNaN(productId)) {
                addToCart(productId);
            }
        });
    });
};

// NO hay llamada a DOMContentLoaded aquí. products.js se encarga de llamar a setupAddToCartListeners.