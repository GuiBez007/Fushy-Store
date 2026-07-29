const mouse = { x: 0, y: 0, isdown: false }

document.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY })
document.addEventListener("mousedown", () => mouse.isdown = true)
document.addEventListener("mouseup"  , () => mouse.isdown = false)

document.addEventListener("touchmove",   e => { const a = e.touches[0]; mouse.x = a.clientX; mouse.y = a.clientY })
document.addEventListener("touchstart", () => mouse.isdown = true)
document.addEventListener("touchend"  , () => mouse.isdown = false)

export default mouse