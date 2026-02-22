# 🎵 Instrucciones para Agregar Música

Aquí hay varias opciones para obtener música de amor para tu página.

## Opción 1: Descargar de Bensound (Recomendado)

1. Ve a: https://www.bensound.com/royalty-free-music/ambient
2. Busca canciones románticas o emotivas
3. Haz clic en "Download" (versión gratuita)
4. Descargará un archivo en formato MP3
5. Coloca el archivo en la carpeta `assets/audio/`
6. Si no se llama `love-music.mp3`, renómbralo

## Opción 2: Descargar de Pixabay

1. Ve a: https://pixabay.com/music/
2. Busca "romantic" o "love"
3. Haz clic en descargar
4. Coloca el archivo en la carpeta `assets/audio/`
5. Si no se llama `love-music.mp3`, tienes dos opciones:
   - Renómbralo a `love-music.mp3`
   - O abre `index.html` y cambia el nombre del archivo en esta línea:
     ```html
     <source src="assets/audio/TU-ARCHIVO-AQUI.mp3" type="audio/mpeg">
     ```

## Opción 3: Descargar de Freepik Music

1. Ve a: https://www.freepik.com/music
2. Busca "romantic music"
3. Descarga el archivo
4. Sigue los mismos pasos que arriba

## Opción 4: Usar Tu Propia Música

1. Si tienes una canción que quieras usar:
2. Convierte el archivo a MP3 (si no está en ese formato)
3. Coloca el archivo en `assets/audio/`
4. Renómbralo a `love-music.mp3` O modifica `index.html`

## ⚠️ Importante

- El archivo debe ser MP3
- La música debe estar en: `assets/audio/love-music.mp3`
- O cambiar la ruta en `index.html` si usas otro nombre

## ¿Cómo cambiar el nombre del archivo?

Si descargaste un archivo con otro nombre, tienes dos opciones:

### Opción A: Renombrar el archivo
1. Ve a la carpeta `assets/audio/`
2. Click derecho en el archivo
3. "Renombrar"
4. Cambia el nombre a: `love-music.mp3`

### Opción B: Cambiar la ruta en HTML
1. Abre `index.html` con un editor de texto
2. Busca esta línea (alrededor de la línea 10-15):
   ```html
   <source src="assets/audio/love-music.mp3" type="audio/mpeg">
   ```
3. Cambia `love-music.mp3` por el nombre real de tu archivo
4. Guarda el archivo
5. Abre nuevamente en el navegador

## 🎧 Prueba La Página Sin Musik

Si aún no tienes música, puedes probar la página sin problemas. La página funcionará igual, solo sin sonido de fondo. Cuando agregues la música, se reproducirá automáticamente.

## ✅ Verificar que funciona

1. Abre `index.html` en tu navegador
2. Abre la consola (F12)
3. Non debería haber errores en rojo
4. Haz click en el sello
5. En la pestaña "Network" deberías ver que se intenta cargar `love-music.mp3`

¡Listo! 🎵💕
