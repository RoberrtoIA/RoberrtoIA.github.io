/////////////////////////////////////////////////
//Funcion encargada de recibir el evento de click
function generarCategorias(event){
  const button = event.target;
  guardarCategoria(button.textContent.trim());
  window.location="catalogo.html";
}
function generarCategoriasSinLoad(event){
  const button = event.target;
  guardarCategoria(button.textContent);
  generacionCa();
}

///////////////////////////////////
//Logica para pintar carrito
function PintarCarrito() {
  let listaL = leerObjeto();
  let cesta = document.querySelector("#cesta");
  if(listaL !== null){
    cesta.classList.remove("text-dark");
    cesta.classList.add("text-primary");
  }else{
    cesta.classList.remove("text-primary");
    cesta.classList.add("text-dark");
  }
}
//Fin de logica para pintar carrito
///////////////////////////////////

////////////////////////////
//Inicio de constructores//
//////////////////////////
//Constructor de vista index
function index() {
  let categorias = document.querySelectorAll('.dropdown-item');
  
  categorias.forEach(btn =>{
    btn.addEventListener('click',generarCategorias);
  });

  let btnDestacado = document.querySelectorAll('.btnDestacado');
  
  btnDestacado.forEach(btn =>{
    btn.addEventListener('click',generarCategorias);
  });

  let carrito = document.querySelectorAll('.agregarCarrito');

  carrito.forEach(btn =>{
    btn.addEventListener('click',addEncarritoObjeto);
  });
  PintarCarrito();  
}

//Constructor de vista catalogo
function catalogo() {
  let categorias = document.querySelectorAll('.dropdown-item');
  
  categorias.forEach(btn =>{
    btn.addEventListener('click',generarCategorias);
  });

  PintarCarrito();  
}

//Constructor de vista compra
function compra() {
  let categorias = document.querySelectorAll('.dropdown-item');
  categorias.forEach(btn =>{
    btn.addEventListener('click',generarCategorias);
  });

  
  let btnVaciarCesta = document.querySelector("#btnVaciarCesta");
  btnVaciarCesta.addEventListener('click',()=>{
    localStorage.clear();
    generacionEC();
  });

  let btnPagar = document.querySelector("#btnPagar");
  btnPagar.addEventListener('click',()=>{
    alert("Su pedido esta en camino");
    localStorage.clear();
    location.reload();
  });
  generacionEC();
  PintarCarrito();  
}

//Constructor de vista sobrenosotros
function sobreNosotros() {
  let categorias = document.querySelectorAll('.dropdown-item');
  
  categorias.forEach(btn =>{
    btn.addEventListener('click',generarCategorias);
  });
  PintarCarrito();  
}
////////////////////////////
//Fin de constructores/////
//////////////////////////

//Funcion encargada de decidir a que pagina web ira nuestro constructor
function pagOnload(pagActual){
  if(pagActual==='index.html'){
    guardarCategoria("Queso");
    index();
  }else if(pagActual==='catalogo.html'){
    window.onload = generacionCa;
    catalogo();
  }else if(pagActual==='Compra.html'){
    window.onload = generacionEC;
    compra();
  }else if(pagActual==='sobreNosotros.html'){
    sobreNosotros();
  }
}

//Funcion para saber el nombre de la pagina actual
function filename(){
  var rutaAbsoluta = self.location.href;   
  var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
  var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
  return rutaRelativa;  
}

///////////////////////////
///INICIO INICIALIZADOR////
///////////////////////////

//Cargamos la pagina para saber que constructor utilizar
pagOnload(filename());

/////////////////////////
///FIN INICIALIZADOR////
/////////////////////////

function generarArticulos(event){
  let button = event.target;
  guardarCategoria(button.textContent);
  window.location="Compra.html";
}

function generacionEC(){
  let contenedor = document.getElementById("colArticulosCarretilla");
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild); 
  } 
  let alArticulos = leerObjeto();
  let rutaImg = "";
  alArticulos.forEach(elemento=>{
    if(elemento.titulo.includes("Yogurt")){
      rutaImg = "assets/img/pexels-daria-shevtsova-704971.jpg";
    }else if(elemento.titulo.includes("Leche")){
      rutaImg = "assets/img/pexels-fa-romero-photography-1675976.jpg";
    }else{
      rutaImg = "assets/img/pexels-alexy-almond-3758144.jpg";
    }

    const elementsTitle = contenedor.getElementsByClassName(
      'shoppingCartItemTitle'
    );
    

    let contenido = document.createElement("div");
    contenido.className = "row shoppingCartItem";
    contenido.innerHTML =`<div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <img src=${rutaImg} class="shopping-cart-image">
            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${elemento.titulo}</h6>
        </div>
    </div>
    <div class="col-2">
        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-price mb-0 shoppingCartItemPrice">${elemento.precio}</p>
        </div>
    </div>
    <div class="col-4">
        <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                value="${elemento.cantidad}">
            <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
    </div>`;
    contenedor.appendChild(contenido);

    contenido
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

    contenido
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);
  });
    total();
}

function total(){
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('€', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
}

//Funcion encargada de generar las categorias
function generacionCa(){
  let contenedor = document.getElementById("colResultadosC");
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild); 
  }
  let contenido = document.createElement("div");
  contenido.className = "row"; 
  let categoriaSeleccionada = leerObjetoCategoria();
  contenido.innerHTML = `<div class="col">
    <h1 id="TituloCatalogo" class="py-5 text-center" style="color: rgb(255,196,72);">${categoriaSeleccionada}</h1>
      </div>`;
      let rutaImg = "";
      if(categoriaSeleccionada==="Yogurt"){
        rutaImg = "assets/img/pexels-daria-shevtsova-704971.jpg";
      }else if(categoriaSeleccionada==="Leche"){
        rutaImg = "assets/img/pexels-fa-romero-photography-1675976.jpg";
      }else{
        rutaImg = "assets/img/pexels-alexy-almond-3758144.jpg";
      }
  contenedor.appendChild(contenido);
  let acumulador = 0;
  for (let i = 0; i < 4; i++) {
    let card = document.createElement("div");
    card.className ="row"; 
    for (let j = 1; j < 4; j++) {
      acumulador++; 
      if(j===3){
        card.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4 text-center my-2">
        <div class="card border rounded shadow"><img class="rounded img-fluid card-img-top w-100 d-block" src="${rutaImg}" />
            <div class="card-image"></div>
            <div class="card-body"><i class="fa fa-star text-primary"></i><i class="fa fa-star text-primary"></i><i class="fa fa-star text-primary"></i><i class="fa fa-star text-primary"></i><i class="fa fa-star text-primary"></i>
                <h6 class="card-title">${categoriaSeleccionada+acumulador}<br /></h6><span class="card-price font-weight-bold">$8.00</span><button class="btn card-btn btn-fillA ml-4 agregarCarrito" type="button"><i class="fas fa-shopping-bag"></i></button></div>
        </div>
    </div>`;
      }else{
        card.innerHTML += `<div class="col-sm-12 col-md-6 col-lg-4 text-center my-2">
        <div class="card border rounded shadow"><img class="rounded img-fluid card-img-top w-100 d-block" src="${rutaImg}" />
            <div class="card-image"></div>
            <div class="card-body"><i class="fa fa-star text-primary"></i><i class="fa fa-star text-primary"></i><i class="fa fa-star text-primary"></i><i class="fa fa-star text-primary"></i><i class="fa fa-star text-primary"></i>
                <h6 class="card-title">${categoriaSeleccionada+acumulador}<br /></h6><span class="card-price font-weight-bold">$8.00</span><button class="btn card-btn btn-fillA ml-4 agregarCarrito" type="button"><i class="fas fa-shopping-bag"></i></button></div>
        </div>
    </div>`;
      }
    }
    contenedor.appendChild(card);
    let btnCatalogo = document.querySelectorAll('.btnCatalogo');
  
  btnCatalogo.forEach(btn =>{
    btn.addEventListener('click',generarCategoriasSinLoad);
  });
  let carrito = document.querySelectorAll('.agregarCarrito');

  carrito.forEach(btn =>{
    btn.addEventListener('click',addEncarritoObjeto);
  });
  }
}
//




///////////////////////////////////
//Logica de add a carrito

//Clase articulo
class Articulo{
  constructor(titulo,precio,imagen,cantidad){
    this.titulo = titulo;
    this.precio = precio;
    this.imagen = imagen;
    this.cantidad = cantidad;
  }
}

function addEncarritoObjeto(event){
  const button = event.target;
  const card = button.closest(".card");
  const titulo = card.querySelector(".card-title").textContent;
  const precio = card.querySelector(".card-price").textContent.slice(1);
  const imagen = card.querySelector(".card-image").src;

  const articulo = new Articulo(titulo,precio,imagen,1);
  let listaL = leerObjeto();

  if(listaL === null){
    let lista = [articulo];
    guardarArticulo(lista);
  }else{
      let bandera = false;
      listaL.forEach((elemento, indice, array)=>{
        if (elemento.titulo === articulo.titulo) {
          bandera = true;
        }
      });
      if(bandera === true){
        let listaN = [];
        listaL.forEach((elemento, indice, array)=>{
          if (elemento.titulo === articulo.titulo) {
            articulo.cantidad = (elemento.cantidad +1);
            listaN.push(articulo);
          }else{
            listaN.push(elemento);
          }
        });
        guardarArticulo(listaN);
      }else{
        listaL.push(articulo);
        guardarArticulo(listaL);
      }
  }
  alert(articulo.titulo+" agregado con exito al carrito");
}

//Fin de logica de add a carrito
///////////////////////////////////

//Lee la lista almacenada en el storage local
function leerObjeto(){
  let listaJS = JSON.parse(localStorage.getItem("lista"));
  return listaJS;
}

//Lee la lista almacenada en el storage local
function leerObjetoCategoria(){
  let categoria = JSON.parse(localStorage.getItem("categoria"));
  return categoria;
}

//Guarda la lista en el storage local
function guardarArticulo(listaP){
  var jsonArticulo = JSON.stringify(listaP);
  localStorage.setItem("lista", jsonArticulo);
}

//Guarda la parametro categoria en el storage local
function guardarCategoria(categoria){
  var jsonCategoria = JSON.stringify(categoria);
  localStorage.setItem("categoria", jsonCategoria);
}

function removeShoppingCartItem(event) {
  const button = event.target;
  let listaL = leerObjeto();
  const title = button.closest(".shoppingCartItem").querySelector(".shoppingCartItemTitle").textContent;
  let listaN = [];
  listaL.forEach((lista )=>{
    if(title !== lista.titulo){
      listaN.push(lista);
    }
  });
  guardarArticulo(listaN);
  button.closest('.shoppingCartItem').remove();
  total();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  total();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  total();
}
