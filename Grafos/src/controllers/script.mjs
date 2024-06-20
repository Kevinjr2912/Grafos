import Graph from "../models/Graph.mjs";

//Instanciamos un objeto grafo de la clase Graph
let g = new Graph();

//Declaramos variables que hacen referencia al id de botones u otros elementos
let addPlace = document.getElementById("addPlace");
let select1 = document.getElementById('place1');
let select2 = document.getElementById('place2');
let btn_distance = document.getElementById("btn_addDistance");
let btn_show = document.getElementById("btn-show"); 
let body = document.getElementById("body-table");
let contador = 0;
let btn_dijsktra = document.getElementById('btn-showDijsktra');

addPlace.addEventListener("click", () => {
  let place = document.getElementById("place").value.trim();

  if(place == ""){
    alert('No se aceptan campos vacíos');
  }

  else{
    //Creamos un elemento option y su respectivo atributo junto a su valor
    let option1 = document.createElement('option');
    option1.value = place;
    option1.text = place;

    //Creamos un elemento option y su respectivo atributo junto a su valor
    let option2 = document.createElement('option');
    option2.value = place;
    option2.text = place;

    // Agregamos las opciones a los elementos select
    select1.add(option1);
    select2.add(option2);

    g.addV(place);
    alert(`${place} se ha agregado con éxito`);
  }

  document.getElementById("place").value = "";
});

btn_distance.addEventListener("click", () => {
  //Validamos si existen opciones dentro del elemento select
  if(select1.options.length != 0 && select2.options.length != 0){
    //Obtenemos los valores elegidos de cada elementos select
    let selectedPlace1 = select1.options[select1.selectedIndex].value;
    let selectedPlace2 = select2.options[select2.selectedIndex].value;
  
    //Obtenemos la distancia
    let distance = parseInt(document.getElementById("distance").value);

    if(selectedPlace1 == selectedPlace2){
      alert(`${selectedPlace1} es igual a ${selectedPlace2}, no se aceptan lugares repetidos`);
    }
  
    else{
      if(g.comprobarVertice(selectedPlace1,selectedPlace2)){
        alert(`${selectedPlace1} y ${selectedPlace2} ya existen en el grafo y por ende, ya están conectados`);
      }
      else{
        //Verificamos de que sea un valor numérico
        if(isNaN(distance)){
          alert(`${distance} no es un valor númerico`);
        }
    
        else{
          console.log(g.addConexion(selectedPlace1, selectedPlace2, distance));
          alert(`Excelente, se ha agregado la conexión \n Lugar de origen: ${selectedPlace1} \n Lugar de partida: ${selectedPlace2}`);
        }
      }
    }
  }

  else{
    alert('No existen lugares categorizados')
  }

  document.getElementById("distance").value = "";
});

//Función callback que recibe un lugar y lo pasa como argumento a addPlaceTable
const callback = (namePlace) => {
  console.log(namePlace);
  addPlaceTable(namePlace);
};

btn_show.addEventListener("click", () => {
  let placeOrigin = document.getElementById("nodeInit").value;
  if(contador == 0){
    g.dfs(placeOrigin, callback); 
  }
  else{
    g.restablecerListVisit()
    contador = 0;
    g.dfs(placeOrigin, callback)
  }
  contador++;
});

let addPlaceTable = (namePlace) => {
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  td.textContent = namePlace;
  tr.appendChild(td);
  body.appendChild(tr);
};

let imprimirMensaje = (d) =>{
  let referencia = document.getElementById('result-dijs');

  d.forEach(valor => {
    let elementP = document.createElement('p')
    elementP.textContent = valor;
    console.log(elementP)
    referencia.appendChild(elementP);
}); 
}

btn_dijsktra.addEventListener('click',()=>{
  let verticePartida = document.getElementById('verticeinicial').value;
  g.dijkstra(verticePartida,imprimirMensaje);
})

// console.log(g.addV("v1"))

// g.addV("v2")
// g.addV("v3")
// g.addV("v4")
// g.addV("v5")
// g.addV("v6")

// g.addConexion("v1","v2",2)
// g.addConexion("v1","v6",3)
// g.addConexion("v2","v3",1)
// g.addConexion("v3","v6",5)
// g.addConexion("v3","v5",3)
// g.addConexion("v3","v4",8)
// g.addConexion("v6","v5",6)
// g.addConexion("v5","v4",11)

// g.dijkstra("v3")


