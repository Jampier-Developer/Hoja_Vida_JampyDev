<div align="center">

# Hoja de Vida — Jehanpier Antonio Estrada Cabarcas

**Técnico en Sistemas** · Cartagena de Indias, Bolívar 🇨🇴

Página web de currículum personal de una sola página, con estética **dark premium
y acento dorado**. Rápida, responsive y sin dependencias.

`HTML5` · `CSS3` · `JavaScript (vanilla)` · `Sin build` · `GitHub Pages`

</div>

---

## ✦ Descripción

Hoja de vida digital tipo *one-page* (scroll vertical) pensada para presentarse
ante empleadores. Diseño oscuro, elegante y sobrio, con un dorado como acento de
marca y un **rombo dorado** como firma visual recurrente. Todo el contenido es
real y está listo para publicarse.

## ✦ Características

- 🎯 **Una sola página** con navegación de scroll suave entre secciones.
- 🌙 **Estética dark + dorada** definida por variables CSS fáciles de editar.
- 📱 **100% responsive** (celular, tablet y computador) con menú hamburguesa en móvil.
- ✨ **Animaciones de aparición** al hacer scroll y barras de nivel animadas (idiomas).
- 🧭 **Menú activo** que resalta la sección visible (scroll-spy).
- 📨 **Formulario de contacto** con validación en JavaScript que abre el correo (`mailto:`).
- 💬 **Acceso directo a WhatsApp** como canal principal de contacto.
- 🖨️ **Descargar CV en PDF** desde el navegador: el botón abre el diálogo de impresión
  y la página se transforma en una hoja clara y ordenada gracias a `@media print`.
- ♿ **Accesible**: HTML semántico, buen contraste, foco visible, `alt` en imágenes,
  área táctil de 48px, inputs a 16px (sin zoom en iOS) y soporte de `prefers-reduced-motion`.
- ⚡ **Sin dependencias ni paso de compilación**: lo que ves es lo que se publica.

## ✦ Tecnologías

| Capa        | Herramienta                                   |
| ----------- | --------------------------------------------- |
| Estructura  | HTML5 semántico                               |
| Estilos     | CSS3 (variables, grid, flexbox, `@media print`) |
| Interacción | JavaScript puro (IntersectionObserver, etc.)  |
| Tipografías | Google Fonts — Sora · Hanken Grotesk · JetBrains Mono |
| Hosting     | GitHub Pages (sitio estático)                 |

## ✦ Estructura del proyecto

```
hoja-de-vida-jehanpier/
├── index.html      # Marcado y contenido del CV
├── styles.css      # Estilos + tokens en :root + CV imprimible
├── script.js       # Menú, animaciones, validación, scroll-spy
├── img/
│   └── perfil.jpg  # Foto de perfil (retrato vertical 3:4)
├── CLAUDE.md       # Contexto del proyecto para Claude Code
└── README.md       # Este archivo
```

## ✦ Cómo verla en local

Opción rápida — abre `index.html` con doble clic.

O sírvela con un servidor local (recomendado para que todo cargue igual que en producción):

```bash
# Python 3
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## ✦ Publicar en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub:
   ```bash
   git init
   git add .
   git commit -m "Hoja de vida web"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Branch: `main` / carpeta `/root` → Save**.
3. En un par de minutos estará disponible en
   `https://<tu-usuario>.github.io/<tu-repo>/`.

## ✦ Personalización

- **Cambiar la foto:** reemplaza `img/perfil.jpg` por tu retrato vertical (ideal 3:4).
  No necesitas tocar el HTML.
- **Cambiar colores:** edita las variables al inicio de `styles.css`, en `:root`.
  Por ejemplo, `--gold` controla el dorado de toda la página.
- **Cambiar textos:** todo el contenido está en `index.html`, claramente comentado.
- **PDF propio:** el botón usa la impresión del navegador (*Guardar como PDF*).
  Si prefieres enlazar tu propio archivo, cambia el botón por
  `<a href="cv.pdf" download>` y coloca el PDF en la raíz.

## ✦ Contacto

- 📞 318 386 6119
- 💬 [WhatsApp](https://wa.me/573183866119)
- ✉️ jampierdev@gmail.com
- 📍 Cartagena de Indias, Bolívar — Barrio 20 de Julio

---

<div align="center">

© 2026 Jehanpier Antonio Estrada Cabarcas · Técnico en Sistemas

</div>
