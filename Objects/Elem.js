import { listA, listB } from "../system.js"

export default class Elem {
    /** @type {HTMLElement} */ ELEM
    VAL

    constructor(val=null) {
        this.VAL = val
        this.ELEM = document.createElement(this.type())
        document.body.append(this.ELEM)
        listA.push(this)
    }

    type() {
        return "div"
    }

    start() {

    }

    update() {

    }

    startdraw() {

    }

    updatedraw() {

    }

    find(func) {
        for (let i=0;i<listB.length;i++) {
            if (func(listB[i])) return listB[i]
        }
    }
}