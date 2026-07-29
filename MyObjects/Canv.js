import Elem from "../Objects/Elem.js"

export default class Canv extends Elem {
    historic
    dic
    lis
    arr
    ctx
    #grid

    type() {
        return "canvas"
    }

    start() {
        this.dic = {"#0000": 0}
        this.lis = ["#0000"]
        this.historic = []
        this.grid = 10
        this.arr  = new Uint8Array(this.#grid**2)
        this.ctx  = this.ELEM.getContext("2d")

        document.addEventListener("keydown", e => {
            e.key === "z" && this.undo()
        }
        )
    }

    update() {
        this.#resize()
        this.#color()
    }

    #resize() {
        const len = ((window.innerWidth<window.innerHeight) ? window.innerWidth : window.innerHeight) * 0.75

        if (this.ELEM.width !== len) {
            this.ELEM.width  = len
            this.ELEM.height = len
        }
    }

    #color() {
        const len = this.getproportion()
        this.ctx.clearRect(0, 0, this.ELEM.width, this.ELEM.height)

        for (let y=0; y<this.#grid; y++) {
            for (let x=0; x<this.#grid; x++) {

                if (this.arr[y*this.#grid+x]) {
                    this.ctx.beginPath()
                    this.ctx.fillStyle = this.lis[this.arr[y*this.#grid+x]]
                    this.ctx.fillRect(x*len, y*len, len+1, len+1)
                    this.ctx.closePath()
                }

                this.ctx.beginPath()
                this.ctx.strokeRect(x*len, y*len, len+1, len+1)
                this.ctx.closePath()
            }
        }
    }

    draw(x, y, color="black", saveIntoHistoric=true) {
        const rect = this.ELEM.getBoundingClientRect()
        const len  = this.getproportion()

        let a = x
        let b = y

        if (!this.dic[color]) {
            this.dic[color] = this.lis.length
            this.lis.push(color)
        }

        x = x - rect.left
        y = y - rect.top

        if (x<0 || y<0) return

        x = x/len - x/len%1
        y = y/len - y/len%1

        if (x>=this.#grid || y>=this.#grid) return

        saveIntoHistoric && (this.dic[color] !== this.arr[y*this.#grid+x]) && this.historic.push(a, b, this.arr[y*this.#grid+x])
        this.arr[y*this.#grid+x] = this.dic[color]
    }

    changearr(newgrid) {
        const arr = new Uint8Array(newgrid**2)

        for (let y=0; y<this.#grid; y++) {
            for (let x=0; x<this.#grid; x++)
                arr[y*newgrid+x] = this.arr[y*this.#grid+x]
        }

        this.arr = arr
    }

    undo() {
        const [x, y, c] = this.historic.slice(this.historic.length-3, this.historic.length)
        for (let i=0; i<3; i++) this.historic.pop()
        this.draw(x, y, this.lis[c], false)
    }

    set grid(num) {
        num = Math.abs(parseInt(num))
        this.changearr(num)
        this.#grid = num
    }

    getproportion() { return this.ELEM.width/this.#grid }
}