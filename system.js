const listA = []
const listB = []

function run() {
    for (let i=0;i<listA.length;i++) {
        const obj=listA[i]
        obj.start()
        stylize(obj.ELEM, obj.startdraw())
        listB.push(obj)
    }

    listA.length=0

    for (let i=0; i<listB.length;i++) {
        listB[i].update()
    }

    for (let i=0;i<listB.length;i++) {
        const obj=listB[i]
        stylize(obj.ELEM, obj.updatedraw())
    }

    requestAnimationFrame(run)
}

function stylize(elem, style) {
    if (!style) return

    const list = Object.keys(style)

    for (let i=0;i<list.length;i++) {
        const key=list[i]
        elem.style[key] = style[key]
    }
}

export { listA, listB, run }