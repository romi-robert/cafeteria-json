function mostrarCampoTexto() {
    var checkBox = document.getElementById("respuestaSi");
    var campoTexto = document.getElementById("campoTexto");
    var datoAdicional = document.getElementById("datoAdicional");
  
    if (checkBox.checked) {
      campoTexto.style.display = "block";
      datoAdicional.placeholder = "Número de RUT";
    } else {
      campoTexto.style.display = "none";
      datoAdicional.placeholder = "CONSUMIDOR FINAL";
    }
  }
  

  document.addEventListener("DOMContentLoaded", function() {
    mostrarCampoTexto();
  
    var nombreInput = document.querySelector('input[placeholder="Nombre completo"]');
    if (nombreInput) {
      var nombreGuardado = localStorage.getItem("nombre");
      if (nombreGuardado) {
        nombreInput.value = nombreGuardado;
      }
    }
  
    var formulario = document.querySelector('form');
    if (formulario) {
      formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        almacenarNombre();
      });
    }
  });