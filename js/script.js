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
     8) FORMULARIO DE CONTACTO — validación + EmailJS + modal de resultado
     ------------------------------------------------------------------ */

  /* ── Credenciales EmailJS ─────────────────────────────────────────────
     Reemplaza estos tres valores con los que obtengas en emailjs.com     */
  const EMAILJS_PUBLIC_KEY  = 'ceRJGF_mdqnRZ9wzN';
  const EMAILJS_SERVICE_ID  = 'gmail_jehanpier';
  const EMAILJS_TEMPLATE_ID = 'template_3tvgk5d';
  /* ───────────────────────────────────────────────────────────────────── */

  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  // Campos del formulario
  const empresa  = document.getElementById('empresa');
  const telefono = document.getElementById('telefono');
  const email    = document.getElementById('email');
  const mensaje  = document.getElementById('mensaje');
  const submit   = document.getElementById('formSubmit');

  // Modal de resultado (submit)
  const submitModal   = document.getElementById('submitModal');
  const sStateLoading = document.getElementById('sStateLoading');
  const sStateSuccess = document.getElementById('sStateSuccess');
  const sStateError   = document.getElementById('sStateError');
  const sModalOk      = document.getElementById('sModalOk');
  const sModalClose   = document.getElementById('sModalClose');
  const sModalErrorMsg = document.getElementById('sModalErrorMsg');

  const setError = (input, hasError) => {
    input.closest('.field').classList.toggle('has-error', hasError);
  };

  const validarEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  // Limpia el error en cuanto el usuario escribe
  [empresa, telefono, email, mensaje].forEach(inp => {
    inp.addEventListener('input', () => setError(inp, false));
  });

  // Abre el modal de envío y muestra el estado indicado
  const showSubmitModal = (state, errorMsg) => {
    [sStateLoading, sStateSuccess, sStateError].forEach(el => el.classList.remove('is-active'));
    if (state === 'loading') sStateLoading.classList.add('is-active');
    if (state === 'success') sStateSuccess.classList.add('is-active');
    if (state === 'error')   sStateError.classList.add('is-active');
    if (errorMsg) sModalErrorMsg.textContent = errorMsg;
    submitModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeSubmitModal = () => {
    submitModal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (sModalOk)    sModalOk.addEventListener('click',    closeSubmitModal);
  if (sModalClose) sModalClose.addEventListener('click', closeSubmitModal);
  submitModal.addEventListener('click', (e) => {
    if (e.target === submitModal) closeSubmitModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && submitModal.classList.contains('is-open')) closeSubmitModal();
  });

  submit.addEventListener('click', () => {
    // Validación de campos
    const okEmpresa  = empresa.value.trim().length >= 2;
    const okTelefono = telefono.value.trim().length >= 7;
    const okEmail    = validarEmail(email.value);
    const okMensaje  = mensaje.value.trim().length >= 10;

    setError(empresa,  !okEmpresa);
    setError(telefono, !okTelefono);
    setError(email,    !okEmail);
    setError(mensaje,  !okMensaje);

    if (!okEmpresa)  { empresa.focus();  return; }
    if (!okTelefono) { telefono.focus(); return; }
    if (!okEmail)    { email.focus();    return; }
    if (!okMensaje)  { mensaje.focus();  return; }

    // Verificar correo duplicado (almacenado en localStorage)
    const emailVal   = email.value.trim().toLowerCase();
    const enviados   = JSON.parse(localStorage.getItem('cv_emails_enviados') || '[]');
    if (enviados.includes(emailVal)) {
      showSubmitModal('error', 'Este correo ya fue utilizado para enviar un mensaje. Por favor usa otro correo para contactarme.');
      return;
    }

    // Mostrar spinner (mínimo 3 segundos)
    showSubmitModal('loading');

    const templateParams = {
      empresa:  empresa.value.trim(),
      telefono: telefono.value.trim(),
      email:    email.value.trim(),
      mensaje:  mensaje.value.trim(),
    };

    Promise.all([
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams),
      new Promise(resolve => setTimeout(resolve, 3000)),
    ])
    .then(() => {
      // Guardar correo para evitar duplicados
      enviados.push(emailVal);
      localStorage.setItem('cv_emails_enviados', JSON.stringify(enviados));
      // Limpiar campos
      empresa.value = ''; telefono.value = ''; email.value = ''; mensaje.value = '';
      showSubmitModal('success');
    })
    .catch(() => {
      showSubmitModal('error', 'No se pudo enviar el mensaje. Revisa tu conexión e intenta de nuevo.');
    });
  });


  /* ------------------------------------------------------------------
     9) MODAL DE DESCARGA DEL CV
     Abre un modal de confirmación; al aceptar descarga el PDF real.
     ------------------------------------------------------------------ */
  const btnCv        = document.getElementById('downloadCv');
  const modalOverlay = document.getElementById('downloadModal');
  const modalClose   = document.getElementById('modalClose');
  const modalCancel  = document.getElementById('modalCancel');
  const modalConfirm = document.getElementById('modalConfirm');

  const openDownloadModal = () => {
    closeMenu();
    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  };

  const closeDownloadModal = () => {
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    btnCv.focus();
  };

  if (btnCv)        btnCv.addEventListener('click',        openDownloadModal);
  if (modalClose)   modalClose.addEventListener('click',   closeDownloadModal);
  if (modalCancel)  modalCancel.addEventListener('click',  closeDownloadModal);

  // Al confirmar: inicia la descarga y cierra el modal con un pequeño delay
  if (modalConfirm) {
    modalConfirm.addEventListener('click', () => {
      setTimeout(closeDownloadModal, 400);
    });
  }

  // Cerrar al hacer clic sobre el fondo oscuro
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeDownloadModal();
    });
  }

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) {
      closeDownloadModal();
    }
  });

});
