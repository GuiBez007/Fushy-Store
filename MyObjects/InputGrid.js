import Elem from "../Objects/Elem.js"
import Canv from "./Canv.js"

export default class InputGrid extends Elem {
    num
    canv

    type() {
        return "input"
    }

    start() {
        this.ELEM.type = "number"
        this.ELEM.value = 10
        this.canv = this.find(elem => elem instanceof Canv)
    }

    update() {
        if (this.num !== this.ELEM.value) {
            this.canv.grid = parseInt(this.ELEM.value)
            this.num = this.ELEM.value
        }
    }
}