import { listA, listB } from "../system.js"

export default class Elem {
    /**@type{HTMLElement}*/ELEM
    VAL

    constructor(val=null) {
        this.ELEM=document.createElement(this.type())
        this.VAL=val

        listA.push(this)

        document.body.append(this.ELEM)
    }

    find(func) {
        for (let i=0; i<listB.length; i++) {
            if (func(listB[i])) return listB[i]
        }
    }

    type() {}

    start()  {}
    update() {}

    startdraw()  {}
    updatedraw() {}
}