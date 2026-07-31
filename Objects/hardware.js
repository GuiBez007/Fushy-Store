const array=new Float32Array(3)

document.addEventListener("mousemove", e=>{array[0]=e.clientX;array[1]=e.clientY})
document.addEventListener("mousedown", ()=>array[2]=1)
document.addEventListener("mouseup"  , ()=>array[2]=0)

function getmouse(str) {
    switch (str) {
        case "x":    return array[0]
        case "y":    return array[1]
        case "down": return array[2]===1
    }
}

export { getmouse }