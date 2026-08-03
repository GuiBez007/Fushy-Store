import Elem from "./Elem.js"

export default class CanvasDraw extends Elem {
    CTX
    ARRAY
    COLORLIST

    grid=10
    gridX=0
    gridY=0

    currentColor=1  
    zoom=0.75

    isDrawing=false

    type() {
        return "canvas"
    }

    start()  {
        const func = (e, a=0)=>{
            const cell=this.#getCell(e.clientX, e.clientY)

            if (!a) {
                this.isDrawing &&
                cell           &&
                this.#drawCell(cell[0], cell[1], this.currentColor)    
            }
            
            else if (a===1) {
                cell           &&
                this.#drawCells(cell[0], cell[1], this.currentColor)
            }
        }

        const func2 = e=>{
            const touch=e.touches[0]
            const cell=this.#getCell(touch.clientX, touch.clientY)

            this.isDrawing &&
            cell           &&
            this.#drawCell(cell[0], cell[1], this.currentColor)    
        }
        
        this.ELEM.addEventListener("mousemove", func)
        this.ELEM.addEventListener("touchmove", func2)
        
        this.ELEM.addEventListener("dblclick", e=>{func(e, 1); console.log("au")})

        document.addEventListener("keydown", e=>{
            this.gridX+=(e.key==="ArrowRight")-(e.key==="ArrowLeft")
            this.gridY+=(e.key==="ArrowDown")-(e.key==="ArrowUp")
            this.grid +=(e.key==="+")-(e.key==="-")
        })

        document.addEventListener("wheel", e=>{
            this.zoom*=(e.deltaY<0)*0.1+1
            this.zoom/=(e.deltaY>0)*0.1+1
        })

        this.ELEM.addEventListener("contextmenu", e=>e.preventDefault())
        this.ELEM.addEventListener("mousedown"  , e=>{this.isDrawing=true; func(e)})
        this.ELEM.addEventListener("touchstart" , e=>{this.isDrawing=true; func2(e)})
        document.addEventListener("mouseup"     , ()=>this.isDrawing=false)
        document.addEventListener("touchend"    , ()=>this.isDrawing=false)
        
        this.CTX=this.ELEM.getContext("2d")
        this.ARRAY=new Uint8Array(255**2)
        this.COLORLIST=["#0000", "black", "white", "red", "green", "blue"]
    }

    update() {
        this.#resize()
        this.#drawFrame()
    }

    #resize() {
        const len=(
            window.innerWidth<window.innerHeight ?
            window.innerWidth : window.innerHeight
        ) * this.zoom

        this.ELEM.width  = len
        this.ELEM.height = len
    }
 
    #drawFrame() {
        const len=this.ELEM.width/this.grid
        const gridHalf=parseInt(this.grid/2)
        
        this.CTX.clearRect(0, 0, this.ELEM.width, this.ELEM.height)
        
        for (let y=0; y<this.grid; y++) {
            for (let x=0; x<this.grid; x++) {
                const i=(y+this.gridY+128-gridHalf)*255+x+this.gridX+128-gridHalf

                if (this.ARRAY[i]) {
                    this.CTX.beginPath()
                    this.CTX.fillStyle=this.COLORLIST[this.ARRAY[i]]
                    this.CTX.fillRect(x*len, y*len, len, len)
                    this.CTX.closePath()
                }

                this.CTX.beginPath()
                this.CTX.strokeRect(x*len, y*len, len, len)
                this.CTX.closePath()
            }
        }
    }

    #drawCell(x, y, color=1) {
        this.ARRAY[this.#getIndex(x, y)] = color
    }

    #drawCells(x, y, color=1, c=-1) {
        this.#drawCell(x, y, color)

        for (const [i1, i2] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const cell=this.ARRAY[this.#getIndex(x+i1, y+i2)]

            if (c===-1) {
                this.#drawCells(x+i1, y+i2, color, cell)
            }

            else if (cell===c && x+i1>=0&&x+i1<this.grid&&y+i2>=0&&y+i2<this.grid) {
                this.#drawCells(x+i1, y+i2, color, c)
            }
        }
    }
    
    #getCell(x, y) {
        const rect=this.ELEM.getBoundingClientRect()
        const len=this.ELEM.width/this.grid
        
        x-=rect.left
        y-=rect.top

        if (x<0||y<0) return

        x=x/len-x/len%1
        y=y/len-y/len%1

        if (x>this.grid||y>this.grid) return

        return [x, y]
    }

    #getIndex(x, y) {
        const gridHalf=parseInt(this.grid/2)
        return (y+this.gridY-gridHalf+128)*255+x+this.gridX-gridHalf+128
    }

    startdraw()  {
        return { position:"absolute", left:"50%", top:"50%", transform:"translate(-50%, -50%)", border:"1px solid", borderRadius:"5px" }
    }
}