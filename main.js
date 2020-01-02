let searchBox = document.querySelector("#search-food")
let display = document.querySelector(".display")
let clear = document.querySelector(".clear")
let searchButton = document.querySelector(".search")

display.style.background = "blue"

function clearAll() {
    display.innerHTML = ""
}

clear.addEventListener("click", clearAll)

async function getData(input) {
    let response = await fetch("Food_Display_Table.csv")
    let data = await response.text()

    let rows = data.split("\n")

    rows.forEach(element => {

        let row = element.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)

        if (element) {

            let name = row[1]

            if (name.toLowerCase().includes(input)) {

                let n = document.createElement("div")
                console.log(name)
                n.classList.add("result")
                n.textContent = name
                n.style.background = "red"
                display.appendChild(n)
            }

        }

    })

}

//getData()
searchBox.addEventListener("change", function () {
    if (searchBox.value) {
        console.log(getData(searchBox.value))
    }
})