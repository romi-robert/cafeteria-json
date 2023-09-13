document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencias a los elementos del formulario y la sección de comentarios
  const form = document.querySelector('.form');
  const nameInput = form.querySelector('input[type="text"]');
  const commentInput = form.querySelector('textarea');
  const commentsSection = document.getElementById('comentarios');
  let commentRatings = {};

  // Función para obtener estrellas basadas en la puntuación
  function obtenerEstrellas(puntuacion) {
      const estrellas = '★'.repeat(puntuacion);
      const estrellasVacias = '☆'.repeat(5 - puntuacion);
      const estrellasHTML = `<span style="color: orange">${estrellas}</span><span>${estrellasVacias}</span>`;
      return estrellasHTML;
  }

  // Manejar el evento de envío del formulario
  form.addEventListener('submit', function (e) {
      e.preventDefault(); // Evitar el envío del formulario predeterminado

      // Obtener el valor de los campos de entrada
      const nombre = nameInput.value;
      const comentario = commentInput.value;

      // Crear un nuevo elemento de comentario
      const newComment = document.createElement('div');
      newComment.classList.add('comment');
      const puntuacion = commentRatings[commentRatings.length - 1];
      newComment.innerHTML = `<strong>${nombre}</strong> (<strong>Puntuación:</strong> ${obtenerEstrellas(puntuacion)})<br>${comentario}`;

      // Agregar el comentario a la sección de comentarios
      commentsSection.appendChild(newComment);

      // Limpiar los campos de entrada
      nameInput.value = '';
      commentInput.value = '';
  });

  // Hacer una solicitud fetch para cargar los datos del menú desde el archivo JSON
  fetch('cafeteria.json')
      .then(response => response.json())
      .then(data => {
          const menuName = data.Name;
          const menuDescription = data.Description;

          const menuNameElement = document.createElement('h1');
          menuNameElement.textContent = menuName;

          const menuDescriptionElement = document.createElement('p');
          menuDescriptionElement.textContent = menuDescription;

          const divMenu = document.getElementById('menu');
          divMenu.appendChild(menuNameElement);
          divMenu.appendChild(menuDescriptionElement);

          const foodItems = data.food_items;
          foodItems.forEach(item => {
              const itemName = item.Name;
              const itemDescription = item.description;
              const itemPrice = item.price;
              const itemImage = item.image;

              const itemContainer = document.createElement('div');
              itemContainer.classList.add('menu-item');

              const itemImageElement = document.createElement('img');
              itemImageElement.src = itemImage;

              const itemNameElement = document.createElement('h2');
              itemNameElement.textContent = itemName;

              const itemDescriptionElement = document.createElement('p');
              itemDescriptionElement.textContent = itemDescription;

              const itemPriceElement = document.createElement('p');
              itemPriceElement.textContent = `Precio: $${itemPrice}`;

              itemContainer.appendChild(itemImageElement);
              itemContainer.appendChild(itemNameElement);
              itemContainer.appendChild(itemDescriptionElement);
              itemContainer.appendChild(itemPriceElement);

              divMenu.appendChild(itemContainer);
          });
      })
      .catch(error => {
          console.error('Error al obtener los datos del menú:', error);
      });

  // Hacer una solicitud fetch para cargar los comentarios desde el archivo JSON
  fetch('cafeteria.json')
      .then(response => response.json())
      .then(data => {
          const comentarios = data.Comentarios;

          comentarios.forEach(comment => {
              const newComment = document.createElement('div');
              newComment.classList.add('comment');
              const puntuacion = comment.Puntuacion;

              newComment.innerHTML = `<strong>${comment.Usuario}:</strong><br>${comment.Comentario}<br><strong>Puntuación:</strong> ${obtenerEstrellas(puntuacion)}`;

              commentsSection.appendChild(newComment);
          });
      })
      .catch(error => {
          console.error('Error al cargar los comentarios:', error);
      });

      function enviarComentario() {
        // Obtener los valores del nombre, comentario y puntuación
        const nombre = document.getElementById("userInput").value;
        const comentario = document.getElementById("userComment").value;
        const puntuacion = document.querySelector('input[name="rating"]:checked').value;
    
        // Crear un nuevo elemento para mostrar el comentario en la página
        const nuevoComentario = document.createElement("div");
        nuevoComentario.classList.add("comment");
        nuevoComentario.innerHTML = `
        <strong>${nombre}:</strong><br>${comentario}<br><strong>Puntuación:</strong> ${obtenerEstrellas(puntuacion)}`;
    
        // Agregar el nuevo comentario al área de comentarios en la página
        const comentariosSection = document.getElementById("comentarios");
        comentariosSection.appendChild(nuevoComentario);
    
        // Limpiar los campos del formulario después de enviar el comentario
        document.getElementById("userInput").value = "";
        document.getElementById("userComment").value = "";
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        ratingInputs.forEach(input => (input.checked = false));
    }
    
    // Agregar un evento de clic al botón "Enviar comentario"
    const comentarBtn = document.getElementById("comentarBTN");
    comentarBtn.addEventListener("click", enviarComentario);
});