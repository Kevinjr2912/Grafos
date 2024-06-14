import LinkedList from "./LinkedList/LinkedList.mjs"

export default class Graph {
  #listaAdyacencia = []
  #map = new Map()
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
      return value
  }

  addConexion(start, end, weight=1){
      if (this.#map.has(start) && this.#map.has(end)) {
          this.#listaAdyacencia[this.#map.get(start)].push(end,weight)
          this.#listaAdyacencia[this.#map.get(end)].push(start,weight)
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


} 