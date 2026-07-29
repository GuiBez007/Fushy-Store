const wl = []
const ol = []

function run() {
    for (let i=0; i<wl.length; i++) {
        wl[i].start()
        ol.push(wl[i])
    }

    wl.length = 0

    for (let i=0; i<ol.length; i++) {
        ol[i].update()
    }

    requestAnimationFrame(run)
}

export { wl, ol, run }