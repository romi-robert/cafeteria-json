document.addEventListener("DOMContentLoaded", function(){
const divMenu = document.getElementById('menu');

fetch('cafeteria.json') // Reemplaza 'ruta/al/json.json' con la ruta real de tu archivo JSON
  .then(response => response.json())
  .then(data => {
    const menuName = data.Name;
    const menuDescription = data.Description;

    const menuNameElement = document.createElement('h1');
    menuNameElement.textContent = menuName;

    const menuDescriptionElement = document.createElement('p');
    menuDescriptionElement.textContent = menuDescription;

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
    console.error('Error al obtener los datos:', error);
  });


// Obtener la sección de comentarios en el DOM
const comentariosSection = document.getElementById('comentarios');

// Hacer una solicitud fetch para cargar los comentarios desde el archivo JSON
fetch('cafeteria.json')
  .then(response => response.json())
  .then(data => {
    // Acceder a la lista de comentarios en el JSON
    const comentarios = data.Comentarios;

    // Recorrer los comentarios y agregarlos al DOM
    comentarios.forEach(comment => {
      // Crear un nuevo elemento de comentario
      const newComment = document.createElement('div');
      newComment.classList.add('comment');

      // Agregar el contenido del comentario al nuevo elemento
      newComment.innerHTML = `<strong>${comment.Usuario}</strong>: ${comment.Comentario}`;

      // Agregar el nuevo comentario a la sección de comentarios en el DOM
      commentsSection.appendChild(newComment);
    });
  })
  .catch(error => {
    console.error('Error al cargar los comentarios:', error);
  });


  // Obtener referencias a los elementos del formulario y la sección de comentarios
const form = document.querySelector('.form');
const nameInput = document.querySelector('input[type="text"]');
const commentInput = document.querySelector('textarea');
const commentsSection = document.getElementById('comentarios');
const commentRatings = {};
const stars = document.querySelectorAll('.rating i');

// Manejar clic en las estrellas para calificar
stars.forEach(star => {
  star.addEventListener('click', () => {
    const ratingValue = star.getAttribute('data-rating');
    star.classList.toggle('selected');
    star.previousElementSibling && star.previousElementSibling.classList.remove('selected');
    star.nextElementSibling && star.nextElementSibling.classList.remove('selected');

    // Almacenar la calificación en el objeto de calificaciones
    const commentId = star.closest('.comment').id;
    commentRatings[commentId] = parseInt(ratingValue);
  });
});

// Manejar el evento de envío del formulario
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Evitar el envío del formulario predeterminado

  // Obtener el valor de los campos de entrada
  const nombre = nameInput.value;
  const comentario = commentInput.value;

  if (Object.keys(commentRatings).length === 0) {
    alert('Por favor, selecciona una calificación antes de enviar el comentario.');
    return;
  }

  // Generar un ID único para el comentario
  const commentId = Date.now();

  // Crear un nuevo elemento de comentario
  const newComment = document.createElement('div');
  newComment.classList.add('comment');
  newComment.id = commentId; // Asignar un ID único al comentario

  const ratingValue = commentRatings[Object.keys(commentRatings)[0]];

  newComment.innerHTML = `<strong>${nombre}</strong> (Rating: ${ratingValue})<br>${comentario}`;

  // Agregar el comentario a la sección de comentarios
  commentsSection.appendChild(newComment);

  // Limpiar los campos de entrada
  nameInput.value = '';
  commentInput.value = '';
  stars.forEach(star => star.classList.remove('selected'));
  commentRatings = {}; // Limpiar las calificaciones después de enviar el comentario
  })
});
