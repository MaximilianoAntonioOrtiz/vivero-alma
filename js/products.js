// ===============================================
// Archivo: js/products.js
// Catálogo de Productos y Lógica de Carga (Etapa 5)
// ===============================================

// La variable 'products' es 'var' para ser accesible globalmente por cart.js
var products = [
    { id: 1, name: "Monstera Deliciosa", category: "Plantas de Interior", price: 25.50, description: "Una planta tropical muy popular, conocida por sus grandes hojas perforadas. Necesita luz indirecta y riego moderado.", image: "monstera.jpg" },
    { id: 2, name: "Cactus San Pedro", category: "Cactus y Suculentas", price: 15.00, description: "Fácil de cuidar, requiere poca agua y mucha luz solar. Ideal para principiantes.", image: "cactus.jpg" },
    { id: 3, name: "Set de 3 Macetas de Cerámica", category: "Macetas", price: 35.99, description: "Macetas de cerámica esmaltada, perfectas para plantas de tamaño medio. Incluye platos de drenaje.", image: "macetas.jpg" },
    { id: 4, name: "Tierra de Diatomeas Orgánica", category: "Herramientas", price: 9.99, description: "Fertilizante y pesticida natural. 100% orgánico y seguro para mascotas y niños.", image: "diatomeas.jpg" },
    { id: 5, name: "Ficus Lyrata (Fiddle Leaf Fig)", category: "Plantas de Interior", price: 45.00, description: "Planta de interior elegante con grandes hojas en forma de violín. Prefiere ambientes estables.", image: "ficus.jpg" }
];

// Función para conectar los listeners del carrito (definida en cart.js)
const initCartListeners = () => {
    if (typeof setupAddToCartListeners === 'function') {
        setupAddToCartListeners();
    }
};

const renderProducts = () => {
    const productListContainer = document.getElementById('product-list');
    if (!productListContainer) return;
    let htmlContent = '';

    products.forEach(product => {
        htmlContent += `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm border-0">
                    <img src="./img/${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-success">${product.name}</h5>
                        <p class="card-text text-muted">${product.category}</p>
                        <h4 class="mt-auto mb-3">$${product.price.toFixed(2)}</h4>
                        <a href="detalle.html?id=${product.id}" class="btn btn-outline-success btn-sm mb-2">Ver Detalle</a>
                        <button class="btn btn-success btn-sm add-to-cart" data-product-id="${product.id}">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    productListContainer.innerHTML = htmlContent;
};

const renderProductDetail = () => {
    const detailContainer = document.getElementById('product-detail');
    if (!detailContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (!product) { detailContainer.innerHTML = '<div class="alert alert-danger">Producto no encontrado.</div>'; return; }

    const detailHTML = `
        <div class="row align-items-center">
            <div class="col-md-6 mb-4">
                <img src="./img/${product.image}" class="img-fluid rounded shadow-sm" alt="${product.name}">
            </div>
            <div class="col-md-6">
                <h6 class="text-success">${product.category}</h6>
                <h1 class="display-4 mb-3">${product.name}</h1>
                <p class="lead">${product.description}</p>
                <hr>
                <h2 class="text-primary display-5 mb-4">$${product.price.toFixed(2)}</h2>
                
                <div class="d-grid gap-2">
                    <button class="btn btn-lg btn-success add-to-cart" data-product-id="${product.id}">
                        Añadir al Carrito
                    </button>
                    <a href="productos.html" class="btn btn-outline-secondary">Volver al Catálogo</a>
                </div>
            </div>
        </div>
    `;
    detailContainer.innerHTML = detailHTML;
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-list')) {
        renderProducts();
        initCartListeners();
    }
    if (document.getElementById('product-detail')) {
        renderProductDetail();
        initCartListeners();
    }
});