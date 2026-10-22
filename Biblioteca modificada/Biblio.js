
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    // Elementos principales
    const galeria = document.querySelector("#galeriaLibros");
    const tarjetas = [...document.querySelectorAll(".tarjeta-libro")];

    const busqueda = document.querySelector("#busquedaLibros");
    const limpiarBusqueda = document.querySelector("#btnLimpiarBusqueda");
    const filtroGenero = document.querySelector("#filtroGenero");
    const resultadoBusqueda = document.querySelector("#resultadoBusqueda");
    const sinResultados = document.querySelector("#sinResultados");

    const btnRestablecer = document.querySelector("#btnRestablecer");
    const btnLimpiarSinResultados = document.querySelector("#btnLimpiarSinResultados");
    const btnRecomendar = document.querySelector("#btnRecomendar");

    const btnIntroduccion = document.querySelector("#btnIntroduccion");
    const dialogIntroduccion = document.querySelector("#dialogIntroduccion");
    const btnCerrarIntroduccion = document.querySelector("#btnCerrarIntroduccion");
    const btnEntrar = document.querySelector("#btnEntrar");

    const btnGeneros = document.querySelector("#btnGeneros");
    const menuGeneros = document.querySelector("#menuGeneros");

    const btnFavoritos = document.querySelector("#btnFavoritos");
    const contadorFavoritos = document.querySelector("#contadorFavoritos");

    const dialogLibro = document.querySelector("#dialogLibro");
    const btnCerrarLibro = document.querySelector("#btnCerrarLibro");
    const btnCerrarFicha = document.querySelector("#btnCerrarFicha");
    const btnFavoritoDetalle = document.querySelector("#btnFavoritoDetalle");

    const detallePortada = document.querySelector("#detallePortada");
    const detalleGenero = document.querySelector("#detalleGenero");
    const detalleTitulo = document.querySelector("#detalleTitulo");
    const detalleAutor = document.querySelector("#detalleAutor");
    const detalleDescripcion = document.querySelector("#detalleDescripcion");

    const notificacion = document.querySelector("#notificacion");
    const anioActual = document.querySelector("#anioActual");

    // Estado de la página
    let favoritos = cargarFavoritos();
    let mostrarSoloFavoritos = false;
    let libroSeleccionado = null;
    let temporizadorNotificacion = null;

    // Catálogo basado en las tarjetas del HTML.
    const libros = tarjetas.map((tarjeta) => ({
        id: tarjeta.dataset.id,
        titulo: tarjeta.dataset.title,
        autor: tarjeta.dataset.author,
        genero: tarjeta.dataset.genre,
        descripcion: tarjeta.dataset.description,
        color: tarjeta.dataset.color,
        elemento: tarjeta
    }));

    // Favoritos: se conservan entre visitas en el mismo navegador.
    function cargarFavoritos() {
        try {
            const guardados = JSON.parse(
                localStorage.getItem("rinconFavoritos") || "[]"
            );

            return new Set(
                Array.isArray(guardados)
                    ? guardados.filter((id) => typeof id === "string")
                    : []
            );
        } catch (error) {
            console.warn("No se pudieron recuperar los favoritos.", error);
            return new Set();
        }
    }

    function guardarFavoritos() {
        try {
            localStorage.setItem(
                "rinconFavoritos",
                JSON.stringify([...favoritos])
            );
        } catch (error) {
            console.warn("No se pudieron guardar los favoritos.", error);
            mostrarNotificacion(
                "El navegador no permitió guardar los favoritos."
            );
        }
    }

    function actualizarContadorFavoritos() {
        contadorFavoritos.textContent = favoritos.size;
        btnFavoritos.setAttribute(
            "aria-pressed",
            String(mostrarSoloFavoritos)
        );

        btnFavoritos.classList.toggle(
            "activo",
            mostrarSoloFavoritos
        );
    }

    function actualizarBotonesFavoritos() {
        document.querySelectorAll("[data-favorite]").forEach((boton) => {
            const esFavorito = favoritos.has(boton.dataset.favorite);

            boton.textContent = esFavorito ? "♥" : "♡";
            boton.setAttribute("aria-pressed", String(esFavorito));
            boton.setAttribute(
                "aria-label",
                esFavorito
                    ? "Quitar de favoritos"
                    : "Añadir a favoritos"
            );
            boton.title = esFavorito
                ? "Quitar de favoritos"
                : "Añadir a favoritos";
        });

        actualizarContadorFavoritos();
        actualizarBotonFavoritoDetalle();
    }

    function cambiarFavorito(id) {
        if (!libros.some((libro) => libro.id === id)) {
            return;
        }

        if (favoritos.has(id)) {
            favoritos.delete(id);
            mostrarNotificacion("Libro eliminado de favoritos.");
        } else {
            favoritos.add(id);
            mostrarNotificacion("Libro guardado en favoritos.");
        }

        guardarFavoritos();
        actualizarBotonesFavoritos();
        aplicarFiltros();
    }

    // Buscador y filtros.
    function aplicarFiltros() {
        const texto = busqueda.value.trim().toLocaleLowerCase("es");
        const generoElegido = filtroGenero.value;

        let cantidadVisible = 0;

        libros.forEach((libro) => {
            const coincideTexto = [
                libro.titulo,
                libro.autor,
                libro.genero,
                libro.descripcion
            ].some((dato) =>
                dato.toLocaleLowerCase("es").includes(texto)
            );

            const coincideGenero =
                generoElegido === "Todos" ||
                libro.genero === generoElegido;

            const coincideFavoritos =
                !mostrarSoloFavoritos ||
                favoritos.has(libro.id);

            const visible =
                coincideTexto &&
                coincideGenero &&
                coincideFavoritos;

            libro.elemento.hidden = !visible;

            if (visible) {
                cantidadVisible++;
            }
        });

        sinResultados.hidden = cantidadVisible !== 0;
        galeria.hidden = cantidadVisible === 0;

        if (cantidadVisible === libros.length) {
            resultadoBusqueda.textContent =
                `Mostrando todos los libros (${cantidadVisible}).`;
        } else {
            resultadoBusqueda.textContent =
                `Se encontraron ${cantidadVisible} de ${libros.length} libros.`;
        }

        if (mostrarSoloFavoritos) {
            resultadoBusqueda.textContent += " · Solo favoritos";
        }

        actualizarGenerosActivos();
    }

    function restablecerFiltros() {
        busqueda.value = "";
        filtroGenero.value = "Todos";
        mostrarSoloFavoritos = false;

        actualizarContadorFavoritos();
        aplicarFiltros();
        busqueda.focus();
    }

    function seleccionarGenero(genero) {
        const opciones = [...filtroGenero.options].map(
            (opcion) => opcion.value
        );

        if (!opciones.includes(genero)) {
            return;
        }

        filtroGenero.value = genero;
        mostrarSoloFavoritos = false;

        actualizarContadorFavoritos();
        aplicarFiltros();
        cerrarMenuGeneros();

        document.querySelector("#coleccion").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function actualizarGenerosActivos() {
        document.querySelectorAll("[data-genre]").forEach((boton) => {
            const activo =
                boton.dataset.genre === filtroGenero.value &&
                !mostrarSoloFavoritos;

            boton.classList.toggle("activo", activo);
            boton.setAttribute("aria-pressed", String(activo));
        });
    }

    // Ficha individual del libro.
    function abrirFicha(id) {
        const libro = libros.find((elemento) => elemento.id === id);

        if (!libro) {
            return;
        }

        libroSeleccionado = libro;

        detalleTitulo.textContent = libro.titulo;
        detalleAutor.textContent = `Autor/a: ${libro.autor}`;
        detalleGenero.textContent = libro.genero;
        detalleDescripcion.textContent = libro.descripcion;

        detallePortada.className =
            `portada portada-detalle portada-${libro.color}`;

        detallePortada.replaceChildren();

        const simbolo = document.createElement("span");
        simbolo.className = "portada-simbolo";
        simbolo.setAttribute("aria-hidden", "true");
        simbolo.textContent = obtenerSimbolo(libro.color);

        const tipo = document.createElement("span");
        tipo.className = "portada-tipo";
        tipo.textContent = libro.genero.toLocaleUpperCase("es");

        detallePortada.append(simbolo, tipo);

        actualizarBotonFavoritoDetalle();

        if (!dialogLibro.open) {
            dialogLibro.showModal();
        }
    }

    function obtenerSimbolo(color) {
        const simbolos = {
            vino: "⌕",
            verde: "❧",
            azul: "✦",
            rosa: "❋",
            dorado: "✧",
            gris: "◎"
        };

        return simbolos[color] || "✦";
    }

    function actualizarBotonFavoritoDetalle() {
        if (!libroSeleccionado) {
            btnFavoritoDetalle.disabled = true;
            return;
        }

        const esFavorito = favoritos.has(libroSeleccionado.id);

        btnFavoritoDetalle.disabled = false;
        btnFavoritoDetalle.textContent = esFavorito
            ? "♥ Quitar de favoritos"
            : "♡ Añadir a favoritos";

        btnFavoritoDetalle.setAttribute(
            "aria-pressed",
            String(esFavorito)
        );
    }

    function cerrarFicha() {
        if (dialogLibro.open) {
            dialogLibro.close();
        }
    }

    // Recomendación aleatoria entre los libros visibles.
    function recomendarLibro() {
        const disponibles = libros.filter(
            (libro) => !libro.elemento.hidden
        );

        if (disponibles.length === 0) {
            mostrarNotificacion(
                "No hay libros para recomendar con los filtros actuales."
            );
            return;
        }

        const indice = Math.floor(Math.random() * disponibles.length);
        const recomendado = disponibles[indice];

        mostrarNotificacion(`Nuestra recomendación: ${recomendado.titulo}`);
        abrirFicha(recomendado.id);
    }

    // Ventanas de presentación.
    function abrirIntroduccion() {
        if (!dialogIntroduccion.open) {
            dialogIntroduccion.showModal();
        }
    }

    function cerrarIntroduccion() {
        if (dialogIntroduccion.open) {
            dialogIntroduccion.close();
        }
    }

    // Menú desplegable.
    function alternarMenuGeneros() {
        const abierto = !menuGeneros.hidden;

        menuGeneros.hidden = abierto;
        btnGeneros.setAttribute("aria-expanded", String(!abierto));
    }

    function cerrarMenuGeneros() {
        menuGeneros.hidden = true;
        btnGeneros.setAttribute("aria-expanded", "false");
    }

    // Notificaciones.
    function mostrarNotificacion(mensaje) {
        notificacion.textContent = mensaje;
        notificacion.hidden = false;

        if (temporizadorNotificacion !== null) {
            clearTimeout(temporizadorNotificacion);
        }

        temporizadorNotificacion = setTimeout(() => {
            notificacion.hidden = true;
            temporizadorNotificacion = null;
        }, 3000);
    }

    // Eventos del catálogo.
    busqueda.addEventListener("input", aplicarFiltros);
    filtroGenero.addEventListener("change", () => {
        mostrarSoloFavoritos = false;
        actualizarContadorFavoritos();
        aplicarFiltros();
    });

    limpiarBusqueda.addEventListener("click", () => {
        busqueda.value = "";
        aplicarFiltros();
        busqueda.focus();
    });

    btnRestablecer.addEventListener("click", restablecerFiltros);
    btnLimpiarSinResultados.addEventListener(
        "click",
        restablecerFiltros
    );

    galeria.addEventListener("click", (evento) => {
        const botonFavorito = evento.target.closest("[data-favorite]");

        if (botonFavorito) {
            cambiarFavorito(botonFavorito.dataset.favorite);
            return;
        }

        const botonDetalles = evento.target.closest(".boton-detalles");

        if (botonDetalles) {
            const tarjeta = botonDetalles.closest(".tarjeta-libro");

            if (tarjeta) {
                abrirFicha(tarjeta.dataset.id);
            }
        }
    });

    // Filtro de favoritos.
    btnFavoritos.addEventListener("click", () => {
        mostrarSoloFavoritos = !mostrarSoloFavoritos;
        actualizarContadorFavoritos();
        aplicarFiltros();

        mostrarNotificacion(
            mostrarSoloFavoritos
                ? "Mostrando tus libros favoritos."
                : "Mostrando el catálogo completo."
        );

        document.querySelector("#coleccion").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    // Recomendación.
    btnRecomendar.addEventListener("click", recomendarLibro);

    // Géneros: menú superior y botones de la sección inferior.
    btnGeneros.addEventListener("click", alternarMenuGeneros);

    menuGeneros.addEventListener("click", (evento) => {
        const boton = evento.target.closest("[data-genre]");

        if (boton) {
            seleccionarGenero(boton.dataset.genre);
        }
    });

    document.querySelectorAll(".botones-generos [data-genre]")
        .forEach((boton) => {
            boton.addEventListener("click", () => {
                seleccionarGenero(boton.dataset.genre);
            });
        });

    // Ventana de bienvenida.
    btnIntroduccion.addEventListener("click", abrirIntroduccion);
    btnCerrarIntroduccion.addEventListener("click", cerrarIntroduccion);
    btnEntrar.addEventListener("click", () => {
        cerrarIntroduccion();

        document.querySelector("#coleccion").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    // Ventana de detalles.
    btnCerrarLibro.addEventListener("click", cerrarFicha);
    btnCerrarFicha.addEventListener("click", cerrarFicha);

    btnFavoritoDetalle.addEventListener("click", () => {
        if (libroSeleccionado) {
            cambiarFavorito(libroSeleccionado.id);
        }
    });

    // Cerrar al pulsar fuera del contenido de los diálogos.
    [dialogIntroduccion, dialogLibro].forEach((dialogo) => {
        dialogo.addEventListener("click", (evento) => {
            if (evento.target === dialogo) {
                dialogo.close();
            }
        });
    });

    // Cerrar el menú con Escape y al pulsar fuera.
    document.addEventListener("click", (evento) => {
        if (
            !menuGeneros.hidden &&
            !menuGeneros.contains(evento.target) &&
            !btnGeneros.contains(evento.target)
        ) {
            cerrarMenuGeneros();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            cerrarMenuGeneros();
        }
    });

    // Año automático del pie de página.
    anioActual.textContent = new Date().getFullYear();

    // Preparar la interfaz al cargar.
    actualizarBotonesFavoritos();
    aplicarFiltros();
});
