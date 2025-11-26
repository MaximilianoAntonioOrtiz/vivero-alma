// ===============================================
// Archivo: js/cart.js
// Lógica completa del Carrito (FINAL con Descuento)
// ===============================================

const DISCOUNT_CODE = "BIENVENIDA15";
const DISCOUNT_RATE = 0.15; // 15%

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

// --- FUNCIONES DE CONTROL DE CANTIDAD ---

const updateQuantity = (productId, change) => {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        
        saveCart(cart);
        renderCartItems(); // Vuelve a dibujar el carrito
    }
};

const incrementQuantity = (productId) => {
    updateQuantity(productId, 1);
};

const decrementQuantity = (productId) => {
    updateQuantity(productId, -1);
};

// ----------------------------------------

/**
 * Añade un producto al carrito (Función llamada desde productos.html).
 */
const addToCart = (productId) => {
    // --- CONTROL DE SEGURIDAD ---
    if (!isLoggedIn()) {
        alert("Debes iniciar sesión para agregar productos al carrito.");
        window.location.href = 'login.html';
        return;
    }
    // ----------------------------

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

/**
 * Aplica el código de descuento ingresado por el usuario.
 */
const applyDiscount = () => {
    const input = document.getElementById('coupon-input');
    const code = input?.value.toUpperCase();
    const messageContainer = document.getElementById('discount-message');
    
    if (code === DISCOUNT_CODE) {
        localStorage.setItem('discount_applied', 'true');
        messageContainer.innerHTML = `<div class="text-success small fw-bold">¡Descuento del 15% aplicado!</div>`;
    } else {
        localStorage.removeItem('discount_applied');
        messageContainer.innerHTML = `<div class="text-danger small fw-bold">Código no válido.</div>`;
    }

    renderCartItems(); // Vuelve a dibujar el carrito para mostrar los totales
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
    localStorage.removeItem('discount_applied'); // Limpiamos el descuento
    window.location.href = 'index.html';
};


// ------------------------------------------------------------------
// Lógica de Renderizado y Conexión de Botones
// ------------------------------------------------------------------

const renderCartItems = () => {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    const cart = getCart();
    const discountApplied = localStorage.getItem('discount_applied') === 'true';

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
    let subtotalGeneral = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        subtotalGeneral += subtotal;

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

    let discountAmount = 0;
    let finalTotal = subtotalGeneral;
    let discountHTML = '';

    if (discountApplied) {
        discountAmount = subtotalGeneral * DISCOUNT_RATE;
        finalTotal = subtotalGeneral - discountAmount;
        discountHTML = `
            <div class="d-flex justify-content-between text-danger small">
                <span>Descuento (${DISCOUNT_RATE * 100}%):</span>
                <span>-$${discountAmount.toFixed(2)}</span>
            </div>
        `;
    }

    // Estructura final con totales y área de descuento
    cartContainer.innerHTML = `
        <div class="row">
            <div class="col-lg-8">
                <ul class="list-group mb-3 shadow-sm">${itemsHTML}</ul>
            </div>
            <div class="col-lg-4">
                <div class="card shadow-sm mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Cupón de Descuento</h5>
                        <div class="input-group mb-2">
                            <input type="text" id="coupon-input" class="form-control" placeholder="BIENVENIDA15" value="${discountApplied ? DISCOUNT_CODE : ''}">
                            <button class="btn btn-secondary" type="button" onclick="applyDiscount()">Aplicar</button>
                        </div>
                        <div id="discount-message">${discountApplied ? `<div class="text-success small fw-bold">¡Descuento del 15% aplicado!</div>` : ''}</div>
                    </div>
                </div>

                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Resumen de Compra</h5>
                        <hr>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span>$${subtotalGeneral.toFixed(2)}</span>
                        </div>
                        ${discountHTML}
                        <hr>
                        <div class="d-flex justify-content-between fw-bold text-success mb-3">
                            <h4>Total:</h4>
                            <h4>$${finalTotal.toFixed(2)}</h4>
                        </div>
                        <button class="btn btn-success w-100 btn-lg" onclick="finishPurchase()">Finalizar Compra</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupRemoveListeners();
};


const setupRemoveListeners = () => {
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            if (!isNaN(productId)) {
                removeItemFromCart(productId);
            }
        });
    });
};

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


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-container')) {
        renderCartItems();
    }
});