// Obtenemos el id="typewriter"
let app = document.getElementById('typewriter');

// con la libreria de typewriter simulamos un efecto maquina de escribir con el texto de typeString
let typewriter = new Typewriter(app, {
  loop: true,
  delay: 75,
});
 
typewriter
  .pauseFor(2500)
  .typeString('Desarrollador Web Y Programador Jr')
  .pauseFor(200)
  .deleteChars(10)
  .start();

// Obtenemos el id del correo y agregamos el evento click con su funcion
let correo = document.getElementById('correo')
correo.addEventListener("click", Correo)

// Creamos una funcion para cuando le damos click al icono de correo del footer html  
function Correo() {
  Swal.fire({
    title: 'Gracias por interesarte en mi trabajo :)',
    html: `<div class="msj_footer"><p id="msj-correo">geovascg15@gmail.com</p><button id="btn-copy" onclick="Msj()"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
    </svg></button></div>`,
    text: 'hola',
    imageUrl: 'https://www.pngmart.com/files/12/Happy-Emoji-PNG-Clipart.png',
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: 'Custom image',
  })
}  

// Funcion que se lanza al darle click al icono de copiar
function Msj() {
  // Obtenemos el id y copiamos el texto del parrafo con id="msj-correo"
  let msj = document.getElementById('msj-correo');
  navigator.clipboard.writeText(msj.textContent);

  // obtenemos el elemento button con el id btn-copy y replazamos el icono al darle click con el parametro onclick="Msj()"
  let boton = document.getElementById('btn-copy');
  boton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
  </svg>`;
}