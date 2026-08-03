import CanvasDraw from "./CanvasDraw.js"
import Elem from "./Elem.js"

export default class ButtonColor extends Elem {
    static selectedButton=1

    COLOR

    type() {
        return "button"
    }

    start()  {
        const canvasDraw=this.find(elem=>elem instanceof CanvasDraw)
        this.ELEM.addEventListener("click", ()=>{ canvasDraw.currentColor=this.VAL; ButtonColor.selectedButton=this.VAL })
        this.COLOR=canvasDraw.COLORLIST[this.VAL]
    }

    update() {

    }

    startdraw()  {
        const len=(window.innerWidth<window.innerHeight?window.innerWidth:window.innerHeight)*0.05+"px"

        return { width: len, height: len, borderRadius: "100%", backgroundColor:this.COLOR}
    }

    updatedraw() {
        if (ButtonColor.selectedButton===this.VAL) return { border: "5px solid", borderColor: "gray" }
        else                                       return { border: "1px solid", borderColor: "black" }
    }
}