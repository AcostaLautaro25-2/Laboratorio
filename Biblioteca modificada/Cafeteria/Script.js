
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTOS PRINCIPALES
    ========================== */

    const productCards = document.querySelectorAll(".product-card");
    const categories = document.querySelectorAll(".category");
    const navLinks = document.querySelectorAll(".navbar a");
    const sections = document.querySelectorAll("section");

    let cart = [];
    let currentCategory = "Todos";


    /* =========================
       ANIMACIÓN DE PRODUCTOS
    ========================== */

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


    productCards.forEach((card) => {
        observer.observe(card);
    });


    /* =========================
       BUSCADOR Y FILTROS
    ========================== */

    const menuSection = document.querySelector("#menu");
    const sectionTitle = menuSection.querySelector(".section-title");


    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";


    const searchInput = document.createElement("input");

    searchInput.type = "text";
    searchInput.className = "product-search";
    searchInput.placeholder = "🔎 Buscar un producto...";
    searchInput.setAttribute("aria-label", "Buscar productos");


    searchContainer.appendChild(searchInput);


    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";


    const allButton = document.createElement("button");

    allButton.textContent = "Todos";
    allButton.className = "filter-btn active";

    filterContainer.appendChild(allButton);


    categories.forEach((category) => {

        const title = category.querySelector("h3");

        if (!title) return;


        const button = document.createElement("button");

        button.textContent = title.textContent.trim();
        button.className = "filter-btn";


        button.addEventListener("click", () => {

            document
                .querySelectorAll(".filter-btn")
                .forEach((btn) => {
                    btn.classList.remove("active");
                });


            button.classList.add("active");

            currentCategory = title.textContent.trim();

            aplicarFiltros();

        });


        filterContainer.appendChild(button);

    });


    menuSection.insertBefore(
        searchContainer,
        menuSection.querySelector(".category")
    );


    menuSection.insertBefore(
        filterContainer,
        menuSection.querySelector(".category")
    );


    function aplicarFiltros() {

        const texto = searchInput.value
            .toLowerCase()
            .trim();


        categories.forEach((category) => {

            const categoryTitle = category
                .querySelector("h3")
                .textContent
                .trim();


            const categoriaCoincide =
                currentCategory === "Todos" ||
                categoryTitle === currentCategory;


            let productosVisibles = 0;


            category
                .querySelectorAll(".product-card")
                .forEach((card) => {

                    const nombre = card
                        .querySelector("h4")
                        .textContent
                        .toLowerCase();


                    const descripcion = card
                        .querySelector("p")
                        .textContent
                        .toLowerCase();


                    const textoCoincide =
                        nombre.includes(texto) ||
                        descripcion.includes(texto);


                    if (categoriaCoincide && textoCoincide) {

                        card.style.display = "";

                        productosVisibles++;

                    } else {

                        card.style.display = "none";

                    }

                });


            if (
                categoriaCoincide &&
                productosVisibles > 0
            ) {

                category.style.display = "";

            } else {

                category.style.display = "none";

            }

        });

    }


    searchInput.addEventListener(
        "input",
        aplicarFiltros
    );


    allButton.addEventListener("click", () => {

        currentCategory = "Todos";

        searchInput.value = "";


        document
            .querySelectorAll(".filter-btn")
            .forEach((btn) => {
                btn.classList.remove("active");
            });


        allButton.classList.add("active");

        aplicarFiltros();

    });


    /* =========================
       BOTÓN DEL CARRITO
    ========================== */

    const cartButton = document.createElement("button");

    cartButton.className = "cart-counter";

    cartButton.innerHTML = `
        🛒
        <span>0</span>
    `;

    cartButton.setAttribute(
        "aria-label",
        "Abrir carrito"
    );

    document.body.appendChild(cartButton);


    /* =========================
       PANEL DEL CARRITO
    ========================== */

    const cartPanel = document.createElement("aside");

    cartPanel.className = "cart-panel";


    cartPanel.innerHTML = `

        <div class="cart-header">

            <h2>🛒 Mi pedido</h2>

            <button
                class="close-cart"
                aria-label="Cerrar carrito">
                ×
            </button>

        </div>


        <div class="cart-items"></div>


        <div class="cart-footer">

            <div class="cart-total">

                <span>Total:</span>

                <strong>$0</strong>

            </div>


            <button class="clear-cart">
                Vaciar carrito
            </button>


            <button class="whatsapp-order">
                📱 Pedir por WhatsApp
            </button>

        </div>
    `;


    document.body.appendChild(cartPanel);


    /* =========================
       FONDO DEL CARRITO
    ========================== */

    const cartOverlay =
        document.createElement("div");

    cartOverlay.className =
        "cart-overlay";

    document.body.appendChild(cartOverlay);


    /* =========================
       ELEMENTOS DEL CARRITO
    ========================== */

    const cartItems =
        cartPanel.querySelector(".cart-items");

    const cartTotal =
        cartPanel.querySelector(
            ".cart-total strong"
        );

    const closeCart =
        cartPanel.querySelector(".close-cart");

    const clearCart =
        cartPanel.querySelector(".clear-cart");

    const whatsappOrder =
        cartPanel.querySelector(
            ".whatsapp-order"
        );


    /* =========================
       BOTONES DE PRODUCTOS
    ========================== */

    productCards.forEach((card) => {

        const productInfo =
            card.querySelector(".product-info");


        const name =
            card.querySelector("h4")
                .textContent
                .trim();


        const priceText =
            card.querySelector(".price")
                .textContent
                .trim();


        const price =
            parseFloat(
                priceText
                    .replace("$", "")
                    .replace(/\./g, "")
                    .replace(",", ".")
            );


        const image =
            card.querySelector("img")
                .getAttribute("src");


        const button =
            document.createElement("button");


        button.className =
            "add-product";


        button.textContent =
            "Agregar al pedido";


        productInfo.appendChild(button);


        button.addEventListener(
            "click",
            () => {

                agregarAlCarrito({
                    name,
                    price,
                    image
                });


                button.textContent =
                    "✓ Agregado";


                button.classList.add("added");


                setTimeout(() => {

                    button.textContent =
                        "Agregar al pedido";

                    button.classList.remove(
                        "added"
                    );

                }, 1200);

            }
        );

    });


    /* =========================
       AGREGAR AL CARRITO
    ========================== */

    function agregarAlCarrito(product) {

        const existente =
            cart.find(
                (item) =>
                    item.name === product.name
            );


        if (existente) {

            existente.quantity++;

        } else {

            cart.push({
                ...product,
                quantity: 1
            });

        }


        actualizarCarrito();

    }


    /* =========================
       ACTUALIZAR CARRITO
    ========================== */

    function actualizarCarrito() {

        cartItems.innerHTML = "";


        if (cart.length === 0) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <div>☕</div>

                    <p>
                        Tu pedido está vacío.
                    </p>

                    <span>
                        Agregá algo delicioso del menú.
                    </span>

                </div>
            `;

        }


        let total = 0;
        let cantidadTotal = 0;


        cart.forEach(
            (product, index) => {

                const subtotal =
                    product.price *
                    product.quantity;


                total += subtotal;

                cantidadTotal +=
                    product.quantity;


                const item =
                    document.createElement("div");


                item.className =
                    "cart-item";


                item.innerHTML = `

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >


                    <div class="cart-item-info">

                        <h4>
                            ${product.name}
                        </h4>

                        <p>
                            $${formatearPrecio(
                                product.price
                            )}
                        </p>


                        <div class="quantity-controls">

                            <button
                                class="quantity-minus"
                                aria-label="Disminuir cantidad">
                                −
                            </button>


                            <span>
                                ${product.quantity}
                            </span>


                            <button
                                class="quantity-plus"
                                aria-label="Aumentar cantidad">
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        class="remove-item"
                        aria-label="Eliminar producto">
                        🗑
                    </button>
                `;


                /* DISMINUIR */

                item
                    .querySelector(
                        ".quantity-minus"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            product.quantity--;


                            if (
                                product.quantity <= 0
                            ) {

                                cart.splice(
                                    index,
                                    1
                                );

                            }


                            actualizarCarrito();

                        }
                    );


                /* AUMENTAR */

                item
                    .querySelector(
                        ".quantity-plus"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            product.quantity++;

                            actualizarCarrito();

                        }
                    );


                /* ELIMINAR */

                item
                    .querySelector(
                        ".remove-item"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            cart.splice(
                                index,
                                1
                            );

                            actualizarCarrito();

                        }
                    );


                cartItems.appendChild(item);

            }
        );


        cartTotal.textContent =
            "$" + formatearPrecio(total);


        cartButton.querySelector("span")
            .textContent =
            cantidadTotal;

    }


    /* =========================
       FORMATO DE PRECIOS
    ========================== */

    function formatearPrecio(numero) {

        return numero.toLocaleString(
            "es-AR"
        );

    }


    /* =========================
       ABRIR CARRITO
    ========================== */

    function abrirCarrito() {

        cartPanel.classList.add("open");

        cartOverlay.classList.add("show");

        document.body.classList.add(
            "cart-open"
        );

    }


    /* =========================
       CERRAR CARRITO
    ========================== */

    function cerrarCarrito() {

        cartPanel.classList.remove(
            "open"
        );

        cartOverlay.classList.remove(
            "show"
        );

        document.body.classList.remove(
            "cart-open"
        );

    }


    cartButton.addEventListener(
        "click",
        abrirCarrito
    );


    closeCart.addEventListener(
        "click",
        cerrarCarrito
    );


    cartOverlay.addEventListener(
        "click",
        cerrarCarrito
    );


    /* =========================
       VACIAR CARRITO
    ========================== */

    clearCart.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {
                return;
            }


            const confirmar =
                confirm(
                    "¿Querés vaciar todo el pedido?"
                );


            if (confirmar) {

                cart = [];

                actualizarCarrito();

            }

        }
    );


    /* =========================
       PEDIDO POR WHATSAPP
    ========================== */

    whatsappOrder.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Agregá al menos un producto antes de hacer el pedido ☕"
                );

                return;

            }


            let mensaje =
                "Hola, Cafetería El Alba. " +
                "Quisiera hacer este pedido:\n\n";


            let total = 0;


            cart.forEach(
                (product) => {

                    const subtotal =
                        product.price *
                        product.quantity;


                    total += subtotal;


                    mensaje +=
                        `• ${product.name} x${product.quantity} - $${formatearPrecio(subtotal)}\n`;

                }
            );


            mensaje +=
                `\nTotal: $${formatearPrecio(total)}`;


            /*
                IMPORTANTE:
                Reemplazá este número por
                el WhatsApp real de la cafetería.

                Formato:
                549 + código de área + número
            */

            const numeroWhatsApp =
                "5490000000000";


            const url =
                `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;


            window.open(
                url,
                "_blank"
            );

        }
    );


    /* =========================
       NAVEGACIÓN ACTIVA
    ========================== */

    window.addEventListener(
        "scroll",
        () => {

            let current = "";


            sections.forEach(
                (section) => {

                    const top =
                        section.offsetTop - 160;


                    if (
                        window.scrollY >= top
                    ) {

                        current =
                            section.getAttribute(
                                "id"
                            );

                    }

                }
            );


            navLinks.forEach(
                (link) => {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute(
                            "href"
                        ) === `#${current}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );


    /* =========================
       BOTÓN VOLVER ARRIBA
    ========================== */

    const topButton =
        document.createElement("button");


    topButton.className =
        "top-button";


    topButton.textContent = "↑";


    topButton.setAttribute(
        "aria-label",
        "Volver arriba"
    );


    document.body.appendChild(
        topButton
    );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 400) {

                topButton.classList.add(
                    "show"
                );

            } else {

                topButton.classList.remove(
                    "show"
                );

            }

        }
    );


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =========================
       ESC PARA CERRAR CARRITO
    ========================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                cartPanel.classList.contains(
                    "open"
                )
            ) {

                cerrarCarrito();

            }

        }
    );


    /* =========================
       INICIALIZAR
    ========================== */

    actualizarCarrito();

    aplicarFiltros();


    console.log(
        "☕ Cafetería El Alba iniciada correctamente."
    );

});
