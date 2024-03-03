/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector('#app');


appNode.addEventListener("click", (event) => {
    if (event.target.nodeName === "h2") {
        window.alert("hola");

    }

})

//vamos a usar una API de internacionalizacion para ajustar fechas y monedas correspondientes al pais requerido
const formatPrice = (price) => {

   const newPrice = new window.Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD",


    }).format(price)


    return newPrice
    
}

//conectarnos al servidor
//aca lo realizamos con promesas pero se puede hacer con ASYNC/AWAY

window
  .fetch(`${baseUrl}/api/avo`)

  //procesar la respuesta y convertirlo en JSON

  .then((respuesta) => respuesta.json())

  // renderizar la informacion
    .then((respondeJson) => {
        const todosLosItems = []; // previamente creo esta variable con este array vacio y en cada iteracion del forEach voy agregando un elemento del array
        respondeJson.data.forEach((item) => {
            //CREAR IMAGEN

            const imagen = document.createElement("img");
            imagen.classList.add('h-16', 'w-16', 'md:h-24', 'md:w-24', 'rounded-full', 'mx-auto','md:mx-0','md:mr-6')
            imagen.src = `${baseUrl}${item.image}`;

            //CREAR TITULO

            const title = document.createElement("h2");
            title.className = "text-lg";
            title.textContent = item.name;
        

            //CREAR PRECIO

            const price = document.createElement("div");
            // price.classList.add('text-center', 'md:text-left')
            price.className = "text-gray-600";
            price.textContent = formatPrice(item.price);

            const priceAndTitle = document.createElement("div");
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price);

            const card = document.createElement("div");
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            card.appendChild(imagen);
            card.appendChild(priceAndTitle);
        
            // const container = document.createElement('div');
           
       // container.append(imagen, title, price);  // append se usa porque estoy agregando de una los tres items, si fuera de a uno seria appendChild
        todosLosItems.push(card); 
        
        
        
    });
    
    //aca es donde agrego los elementos al dom, los coloco dentro de un div llamado container, los elementos despues de la iteracion
        appNode.append(...todosLosItems);
        
        
    });
  
     const container = document.getElementById('container');

        container.addEventListener('click', (event) => {
            console.log('Clicked element tag name:', event.target.tagName);
        });
        
