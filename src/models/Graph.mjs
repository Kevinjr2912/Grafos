import LinkedList from "./LinkedList/LinkedList.mjs"
'use strict';
export default class Graph {
  #listaAdyacencia = [];
  #matrizAdyacencia = [];
  #map = new Map();
  #listVisit = new Array(this.#listaAdyacencia.length).fill(false);

  constructor() {}

  addVertices(...vertices) {
      for (let value of vertices) {
          this.#listaAdyacencia.push(new LinkedList())
          this.#map.set(value,this.#listaAdyacencia.length-1)
      }
  }

  addV(value) {
      this.#listaAdyacencia.push(new LinkedList())
      this.#map.set(value,this.#listaAdyacencia.length-1)
      this.#matrizAdyacencia.push([])
      return value
  }

  addConexion(start, end, weight=1){
      if (this.#map.has(start) && this.#map.has(end)) {
          this.#listaAdyacencia[this.#map.get(start)].push(end,weight)
          this.#listaAdyacencia[this.#map.get(end)].push(start,weight)
          this.#matrizAdyacencia[this.#map.get(start)][this.#map.get(end)] = weight
          this.#matrizAdyacencia[this.#map.get(end)][this.#map.get(start)] = weight
          return true
      }
      return false;
  }

  dfs(origen,callback){
    this.#listVisit[this.#map.get(origen)] = true
    callback(origen)

    let space = this.#listaAdyacencia[this.#map.get(origen)];

    for(let i=0; i<space.size(); i++){
        let v = space.getElementAt(i)
        if(this.#listVisit[this.#map.get(v.data.name)] != true){
            this.#listVisit[this.#map.get(v.data.name)] = true
            this.dfs(v.data.name,callback)
        } 
    }
  }

  comprobarVertice(v1,v2){
    let vertice1 = this.#map.get(v1)
    let vertice2 = this.#map.get(v2)

    console.log(vertice1)
    console.log(vertice2)

    if(this.#listaAdyacencia[vertice1].getElementAt(vertice2) != undefined || this.#listaAdyacencia[vertice2].getElementAt(vertice1)){
        console.log(this.#listaAdyacencia[vertice1].getElementAt(vertice2))
        console.log(this.#listaAdyacencia[vertice2].getElementAt(vertice1))
        return true;
    }
    return false;
  }

  restablecerListVisit(){
    this.#listVisit.fill(false)
  }

  dijkstra(verticeInit,imprimirMensaje) {
    // Valores iniciales
    let l = [];
    let v = [];
    let d = [];
    let dp = [];
    let v1;

    for (let i = 0; i < this.#matrizAdyacencia.length; i++) {
        for (let j = 0; j < this.#matrizAdyacencia.length; j++) {
            if (this.#matrizAdyacencia[i][j] === undefined) {
                this.#matrizAdyacencia[i][j] = 10000;
            }
        }            
    }
    
    for (let i = 0; i < this.#matrizAdyacencia.length; i++) {
        v[i] = i;
        d[i] = 10000;
    }

    v1 = this.#map.get(verticeInit);
    d[v1] = 0;
    dp = [...d];

    while (l.length !== this.#matrizAdyacencia.length) {
        let minimo = Math.min(...dp.filter(value => value !== null));
        let indice = dp.indexOf(minimo);
        l.push(minimo);

        for (let i = 0; i < d.length; i++) {
            if (this.#matrizAdyacencia[indice][i] !== 10000) { 
                let suma = d[indice] + this.#matrizAdyacencia[indice][i];
                if (d[i] > suma) {
                    d[i] = suma;
                }
            }
        }

        dp[indice] = null;
    }

    console.log(d)
    imprimirMensaje(d)
}

} 