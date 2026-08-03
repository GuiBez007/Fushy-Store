const listA=[]
const listB=[]

function run() {
    for (let i=0; i<listA.length; i++) {
        const obj=listA[i]
        
        obj.start()

        const drawstart=obj.startdraw()

        drawstart && stylize(obj.ELEM, drawstart)

        listB.push(obj)
    }

    listA.length=0

    for (let i=0; i<listB.length; i++)
        listB[i].update()   

    for (let i=0; i<listB.length; i++) {
        const obj=listB[i]
        const drawUpdate=obj.updatedraw()
        drawUpdate && stylize(obj.ELEM, drawUpdate)
    }

    requestAnimationFrame(run)
}

function stylize(elem, style) {
    const list=Object.keys(style)

    for (let i=0; i<list.length; i++) {
        const key=list[i]
        elem.style[key]=style[key]
    }
}

export { listA, listB, run }