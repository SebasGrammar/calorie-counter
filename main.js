let searchBox = document.querySelector("#search-food")
let display = document.querySelector(".display")

display.style.background = "blue"

async function getData(input) {
    let response = await fetch("Food_Display_Table.csv")
    let data = await response.text()

    let rows = data.split("\n")

    //console.log(`This is the value: ${input, elements[1]}`)

    rows.forEach(element => {
        //if (element) {
        //console.log(element[1])

        //console.log(element)
        //console.log("it does")

        if (element) {

            let row = element.split(",")
            let name = row[1]



            if (name.includes(input)) {
                let n = document.createElement("div")
                n.classList.add("result")
                n.textContent = name
                n.style.background = "red"
                display.appendChild(n)
            }

            //}
        }




    })


    return "fucking shit"
}

//getData()
searchBox.addEventListener("click", function () {
    if (searchBox.value) {
        console.log(getData(searchBox.value))
    }
})