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
});
