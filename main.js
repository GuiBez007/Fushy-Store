import Canv from "./MyObjects/Canv.js"
import InputColor from "./MyObjects/InputColor.js"
import InputGrid from "./MyObjects/InputGrid.js"
import Elem from "./Objects/Elem.js"
import { run } from "./system.js"

function main() {
    new Canv({ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", border: "1px solid", borderRadius: "5px" })
    new InputColor()
    new InputGrid()
}


main()
run()