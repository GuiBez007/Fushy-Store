import Elem         from "./Elem.js"
import { getmouse } from "./hardware.js"

export default class CanvasDraw extends Elem {
    ctx
    array
    COLOR_LIST

    grid=10
    gridX=128
    gridY=128
    proportion=0.75

    x=0
    y=0
    color=1

    type() {
        return "canvas"
    }

    start() {
        document.addEventListener("keydown", e=>{
            this.grid +=(e.key==="+")-(e.key==="-")
            this.gridX+=(e.key==="ArrowRight")-(e.key==="ArrowLeft")
            this.gridY+=(e.key==="ArrowDown") -(e.key==="ArrowUp")
            
            e.key==="z" && this.undo()
        }
        )

        this.COLOR_LIST=[null, "black", "white", "red", "green", "blue", "brown"]
        this.ctx=this.ELEM.getContext("2d")
        this.array=new Float32Array(255**2)
    }

    update() {
        const [x, y] = [getmouse("x"), getmouse("y")]
        const mousedown = getmouse("down")

        this.#draw(x, y)
        mousedown && this.#drawSquare()
        this.#resize()
        this.#drawFrame()
    }

    #resize() {
        const len=((window.innerWidth<window.innerHeight) ? window.innerWidth : window.innerHeight) * this.proportion
        this.ELEM.width =len
        this.ELEM.height=len
    }

    #drawFrame() {
        const len=this.ELEM.width/this.grid
        const px=this.gridX-parseInt(this.grid/2)
        const py=this.gridY-parseInt(this.grid/2)

        this.ctx.clearRect(0, 0, this.ELEM.width, this.ELEM.height)

        for (let y=0;y<this.grid;y++) {
            for (let x=0;x<this.grid;x++) {
                const i=(y+py)*255+x+px

                if (this.array[i]) {
                    this.ctx.beginPath()
                    this.ctx.fillStyle=this.COLOR_LIST[this.array[i]]
                    this.ctx.fillRect(x*len, y*len, len, len)
                    this.ctx.closePath()
                }

                this.ctx.beginPath()
                this.ctx.strokeRect(x*len, y*len, len, len)
                this.ctx.closePath()
            }
        }
    }

    #draw(x, y) {
        this.x=-1
        this.y=-1

        const rect=this.ELEM.getBoundingClientRect()
        const len=this.ELEM.width/this.grid

        x-=rect.left
        y-=rect.top

        if (x<0 || y<0) return
        
        x=x/len-x/len%1
        y=y/len-y/len%1

        if (x>=this.grid || y>=this.grid) return

        this.x=x
        this.y=y
    }

    #drawSquare() {
        if (this.x<0 || this.y<0) return

        const x=this.gridX-parseInt(this.grid/2)
        const y=this.gridY-parseInt(this.grid/2)

        const xi=this.x+x
        const yi=(this.y+y)*255

        this.array[yi+xi] = this.color
    }

    startdraw() {
        return {
            position:"absolute", left:"50%", top:"50%", transform:"translate(-50%, -50%)",
            border:"1px solid", borderRadius:"5px"
        }
    }
}