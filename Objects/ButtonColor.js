import CanvasDraw from "./CanvasDraw.js"
import Elem       from "./Elem.js"

export default class ButtonColor extends Elem {
    type() {
        return "button"
    }

    start() {
        this.canvasDraw=this.find(elem=>elem instanceof CanvasDraw)

        this.ELEM.addEventListener("click", ()=>this.canvasDraw.color=this.VAL)
    }

    update() {

    }

    startdraw() {
        const color = this.canvasDraw.COLOR_LIST[this.VAL]
        const len = ((window.innerWidth<window.innerHeight) ? window.innerWidth : window.innerHeight)*0.05+"px"

        return {
            borderRadius:"100%",
            backgroundColor:color,
            width:  len,
            height: len
        }
    }

    updatedraw() {
        if (this.canvasDraw.color===this.VAL) return { border: "3px solid", borderColor: "lightgreen" }
        else return { border: "1px solid", borderColor: "black" }
    }
}