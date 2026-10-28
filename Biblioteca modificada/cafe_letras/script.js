// Café & Letras: catálogo ampliado, buscadores, filtros, selección y ofertas.
// Los precios son de ejemplo y se expresan en pesos argentinos (ARS).

const libros = [
    { id: 1, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", genero: "Fantasía", precio: 8500, descripcion: "Un pequeño príncipe viaja por distintos planetas y descubre el valor de la amistad, el amor y la responsabilidad.", color: "#8b6d45" },
    { id: 2, titulo: "1984", autor: "George Orwell", genero: "Ciencia ficción", precio: 12000, descripcion: "Una novela distópica sobre la vigilancia, el poder y el control de la información.", color: "#8f3434" },
    { id: 3, titulo: "Dune", autor: "Frank Herbert", genero: "Ciencia ficción", precio: 18500, descripcion: "Intrigas políticas, ecología y destino se cruzan en el desértico planeta Arrakis.", color: "#a87938" },
    { id: 4, titulo: "Harry Potter y la piedra filosofal", autor: "J. K. Rowling", genero: "Fantasía", precio: 16000, descripcion: "Un niño descubre que pertenece al mundo de la magia y comienza su educación en Hogwarts.", color: "#4e6487" },
    { id: 5, titulo: "Orgullo y prejuicio", autor: "Jane Austen", genero: "Romance", precio: 11000, descripcion: "Una historia de amor, primeras impresiones y convenciones sociales.", color: "#7d526d" },
    { id: 6, titulo: "Sapiens", autor: "Yuval Noah Harari", genero: "Historia", precio: 22000, descripcion: "Un recorrido por la historia de la humanidad y las ideas que transformaron nuestras sociedades.", color: "#6b7650" },
    { id: 7, titulo: "La sombra del viento", autor: "Carlos Ruiz Zafón", genero: "Misterio", precio: 17500, descripcion: "Un joven encuentra un libro olvidado que lo conduce a un misterio literario en Barcelona.", color: "#3e5960" },
    { id: 8, titulo: "Fahrenheit 451", autor: "Ray Bradbury", genero: "Ciencia ficción", precio: 12500, descripcion: "En una sociedad que prohíbe los libros, un bombero comienza a cuestionar su trabajo.", color: "#a94e2e" },
    { id: 9, titulo: "Mujercitas", autor: "Louisa May Alcott", genero: "Clásico", precio: 10500, descripcion: "Cuatro hermanas crecen, enfrentan dificultades y persiguen sus sueños.", color: "#8b765b" },
    { id: 10, titulo: "El Hobbit", autor: "J. R. R. Tolkien", genero: "Fantasía", precio: 15500, descripcion: "Bilbo Bolsón emprende una aventura inesperada junto a un grupo de enanos.", color: "#55704a" },
    { id: 11, titulo: "Crónica de una muerte anunciada", autor: "Gabriel García Márquez", genero: "Misterio", precio: 9800, descripcion: "Un pueblo reconstruye los hechos que condujeron a una muerte anunciada.", color: "#84614b" },
    { id: 12, titulo: "Rayuela", autor: "Julio Cortázar", genero: "Clásico", precio: 14500, descripcion: "Una novela experimental que invita a recorrer la historia de distintas maneras.", color: "#67547d" },
    { id: 13, titulo: "Los juegos del hambre", autor: "Suzanne Collins", genero: "Aventura", precio: 15000, descripcion: "Katniss se ofrece como voluntaria en un peligroso espectáculo televisado.", color: "#8b4538" },
    { id: 14, titulo: "El nombre del viento", autor: "Patrick Rothfuss", genero: "Fantasía", precio: 21000, descripcion: "Kvothe relata su vida, desde una infancia itinerante hasta su formación como arcanista.", color: "#8b6a38" },
    { id: 15, titulo: "Asesinato en el Orient Express", autor: "Agatha Christie", genero: "Misterio", precio: 13000, descripcion: "Hércules Poirot investiga un asesinato ocurrido durante un viaje en tren.", color: "#46566b" },
    { id: 16, titulo: "La biblioteca de la medianoche", autor: "Matt Haig", genero: "Ficción", precio: 16500, descripcion: "Una biblioteca extraordinaria permite explorar las vidas que podrían haber sido.", color: "#476b61" },
    { id: 17, titulo: "Drácula", autor: "Bram Stoker", genero: "Terror", precio: 11500, descripcion: "El clásico gótico que narra la amenaza del conde Drácula.", color: "#572c3b" },
    { id: 18, titulo: "Matar a un ruiseñor", autor: "Harper Lee", genero: "Clásico", precio: 14000, descripcion: "Una niña observa la justicia y los prejuicios de su comunidad.", color: "#6b765c" },
    { id: 19, titulo: "It", autor: "Stephen King", genero: "Terror", precio: 24000, descripcion: "Un grupo de amigos se enfrenta a una presencia aterradora que acecha su pueblo.", color: "#9a3838" },
    { id: 20, titulo: "El alquimista", autor: "Paulo Coelho", genero: "Aventura", precio: 10000, descripcion: "Un joven pastor emprende un viaje en busca de un tesoro y descubre su propio camino.", color: "#98723f" }
];

const menu = [
    { id: 1, nombre: "Espresso doble", categoria: "Café", descripcion: "Café intenso, recién molido.", precio: 2200 },
    { id: 2, nombre: "Latte de vainilla", categoria: "Café", descripcion: "Espresso con leche cremosa y un toque de vainilla.", precio: 3200 },
    { id: 3, nombre: "Capuchino", categoria: "Café", descripcion: "Café, leche vaporizada y espuma suave.", precio: 3000 },
    { id: 4, nombre: "Chocolate caliente", categoria: "Bebidas", descripcion: "Chocolate espeso con leche.", precio: 3500 },
    { id: 5, nombre: "Té de frutos rojos", categoria: "Bebidas", descripcion: "Infusión aromática servida caliente.", precio: 2400 },
    { id: 6, nombre: "Limonada con menta", categoria: "Bebidas", descripcion: "Limonada fresca con hojas de menta.", precio: 2800 },
    { id: 7, nombre: "Medialunas (2 unidades)", categoria: "Dulce", descripcion: "Dos medialunas doradas, dulces o saladas.", precio: 2600 },
    { id: 8, nombre: "Brownie de chocolate", categoria: "Dulce", descripcion: "Brownie húmedo con trozos de chocolate.", precio: 3200 },
    { id: 9, nombre: "Cheesecake", categoria: "Dulce", descripcion: "Porción de tarta de queso con salsa de frutos rojos.", precio: 4200 },
    { id: 10, nombre: "Cookie de chocolate", categoria: "Dulce", descripcion: "Galleta grande, crocante por fuera y tierna por dentro.", precio: 1900 },
    { id: 11, nombre: "Tostado de jamón y queso", categoria: "Salado", descripcion: "Pan tostado con jamón y queso fundido.", precio: 4800 },
    { id: 12, nombre: "Sándwich vegetariano", categoria: "Salado", descripcion: "Verduras frescas, queso y aderezo suave.", precio: 4600 },
    { id: 13, nombre: "Tostadas con mermelada", categoria: "Salado", descripcion: "Pan artesanal con manteca y mermelada.", precio: 2800 },
    { id: 14, nombre: "Alfajor artesanal", categoria: "Dulce", descripcion: "Tapas suaves, dulce de leche y baño de chocolate.", precio: 2100 },
    { id: 15, nombre: "Porción de pasta frola", categoria: "Dulce", descripcion: "Tarta casera de membrillo.", precio: 2300 },
    { id: 16, nombre: "Budín de limón", categoria: "Dulce", descripcion: "Budín esponjoso con glaseado de limón.", precio: 2500 },
    { id: 17, nombre: "Jugo de naranja", categoria: "Bebidas", descripcion: "Jugo exprimido servido frío.", precio: 3000 },
    { id: 18, nombre: "Licuado de banana", categoria: "Bebidas", descripcion: "Banana licuada con leche.", precio: 3300 },
    { id: 19, nombre: "Empanadas (2 unidades)", categoria: "Salado", descripcion: "Dos empanadas al horno, consultar sabores.", precio: 3600 },
    { id: 20, nombre: "Porción de torta de manzana", categoria: "Dulce", descripcion: "Torta casera con manzana y canela.", precio: 3500 }
];

const ofertas = [
    { id: 1, titulo: "Lectura entre estrellas", descripcion: "Elegí 2 libros de fantasía o ciencia ficción.", premio: "Un café clásico gratis", cantidad: 2, generos: ["Fantasía", "Ciencia ficción"] },
    { id: 2, titulo: "Clásicos de siempre", descripcion: "Elegí 2 libros del género Clásico o Romance.", premio: "Un té o infusión gratis", cantidad: 2, generos: ["Clásico", "Romance"] },
    { id: 3, titulo: "Noche de misterio", descripcion: "Elegí 2 libros de misterio o terror.", premio: "10 % de descuento en el menú", cantidad: 2, generos: ["Misterio", "Terror"] }
];

const frases = [
    { texto: "No hay noche tan larga que impida el regreso de la luz.", autor: "Frase popular" },
    { texto: "Siempre imaginé que el paraíso sería algún tipo de biblioteca.", autor: "Jorge Luis Borges" },
    { texto: "Entre una taza de café y una página, el tiempo aprende a caminar despacio.", autor: "Frase original" },
    { texto: "Un libro es una ventana que se abre sin hacer ruido.", autor: "Frase original" },
    { texto: "A veces, el mejor viaje comienza al pasar una página.", autor: "Frase original" },
    { texto: "La noche guarda silencio para que las historias puedan hablar.", autor: "Frase original" }
];

const formatoPrecio = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const $ = (selector) => document.querySelector(selector);
const vistas = {
    inicio: $("#vista-inicio"),
    libros: $("#vista-libros"),
    menu: $("#vista-menu"),
    ofertas: $("#vista-ofertas")
};
let generoActivo = "Todos";
let categoriaActiva = "Todos";
let seleccion = [];
let fraseAnterior = -1;


// Gatito animado: aparece cerca del final de la página y cambia de pose por sección.
const gatitoPaseante = $("#gatito-paseante");
const gatitoEmoji = $("#gatito");
const posesGatito = {
    inicio: { emoji: "🐈‍⬛", saludo: "Explorando..." },
    libros: { emoji: "🐈", saludo: "¡A leer!" },
    menu: { emoji: "😺", saludo: "¡Hora del café!" },
    ofertas: { emoji: "🐈‍⬛", saludo: "¡Qué oferta!" }
};

function actualizarGatito(vistaActual) {
    const pose = posesGatito[vistaActual] || posesGatito.inicio;
    gatitoPaseante.dataset.pose = vistaActual in posesGatito ? vistaActual : "inicio";
    gatitoEmoji.textContent = pose.emoji;
    const saludo = gatitoPaseante.querySelector(".gatito-saludo");
    if (saludo) saludo.textContent = pose.saludo;
}

function revisarFinalDePagina() {
    const distanciaAlFinal = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
    gatitoPaseante.classList.toggle("visible", distanciaAlFinal <= 140);
}

function navegar() {
    const destino = (location.hash || "#inicio").slice(1);
    const clave = destino === "coleccion" ? "libros" : (vistas[destino] ? destino : "inicio");
    Object.entries(vistas).forEach(([nombre, vista]) => { vista.hidden = nombre !== clave; });
    document.querySelectorAll(".nav a").forEach((enlace) => {
        const activo = enlace.getAttribute("href") === `#${clave}`;
        if (activo) enlace.setAttribute("aria-current", "page");
        else enlace.removeAttribute("aria-current");
    });
    actualizarGatito(clave);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (clave === "libros") renderLibros();
    if (clave === "menu") renderMenu();
    if (clave === "ofertas") renderOfertas();
}

function renderLibros() {
    const contenedor = $("#lista-libros");
    const consulta = ($("#buscar-libros").value || "").trim().toLocaleLowerCase("es");
    const encontrados = libros.filter((libro) => {
        const coincideTexto = `${libro.titulo} ${libro.autor} ${libro.genero}`.toLocaleLowerCase("es").includes(consulta);
        return coincideTexto && (generoActivo === "Todos" || libro.genero === generoActivo);
    });
    contenedor.replaceChildren();
    $("#resultados-libros").textContent = `Se encontraron ${encontrados.length} de ${libros.length} libros.`;
    $("#limpiar-libros").hidden = !consulta;
    $("#filtros-libros").replaceChildren();
    ["Todos", ...new Set(libros.map((libro) => libro.genero))].forEach((genero) => {
        const boton = document.createElement("button");
        boton.type = "button"; boton.className = "filtro"; boton.textContent = genero;
        boton.setAttribute("aria-pressed", String(generoActivo === genero));
        boton.addEventListener("click", () => { generoActivo = genero; renderLibros(); });
        $("#filtros-libros").append(boton);
    });
    if (!encontrados.length) {
        contenedor.innerHTML = '<p class="sin-resultados">No encontramos libros con esa búsqueda. Probá con otro título, autor o género.</p>';
        return;
    }
    encontrados.forEach((libro) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "libro";
        const portada = document.createElement("div");
        portada.className = "portada";
        portada.style.setProperty("--c", libro.color);
        const etiqueta = document.createElement("small"); etiqueta.textContent = libro.genero;
        const tituloPortada = document.createElement("span"); tituloPortada.textContent = libro.titulo;
        const sello = document.createElement("small"); sello.textContent = "CAFÉ & LETRAS";
        portada.append(etiqueta, tituloPortada, sello);
        const titulo = document.createElement("h3"); titulo.textContent = libro.titulo;
        const autor = document.createElement("p"); autor.className = "meta"; autor.textContent = libro.autor;
        const precio = document.createElement("p"); precio.className = "precio"; precio.textContent = formatoPrecio.format(libro.precio);
        const descripcion = document.createElement("p"); descripcion.className = "meta"; descripcion.textContent = libro.descripcion;
        const boton = document.createElement("button"); boton.className = "boton boton-principal"; boton.type = "button";
        const agregado = seleccion.some((item) => item.id === libro.id);
        boton.textContent = agregado ? "Quitar de mi selección" : "Agregar a mi selección";
        boton.addEventListener("click", () => {
            if (seleccion.some((item) => item.id === libro.id)) seleccion = seleccion.filter((item) => item.id !== libro.id);
            else seleccion.push(libro);
            actualizarSeleccion(); renderLibros();
        });
        tarjeta.append(portada, titulo, autor, descripcion, precio, boton);
        contenedor.append(tarjeta);
    });
}

function actualizarSeleccion() {
    const lista = $("#lista-seleccion");
    lista.replaceChildren();
    if (!seleccion.length) {
        const vacio = document.createElement("li"); vacio.className = "vacio"; vacio.textContent = "Todavía no agregaste libros."; lista.append(vacio);
    }
    seleccion.forEach((libro) => {
        const item = document.createElement("li");
        const nombre = document.createElement("span"); nombre.textContent = libro.titulo;
        const precio = document.createElement("strong"); precio.textContent = formatoPrecio.format(libro.precio);
        item.append(nombre, precio); lista.append(item);
    });
    const total = seleccion.reduce((suma, libro) => suma + libro.precio, 0);
    $("#total-seleccion").textContent = `Total: ${formatoPrecio.format(total)}`;
    $("#contador").hidden = seleccion.length === 0;
    $("#contador").textContent = seleccion.length;
    const premios = $("#premios");
    premios.replaceChildren();
    const ganadas = ofertas.filter((oferta) => seleccion.filter((libro) => oferta.generos.includes(libro.genero)).length >= oferta.cantidad);
    ganadas.forEach((oferta) => {
        const p = document.createElement("p"); p.className = "premio-ganado"; p.textContent = `¡Oferta desbloqueada! ${oferta.titulo}: ${oferta.premio}.`; premios.append(p);
    });
    if (!ganadas.length && seleccion.length) {
        const p = document.createElement("p"); p.className = "estado"; p.textContent = "Agregá libros de una misma oferta para desbloquear un premio."; premios.append(p);
    }
}

function renderMenu() {
    const contenedor = $("#lista-menu");
    const consulta = ($("#buscar-menu").value || "").trim().toLocaleLowerCase("es");
    const encontrados = menu.filter((producto) => `${producto.nombre} ${producto.categoria} ${producto.descripcion}`.toLocaleLowerCase("es").includes(consulta) && (categoriaActiva === "Todos" || producto.categoria === categoriaActiva));
    contenedor.replaceChildren();
    $("#resultados-menu").textContent = `Se encontraron ${encontrados.length} de ${menu.length} productos.`;
    $("#limpiar-menu").hidden = !consulta;
    $("#filtros-menu").replaceChildren();
    ["Todos", ...new Set(menu.map((producto) => producto.categoria))].forEach((categoria) => {
        const boton = document.createElement("button"); boton.type = "button"; boton.className = "filtro"; boton.textContent = categoria;
        boton.setAttribute("aria-pressed", String(categoriaActiva === categoria));
        boton.addEventListener("click", () => { categoriaActiva = categoria; renderMenu(); });
        $("#filtros-menu").append(boton);
    });
    if (!encontrados.length) {
        const li = document.createElement("li"); li.className = "sin-resultados"; li.textContent = "No encontramos productos con esa búsqueda."; contenedor.append(li); return;
    }
    encontrados.forEach((producto) => {
        const li = document.createElement("li");
        const detalle = document.createElement("div");
        const nombre = document.createElement("strong"); nombre.textContent = producto.nombre;
        const descripcion = document.createElement("span"); descripcion.textContent = `${producto.categoria} · ${producto.descripcion}`;
        detalle.append(nombre, descripcion);
        const precio = document.createElement("strong"); precio.className = "precio"; precio.textContent = formatoPrecio.format(producto.precio);
        li.append(detalle, precio); contenedor.append(li);
    });
}

function renderOfertas() {
    const contenedor = $("#lista-ofertas");
    contenedor.replaceChildren();
    ofertas.forEach((oferta) => {
        const tarjeta = document.createElement("article"); tarjeta.className = "oferta";
        const titulo = document.createElement("h3"); titulo.textContent = oferta.titulo;
        const descripcion = document.createElement("p"); descripcion.textContent = oferta.descripcion;
        const premio = document.createElement("p"); premio.className = "premio"; premio.textContent = `Premio: ${oferta.premio}`;
        const estado = document.createElement("p"); estado.className = "estado";
        const cantidad = seleccion.filter((libro) => oferta.generos.includes(libro.genero)).length;
        estado.textContent = cantidad >= oferta.cantidad ? "¡Oferta desbloqueada con tu selección!" : `Llevás ${cantidad} de ${oferta.cantidad} libros necesarios.`;
        if (cantidad >= oferta.cantidad) tarjeta.classList.add("lista");
        tarjeta.append(titulo, descripcion, premio, estado);
        contenedor.append(tarjeta);
    });
}

function configurarBuscador(idFormulario, idInput, idLimpiar, renderizar) {
    $(idFormulario).addEventListener("submit", (evento) => { evento.preventDefault(); renderizar(); });
    $(idInput).addEventListener("input", renderizar);
    $(idLimpiar).addEventListener("click", () => { $(idInput).value = ""; renderizar(); $(idInput).focus(); });
}

$("#btn-cambiar-tema").addEventListener("click", () => {
    const claro = document.body.classList.toggle("modo-claro");
    $("#btn-cambiar-tema").setAttribute("aria-pressed", String(claro));
    $("#btn-cambiar-tema").setAttribute("aria-label", claro ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
    $("#btn-cambiar-tema").textContent = claro ? "☀" : "☾";
});
$("#btn-nueva-frase").addEventListener("click", () => {
    let nuevo;
    do { nuevo = Math.floor(Math.random() * frases.length); } while (frases.length > 1 && nuevo === fraseAnterior);
    fraseAnterior = nuevo;
    $("#texto-frase").textContent = frases[nuevo].texto;
    $("#autor-frase").textContent = `— ${frases[nuevo].autor}`;
});
$("#btn-vaciar").addEventListener("click", () => { seleccion = []; actualizarSeleccion(); renderLibros(); });
configurarBuscador("#form-libros", "#buscar-libros", "#limpiar-libros", renderLibros);
configurarBuscador("#form-menu", "#buscar-menu", "#limpiar-menu", renderMenu);
window.addEventListener("hashchange", navegar);
window.addEventListener("scroll", revisarFinalDePagina, { passive: true });
window.addEventListener("resize", revisarFinalDePagina);
navegar();
actualizarSeleccion();
revisarFinalDePagina();
