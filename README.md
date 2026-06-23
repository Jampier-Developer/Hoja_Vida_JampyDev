<div align="center">

# Hoja de Vida — Jehanpier Antonio Estrada Cabarcas

**Técnico en Sistemas** · Cartagena de Indias, Bolívar 🇨🇴

Página web de currículum personal de una sola página, con estética **dark premium
y acento dorado**. Rápida, responsive y sin dependencias.

`HTML5` · `CSS3` · `JavaScript (vanilla)` · `EmailJS` · `GitHub Pages`

</div>

---

## ✦ Descripción

Hoja de vida digital tipo *one-page* (scroll vertical) pensada para presentarse
ante empleadores. Diseño oscuro, elegante y sobrio, con dorado como acento de
marca y un **rombo dorado** como firma visual recurrente. Todo el contenido es
real y está listo para publicarse.

## ✦ Características

- 🎯 **Una sola página** con navegación de scroll suave entre secciones.
- 🌙 **Estética dark + dorada** definida por variables CSS fáciles de editar.
- 📱 **100% responsive** — desde iPhone SE hasta pantallas 4K, con soporte landscape.
- ✨ **Animaciones de aparición** al hacer scroll y barras de nivel animadas (idiomas).
- 🧭 **Menú activo** que resalta la sección visible (scroll-spy).
- 📥 **Descargar CV en PDF**: botón con modal de confirmación que descarga el PDF real.
- 📨 **Formulario de contacto** con envío real a Gmail vía EmailJS (sin backend). Modal de carga con spinner dorado → éxito o error. Detecta correos duplicados.
- 💬 **Acceso directo a WhatsApp** como canal principal de contacto.
- 🗺️ **Ubicación** enlaza directo a Google Maps.
- 🔗 **Todos los links** abren en pestaña nueva.
- ♿ **Accesible**: HTML semántico, contraste adecuado, foco visible, `alt` en imágenes, área táctil 48px, inputs 16px (sin zoom en iOS), `prefers-reduced-motion`.
- ⚡ **Sin dependencias ni build**: lo que ves es lo que se publica.

## ✦ Tecnologías

| Capa        | Herramienta                                              |
| ----------- | -------------------------------------------------------- |
| Estructura  | HTML5 semántico                                          |
| Estilos     | CSS3 (variables, grid, flexbox, clamp, `@media print`)   |
| Interacción | JavaScript puro (IntersectionObserver, modales, EmailJS) |
| Correo      | EmailJS (CDN) — envío directo a Gmail sin backend        |
| Tipografías | Google Fonts — Sora · Hanken Grotesk · JetBrains Mono   |
| Hosting     | GitHub Pages (sitio estático)                            |

## ✦ Estructura del proyecto

```
Hoja_Vida_JampyDev/
├── index.html                   # Marcado y contenido del CV
├── README.md                    # Este archivo
├── .gitignore
├── css/
│   └── styles.css               # Estilos + tokens en :root + @media print
├── js/
│   └── script.js                # Menú, animaciones, modales, formulario
├── img/
│   └── Foto-Jehanpier.jpg       # Foto de perfil (retrato vertical 3:4)
└── pdf/
    └── CV-Jehanpier-Estrada.pdf # CV en PDF (se descarga con el botón)
```

## ✦ Cómo verla en local

Abre `index.html` con doble clic, o sírvela con un servidor local:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## ✦ Publicar en GitHub Pages

1. El repositorio ya está conectado en GitHub.
2. Ve a **Settings → Pages → Branch: `main` / carpeta `/root` → Save**.
3. En unos minutos estará disponible en:
   `https://jampier-developer.github.io/Hoja_Vida_JampyDev/`

## ✦ Contacto

- 📞 318 386 6119
- 💬 [WhatsApp](https://wa.me/573183866119)
- ✉️ jampierdev@gmail.com
- 📍 Cartagena de Indias, Bolívar — Barrio 20 de Julio

---

<div align="center">

© 2026 Jehanpier Antonio Estrada Cabarcas · Técnico en Sistemas

</div>
