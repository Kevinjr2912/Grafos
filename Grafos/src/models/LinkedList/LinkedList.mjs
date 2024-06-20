import Node from "./Node.mjs"
import Place from "../Place.mjs"

export default class LinkedList {
    #count
    #head

    constructor(){
        this.#count = 0
        this.#head = undefined
    }

    push(name,weight) {
        let place = new Place(name,weight)
        const node = new Node(place)
        let current
        if (this.#head == null) {
            this.#head = node
        } else {
            current = this.#head
            while (current.next != null)
                current = current.next
            current.next = node
        }
        this.#count++
    }

    getHead(){
        return this.#head
    }

    getElementAt(index) {
        if (index>=0 && index<this.#count) {
            let node = this.#head
            for (let i=0;i<index && node != null; i++)
                node = node.next
            return node
        }
        return undefined
    }

    isEmpty(){
        return this.size() === 0
    }

    size(){
        return this.#count
    }


}