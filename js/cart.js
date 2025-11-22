// ===============================================
// Archivo: js/cart.js
// Lógica completa del Carrito (FINAL CON +/-)
// ===============================================

const getCart = () => {
    const cartJSON = localStorage.getItem('vivero_cart');
    return cartJSON ? JSON.parse(cartJSON) : [];
};

const saveCart = (cart) => {
    localStorage.setItem('vivero_cart', JSON.stringify(cart));
};

const isLoggedIn = () => {
    return localStorage.getItem('usuarioLogueado') !== null;
};

// --- NUEVAS FUNCIONES DE CONTROL DE CANTIDAD ---

/**
 * Actualiza la cantidad de un producto específico en el carrito.
 */
const updateQuantity = (productId, change) => {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        item.quantity += change;

        // Si la cantidad llega a 0 o menos, eliminamos el ítem
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        
        saveCart(cart);
        renderCartItems(); // Vuelve a dibujar el carrito con la cantidad actualizada
    }
};

/** Llama a updateQuantity para incrementar. */
const incrementQuantity = (productId) => {
    updateQuantity(productId, 1);
};

/** Llama a updateQuantity para decrementar. */
const decrementQuantity = (productId) => {
    updateQuantity(productId, -1);
};


// ------------------------------------------------------------------
// Lógica Existente (addToCart, removeItem, finishPurchase)
// ------------------------------------------------------------------

const addToCart = (productId) => {
    if (!isLoggedIn()) {
        alert("Debes iniciar sesión para agregar productos al carrito.");
        window.location.href = 'login.html';
        return;
    }

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

const removeItemFromCart = (productId) => {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    renderCartItems();
};

const finishPurchase = () => {
    if (!isLoggedIn()) {
        alert("Debes iniciar sesión para finalizar la compra.");
        window.location.href = 'login.html';
        return;
    }
    
    if (getCart().length === 0) {
        alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }

    alert("¡Compra realizada con éxito! Recibirás la confirmación por correo.");
    localStorage.removeItem('vivero_cart');
    window.location.href = 'index.html';
};


// ------------------------------------------------------------------
// Lógica de Renderizado (Actualizada con botones +/-)
// ------------------------------------------------------------------

const renderCartItems = () => {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    const cart = getCart();

    // Mensaje de seguridad o carrito vacío
    if (!isLoggedIn() && cart.length > 0) {
        cartContainer.innerHTML = `<div class="alert alert-warning text-center">Por seguridad, debes <a href="login.html">iniciar sesión</a> para ver y gestionar tu carrito.</div>`;
        return;
    }
    if (cart.length === 0) {
        cartContainer.innerHTML = `<div class="alert alert-info text-center">Tu carrito está vacío. ¡Explora nuestras <a href="productos.html">plantas</a>!</div>`;
        return;
    }

    let itemsHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        itemsHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center flex-grow-1">
                    <img src="./img/${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 15px;">
                    <div>
                        <h6 class="mb-0">${item.name}</h6>
                        <small class="text-muted d-block">$${item.price.toFixed(2)} c/u</small>
                    </div>
                </div>
                
                <div class="d-flex align-items-center me-3">
                    <button class="btn btn-sm btn-outline-secondary me-1" onclick="decrementQuantity(${item.id})">-</button>
                    <span class="me-1">${item.quantity}</span> 
                    <button class="btn btn-sm btn-outline-secondary" onclick="incrementQuantity(${item.id})">+</button>
                </div>

                <div class="d-flex align-items-center">
                    <span class="fw-bold ms-3">$${subtotal.toFixed(2)}</span>
                    <button class="btn btn-sm btn-danger ms-3" onclick="removeItemFromCart(${item.id})">
                        Eliminar
                    </button>
                </div>
            </li>
        `;
    });

    // Estructura final con totales (se mantiene igual)
    cartContainer.innerHTML = `
        <div class="row">
            <div class="col-lg-8">
                <ul class="list-group mb-3 shadow-sm">${itemsHTML}</ul>
            </div>
            <div class="col-lg-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Resumen de Compra</h5>
                        <hr>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span>$${total.toFixed(2)}</span>
                        </div>
                        <div class="d-flex justify-content-between fw-bold text-success mb-3">
                            <h4>Total:</h4>
                            <h4>$${total.toFixed(2)}</h4>
                        </div>
                        <button class="btn btn-success w-100 btn-lg" onclick="finishPurchase()">Finalizar Compra</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Aquí no necesitamos setupRemoveListeners porque usamos onclick en el HTML.
};

// ... (Resto de funciones: setupAddToCartListeners y DOMContentLoaded)
const setupAddToCartListeners = () => {
    // ... (Mantener la función setupAddToCartListeners como está)
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


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-container')) {
        renderCartItems();
    }
});