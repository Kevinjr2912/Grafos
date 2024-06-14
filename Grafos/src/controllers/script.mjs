import Graph from "../models/Graph.mjs";

let g = new Graph(); //le cambie el 5 a vacio

let addPlace = document.getElementById("addPlace");
addPlace.addEventListener("click", () => {
  let identificadorV = document.getElementById("location").value;
  let vertices = identificadorV.split(",");
  console.log(identificadorV);
  console.log(vertices);

  if (vertices.length == 1) {
    g.addV(vertices[0].trim())
    addDataTable(vertices[0].trim());
    alert('Excelente, haz agregado un lugar llamado: ' + vertices[0])
  } else {
    g.addVertices(...vertices.map((v) => v.trim()))
    alert('Excelente, haz agregado los lugares: ' + vertices)
  }

  document.getElementById("location").value = "";
});

let btn_distance = document.getElementById("btn_addDistance");
btn_distance.addEventListener("click", () => {
  let place1 = document.getElementById("place1").value.trim();
  let place2 = document.getElementById("place2").value.trim();

  if (place1 == "" || place2 == "") {
    alert("No se aceptan campos vacios");
  } else {
    let distance = parseInt(document.getElementById("distance").value);
    console.log(place1, place2);
    console.log(g.addConexion(place1, place2, distance));

    document.getElementById("place1").value = "";
    document.getElementById("place2").value = "";
    document.getElementById("distance").value = "";
  }
});

let btn_show = document.getElementById("btn-show");
btn_show.addEventListener("click", () => {
  let placeOrigin = document.getElementById("nodeInit").value;
  g.dfs(placeOrigin, callback);
});

let body = document.getElementById("body-table");

const callback = (namePlace) => {
  console.log(namePlace);
  addPlaceTable(namePlace)
};

let addPlaceTable = (namePlace) => {
  let tr = document.createElement("tr");
  let td = document.createElement("td");
  td.textContent = namePlace;
  tr.appendChild(td);
  body.appendChild(tr);
};
