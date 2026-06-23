/* =====================================================================
   HOJA DE VIDA — Jehanpier Antonio Estrada Cabarcas
   script.js  ·  JavaScript puro (vanilla), sin dependencias.
   ---------------------------------------------------------------------
   Contenido:
   1) Header con estado al hacer scroll
   2) Menú hamburguesa (móvil)
   3) Scroll suave + cierre del menú al elegir sección
   4) Resaltado del enlace de la sección activa (scroll-spy)
   5) Animaciones de aparición al entrar en pantalla
   6) Barras de idiomas animadas
   7) Botón "volver arriba"
   8) Validación del formulario de contacto + envío por mailto
   9) Descargar CV en PDF (usa la ventana de impresión del navegador)
   ===================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const header   = document.getElementById('header');
  const nav       = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = Array.from(document.querySelectorAll('.nav__link'));
  const toTop      = document.getElementById('toTop');
  const reduceMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ------------------------------------------------------------------
     1) HEADER: cambia de aspecto al desplazarse hacia abajo
     ------------------------------------------------------------------ */
  const onScrollHeader = () => {
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else                      header.classList.remove('is-scrolled');

    // Botón volver arriba: visible tras bajar una pantalla
    if (window.scrollY > window.innerHeight * 0.6) toTop.classList.add('is-visible');
    else                                            toTop.classList.remove('is-visible');
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });


  /* ------------------------------------------------------------------
     2) MENÚ HAMBURGUESA
     ------------------------------------------------------------------ */
  const closeMenu = () => {
    nav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú');
  };
  const openMenu = () => {
    nav.classList.add('is-open');
    navToggle.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Cerrar menú');
  };

  navToggle.addEventListener('click', () => {
    nav.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  // Cerrar el menú con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu();
  });

  // Cerrar el menú al tocar fuera de él
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
  });


  /* ------------------------------------------------------------------
     3) SCROLL SUAVE + cerrar menú al elegir una sección
     (El salto suave también está en CSS; aquí cerramos el menú móvil)
     ------------------------------------------------------------------ */
  navLinks.forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });
  // También cerramos el menú al usar enlaces del footer o del logo
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });


  /* ------------------------------------------------------------------
     4) SCROLL-SPY: resalta el enlace de la sección visible
     ------------------------------------------------------------------ */
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  // Mapa id -> enlace del menú (solo para las secciones que están en el menú)
  const linkById = {};
  navLinks.forEach(l => { linkById[l.getAttribute('href').slice(1)] = l; });

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const link = linkById[entry.target.id];
      if (!link) return; // sección sin enlace en el menú: mantenemos el último activo
      navLinks.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  }, {
    // se considera "activa" cuando la sección cruza el tercio superior
    rootMargin: '-45% 0px -50% 0px',
    threshold: 0,
  });
  sections.forEach(s => spy.observe(s));


  /* ------------------------------------------------------------------
     5) ANIMACIONES DE APARICIÓN (fade-in / slide-up)
     ------------------------------------------------------------------ */
  const revealEls = Array.from(document.querySelectorAll('.reveal'));

  if (reduceMotion) {
    // Si el usuario pidió menos movimiento, mostramos todo de inmediato
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // anima una sola vez
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    revealEls.forEach(el => revealObs.observe(el));
  }


  /* ------------------------------------------------------------------
     6) BARRAS DE IDIOMAS: se llenan al entrar en pantalla
     ------------------------------------------------------------------ */
  const bars = Array.from(document.querySelectorAll('.bar__fill'));
  const fillBar = (bar) => {
    const level = Math.max(0, Math.min(100, parseInt(bar.dataset.level, 10) || 0));
    bar.style.width = level + '%';
  };

  if (reduceMotion) {
    bars.forEach(fillBar);
  } else {
    const barObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fillBar(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => barObs.observe(b));
  }


  /* ------------------------------------------------------------------
     7) BOTÓN VOLVER ARRIBA
     ------------------------------------------------------------------ */
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });


  /* ------------------------------------------------------------------
     8) FORMULARIO DE CONTACTO: validación + envío por mailto
     ------------------------------------------------------------------ */
  const EMAIL_DESTINO = 'jampierdev@gmail.com';
  const nombre  = document.getElementById('nombre');
  const email   = document.getElementById('email');
  const mensaje = document.getElementById('mensaje');
  const submit  = document.getElementById('formSubmit');
  const note     = document.getElementById('formNote');

  const setError = (input, hasError) => {
    input.closest('.field').classList.toggle('has-error', hasError);
  };

  const validarEmail = (valor) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());

  // Quita el error en cuanto el usuario corrige el campo
  [nombre, email, mensaje].forEach(input => {
    input.addEventListener('input', () => setError(input, false));
  });

  submit.addEventListener('click', () => {
    const okNombre  = nombre.value.trim().length >= 2;
    const okEmail   = validarEmail(email.value);
    const okMensaje = mensaje.value.trim().length >= 10;

    setError(nombre,  !okNombre);
    setError(email,   !okEmail);
    setError(mensaje, !okMensaje);

    // Enfoca el primer campo con error
    if (!okNombre)      { nombre.focus();  return; }
    if (!okEmail)       { email.focus();   return; }
    if (!okMensaje)     { mensaje.focus(); return; }

    // Todo correcto: preparamos el correo con mailto:
    const asunto = encodeURIComponent('Contacto desde la hoja de vida — ' + nombre.value.trim());
    const cuerpo = encodeURIComponent(
      'Nombre: ' + nombre.value.trim() + '\n' +
      'Correo: ' + email.value.trim()  + '\n\n' +
      mensaje.value.trim()
    );

    // Mostramos el aviso de éxito y abrimos el cliente de correo
    note.classList.add('is-visible');
    window.location.href = `mailto:${EMAIL_DESTINO}?subject=${asunto}&body=${cuerpo}`;

    // Limpiamos el formulario tras un instante
    setTimeout(() => {
      nombre.value = ''; email.value = ''; mensaje.value = '';
    }, 600);
    setTimeout(() => note.classList.remove('is-visible'), 6000);
  });


  /* ------------------------------------------------------------------
     9) DESCARGAR CV (PDF)
     Abre el diálogo de impresión del navegador. Con la hoja de estilo
     de impresión (@media print en styles.css) la página se convierte en
     un CV claro y ordenado; el usuario elige "Guardar como PDF".
     ------------------------------------------------------------------ */
  const btnCv = document.getElementById('downloadCv');
  if (btnCv) {
    btnCv.addEventListener('click', () => {
      closeMenu();
      window.print();
    });
  }

});
