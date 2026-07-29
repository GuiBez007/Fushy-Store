import { wl, ol } from "../system.js"

export default class Elem {
    constructor(style={}) {
        this.ELEM = document.createElement(this.type())
        document.body.append(this.ELEM)

        const a = Object.keys(style)

        for (let i=0; i<a.length; i++) {
            const k = a[i]
            this.ELEM.style[k] = style[k]
        }

        wl.push(this)
    }

    type() {
        return "div"
    }

    start() {

    }

    update() {

    }

    find(func) {
        for (let i=0; i<ol.length; i++) {
            if (func(ol[i])) return ol[i]
        }
    }
}