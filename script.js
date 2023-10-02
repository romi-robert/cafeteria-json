document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.form');
    const nameInput = form.querySelector('input[type="text"]');
    const commentInput = form.querySelector('textarea');
    const commentsSection = document.getElementById('comentarios');
    let commentRatings = {};
  
    function obtenerEstrellas(puntuacion) {
      const estrellas = '★'.repeat(puntuacion);
      const estrellasVacias = '☆'.repeat(5 - puntuacion);
      return `<span style="color: orange">${estrellas}</span><span>${estrellasVacias}</span>`;
    }
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = nameInput.value;
      const comentario = commentInput.value;
      const puntuacion = commentRatings[commentRatings.length - 1];
  
      const newComment = document.createElement('div');
      newComment.classList.add('comment');
      newComment.innerHTML = `<strong>${nombre}</strong> (<strong>Puntuación:</strong> ${obtenerEstrellas(puntuacion)})<br>${comentario}`;
  
      commentsSection.appendChild(newComment);
  
      nameInput.value = '';
      commentInput.value = '';
    });
  
    function mostrarProductosEnCarrito() {
      const listaCarrito = document.getElementById('lista-carrito');
      listaCarrito.innerHTML = '';
  
      carrito.forEach(producto => {
        const item = document.createElement('li');
        item.innerHTML = `
          <img src="${producto.image}" alt="${producto.name}" style="width: 50px; height: 50px;">
          ${producto.name} - $${producto.price}`;
        listaCarrito.appendChild(item);
      });
  
      const total = carrito.reduce((sum, producto) => sum + producto.price, 0);
      document.getElementById('total').innerText = `$${total.toFixed(2)}`;
    }
  
    function comprarProducto(itemContainer) {
      const itemName = itemContainer.querySelector('h2').textContent;
      const itemPrice = parseFloat(itemContainer.querySelector('p').textContent.split(' ')[1].slice(1));
  
      const producto = {
        name: itemName,
        price: itemPrice,
        image: itemContainer.querySelector('img').src
      };
  
      agregarAlCarrito(producto);
    }
  
    fetch('cafeteria.json')
      .then(response => response.json())
      .then(data => {
        const divMenu = document.getElementById('menu');
        divMenu.innerHTML = `
          <h1>${data.Name}</h1>
          <p>${data.Description}</p>`;
  
        const foodItems = data.food_items;
        foodItems.forEach(item => {
          const itemContainer = document.createElement('div');
          itemContainer.classList.add('menu-item');
          itemContainer.innerHTML = `
            <img src="${item.image}" alt="${item.Name}" style="width: 100px; height: 100px;">
            <h2>${item.Name}</h2>
            <p>${item.description}</p>
            <p>Precio: $${item.price}</p>
            <button class="btn-submit">Comprar</button>`;
  
          divMenu.appendChild(itemContainer);
  
          itemContainer.querySelector('button').addEventListener('click', () => {
            comprarProducto(itemContainer);
          });
        });
      })
      .catch(error => {
        console.error('Error al obtener los datos del menú:', error);
      });
  
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
      const nombre = document.getElementById("userInput").value;
      const comentario = document.getElementById("userComment").value;
      const puntuacion = document.querySelector('input[name="rating"]:checked').value;
  
      const nuevoComentario = document.createElement("div");
      nuevoComentario.classList.add("comment");
      nuevoComentario.innerHTML = `<strong>${nombre}:</strong><br>${comentario}<br><strong>Puntuación:</strong> ${obtenerEstrellas(puntuacion)}`;
  
      const comentariosSection = document.getElementById("comentarios");
      comentariosSection.appendChild(nuevoComentario);
  
      document.getElementById("userInput").value = "";
      document.getElementById("userComment").value = "";
      const ratingInputs = document.querySelectorAll('input[name="rating"]');
      ratingInputs.forEach(input => (input.checked = false));
    }
  
    const comentarBtn = document.getElementById("comentarBTN");
    comentarBtn.addEventListener("click", enviarComentario);
  });
  
  let carrito = [];
  
  function cargarProductos() {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    mostrarProductosEnCarrito();
  }
  
  function mostrarProductosEnCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
  
    carrito.forEach(producto => {
      const item = document.createElement('li');
      item.innerHTML = `${producto.name} - $${producto.price}`;
      listaCarrito.appendChild(item);
    });
  
    const total = carrito.reduce((sum, producto) => sum + producto.price, 0);
    document.getElementById('total').innerText = `$${total.toFixed(2)}`;
  }
  
  function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductosEnCarrito();
  }
  