import Elem from "../Objects/Elem.js"
import mouse from "../Objects/mouse.js"
import Canv from "./Canv.js"

export default class InputColor extends Elem {
    canv

    type() {
        return "input"
    }

    start() {
        this.ELEM.type = "color"
        this.canv = this.find(elem => elem instanceof Canv)
    }

    update() {
        mouse.isdown && this.canv.draw(mouse.x, mouse.y, this.ELEM.value)
    }
}