// ===============================================
// Archivo: js/products.js (FINAL CON BÚSQUEDA Y ORDENAMIENTO)
// ===============================================

// Catálogo de 20 productos (Mantener var para compatibilidad con cart.js)
var products = [
    { id: 1, name: "Monstera Deliciosa", category: "Plantas de Interior", price: 25.50, description: "Una planta tropical muy popular, conocida por sus grandes hojas perforadas.", image: "monstera.jpg" },
    { id: 2, name: "Cactus San Pedro", category: "Cactus y Suculentas", price: 15.00, description: "Fácil de cuidar, requiere poca agua y mucha luz solar.", image: "cactus.jpg" },
    { id: 3, name: "Set de 3 Macetas de Cerámica", category: "Macetas", price: 35.99, description: "Macetas de cerámica esmaltada, perfectas para plantas de tamaño medio.", image: "macetas.jpg" },
    { id: 4, name: "Tierra de Diatomeas Orgánica", category: "Herramientas", price: 9.99, description: "Fertilizante y pesticida natural. 100% orgánico y seguro para mascotas.", image: "diatomeas.jpg" },
    { id: 5, name: "Ficus Lyrata (Fiddle Leaf Fig)", category: "Plantas de Interior", price: 45.00, description: "Planta de interior elegante con grandes hojas en forma de violín.", image: "ficus.jpg" },
    { id: 6, name: "Suculenta Echeveria", category: "Cactus y Suculentas", price: 8.50, description: "Variedad popular de suculenta de bajo mantenimiento.", image: "echeveria.jpg" },
    { id: 7, name: "Palmera de Salón", category: "Plantas de Interior", price: 32.90, description: "Ideal para esquinas oscuras. Purifica el aire.", image: "palmera.jpg" },
    { id: 8, name: "Rosas Miniatura", category: "Plantas de Exterior", price: 19.99, description: "Variedad de rosal compacto ideal para balcones.", image: "rosas.jpg" },
    { id: 9, name: "Orquídea Phalaenopsis", category: "Plantas de Interior", price: 55.00, description: "Elegante orquídea de floración prolongada. Requiere cuidados especiales.", image: "orquidea.jpg" },
    { id: 10, name: "Bonsái Ficus Retusa", category: "Bonsái", price: 79.00, description: "Bonsái de fácil manejo, perfecto para principiantes.", image: "bonsai.jpg" },
    { id: 11, name: "Kit de Herramientas de Jardinería", category: "Herramientas", price: 29.99, description: "Incluye pala, rastrillo y trasplantador de acero inoxidable.", image: "kit_herramientas.jpg" },
    { id: 12, name: "Maceta Colgante de Yute", category: "Macetas", price: 12.50, description: "Maceta de estilo rústico para colgar plantas de hoja caduca.", image: "maceta_yute.jpg" },
    { id: 13, name: "Lavanda (Lavandula)", category: "Plantas de Exterior", price: 14.00, description: "Planta aromática que atrae a los polinizadores y repele insectos.", image: "lavanda.jpg" },
    { id: 14, name: "Alocasia Polly", category: "Plantas de Interior", price: 28.99, description: "Conocida como 'Oreja de elefante'. Hojas oscuras y brillantes.", image: "alocasia.jpg" },
    { id: 15, name: "Calathea Orbifolia", category: "Plantas de Interior", price: 38.00, description: "Hojas grandes y redondas. Necesita alta humedad.", image: "calathea.jpg" },
    { id: 16, name: "Fertilizante Líquido Universal", category: "Herramientas", price: 11.50, description: "Ideal para uso semanal en todo tipo de plantas de interior y exterior.", image: "fertilizante.jpg" },
    { id: 17, name: "Tiestos de Barro (Pack 4)", category: "Macetas", price: 22.00, description: "Tiestos tradicionales de barro cocido con excelente drenaje.", image: "tiestos.jpg" },
    { id: 18, name: "Suculenta Collar de Perlas", category: "Cactus y Suculentas", price: 16.50, description: "Planta colgante perfecta para estanterías altas.", image: "collar_perlas.jpg" },
    { id: 19, name: "Helecho Boston", category: "Plantas de Interior", price: 21.00, description: "Clásico helecho que prospera en ambientes húmedos y con poca luz.", image: "helecho.jpg" },
    { id: 20, name: "Tulipanes (Bulbos Pack 10)", category: "Bulbos", price: 18.00, description: "Bulbos de tulipán listos para plantar en otoño.", image: "tulipanes.jpg" }
];

// Función para conectar los listeners del carrito (definida en cart.js)
const initCartListeners = () => {
    if (typeof setupAddToCartListeners === 'function') {
        setupAddToCartListeners();
    }
};

/**
 * Lógica principal de filtrado y ordenamiento que combina la búsqueda, los checkboxes y la ordenación.
 */
const combineFiltersAndSort = () => {
    // 1. OBTENER VALORES
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const sortValue = document.getElementById('sort-select')?.value || 'default';
    
    // 2. OBTENER CATEGORÍAS SELECCIONADAS (Lógica de filtrado)
    const checkboxes = document.querySelectorAll('#category-filters-container .category-checkbox');
    const selectedCategories = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
        }
    });

    const showAllCategories = document.getElementById('filter-all')?.checked || (selectedCategories.length === 0 && !searchTerm);

    // 3. APLICAR FILTRO
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                              product.category.toLowerCase().includes(searchTerm) || 
                              product.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = showAllCategories || selectedCategories.includes(product.category);

        return matchesSearch && matchesCategory;
    });
    
    // 4. APLICAR ORDENAMIENTO (SORT)
    if (sortValue !== 'default') {
        filteredProducts.sort((a, b) => {
            if (sortValue === 'price-asc') {
                return a.price - b.price; // Menor a Mayor
            } else if (sortValue === 'price-desc') {
                return b.price - a.price; // Mayor a Menor
            } else if (sortValue === 'name-asc') {
                return a.name.localeCompare(b.name); // A-Z
            } else if (sortValue === 'name-desc') {
                return b.name.localeCompare(a.name); // Z-A
            }
            return 0; // Si no hay match, no cambia el orden
        });
    }

    renderProducts(filteredProducts);
};


/**
 * Función que maneja el evento 'keyup' o 'change' de la búsqueda.
 */
const handleSearch = () => {
    combineFiltersAndSort();
};


/**
 * Función que maneja el evento 'change' del select de ordenamiento.
 */
const handleSort = () => {
    combineFiltersAndSort();
};


/**
 * Función que maneja el evento 'change' de los checkboxes.
 */
const handleCategoryFilter = () => {
    combineFiltersAndSort();
};


/**
 * Función para generar las cards de productos y mostrarlas en productos.html
 */
const renderProducts = (productArray = products) => {
    const productListContainer = document.getElementById('product-list');
    if (!productListContainer) return;
    let htmlContent = '';

    productArray.forEach(product => {
        htmlContent += `
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3"> <div class="card h-100 shadow-sm border-0">
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
    
    if (productArray.length === 0) {
        productListContainer.innerHTML = '<div class="alert alert-warning">No se encontraron productos que coincidan con la selección.</div>';
    } else {
        productListContainer.innerHTML = htmlContent;
    }
    initCartListeners(); // Re-conectar listeners después de dibujar
};

/**
 * Dibuja la lista de filtros de categorías con checkboxes y conecta eventos.
 */
const renderFilterSidebar = () => {
    const filterContainer = document.getElementById('category-filters-container');
    if (!filterContainer) return;

    const categories = [...new Set(products.map(product => product.category))].sort();
    let filtersHTML = '';
    
    categories.forEach(category => {
        const cleanId = category.replace(/\s/g, '-').replace(/&/g, ''); 
        filtersHTML += `
            <div class="form-check mb-2">
                <input class="form-check-input category-checkbox" type="checkbox" id="filter-${cleanId}" value="${category}">
                <label class="form-check-label" for="filter-${cleanId}">
                    ${category}
                </label>
            </div>
        `;
    });
    
    filterContainer.innerHTML = filtersHTML;

    // Conectar Event Listeners a los Checkboxes
    document.querySelectorAll('#filter-form .category-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', handleCategoryFilter);
    });

    // Conectar el botón 'Todos'
    document.getElementById('filter-all')?.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.querySelectorAll('#category-filters-container .category-checkbox').forEach(cb => {
                cb.checked = false;
            });
        }
        handleCategoryFilter();
    });

    // Conectar el botón 'Limpiar Selecciones'
    document.querySelector('#filter-form button[type="reset"]')?.addEventListener('click', () => {
        // Usar setTimeout para que el reset del form tenga tiempo de ejecutarse
        setTimeout(() => {
            document.getElementById('filter-all').checked = true;
            handleCategoryFilter();
        }, 50);
    });

    // Conectar el input de búsqueda
    document.getElementById('search-input')?.addEventListener('keyup', handleSearch);

    // Conectar el select de ordenamiento (NUEVO)
    document.getElementById('sort-select')?.addEventListener('change', handleSort);

    // Aplicar el filtro inicial (muestra todo por defecto)
    combineFiltersAndSort(); 
};


// ... (renderProductDetail se mantiene igual, código omitido por espacio)
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


// Bloque de ejecución principal
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-list')) {
        renderFilterSidebar(); 
    }
    if (document.getElementById('product-detail')) {
        renderProductDetail();
        initCartListeners();
    }
});