import ButtonColor from "./Objects/ButtonColor.js"
import CanvasDraw  from "./Objects/CanvasDraw.js"
import { run }     from "./system.js"

function main() {
    new CanvasDraw()
    new ButtonColor(1)
    new ButtonColor(2)
    new ButtonColor(3)
    new ButtonColor(4)
    new ButtonColor(5)
    new ButtonColor(6)
}

main()
run()