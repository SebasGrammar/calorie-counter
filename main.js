let searchBox = document.querySelector("#search-food")
let display = document.querySelector(".display")
let clear = document.querySelector(".clear")
let searchButton = document.querySelector(".search")

display.style.background = "blue"

function clearAll() {
    display.innerHTML = ""
}

function createMenu() {

    let menu = document.createElement("div")
    menu.classList.add("nutritional-info")
    menu.innerHTML =
    `
    <div class="headings row">
        <label></label>
        <label>Quantity</label>
        <label>Portion amount</label>    
        <label>Calories</label>
    </div>
    <div class="row">
        <div class="buttons">
            <button>-</button>
            <button>+</button>
        </div>
        <div class="quantity"></div>
        <div class="portion-amount"></div>
        <div class="calories"></div>
    </div>
    `
    return menu

}

function deployMenu() {

    //this.style.display = "block"

    if (this.style.display == "none") {
        this.style.display = "block"
    } else {
        this.style.display = "none"
    }

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




                let foodName = document.createElement("div")
                console.log(name)
                foodName.classList.add("result")
                foodName.textContent = name
                foodName.style.background = "red"
                display.appendChild(foodName)



                let menu = createMenu()
                foodName.addEventListener("click", deployMenu.bind(menu))


                let necessaryElements = ["buttons", "quantity", "portion-amount", "calories"]
                let text = ["", row[2], `${row[3]} ${row[4]}`, row[24]]


                necessaryElements.forEach((thing, index) => {
                    if (index > 0) {
                        let currentItem = menu.querySelector(`.${thing}`)
                        currentItem.textContent = text[index]
                        console.log(`this is the current item: ${currentItem.textContent}`)
                    }
                })


                /*
                for (let counter = 0; counter < necessaryElements.length; counter++) {
                    let currentItem = menu.querySelector(necessaryElements[counter])
                    console.log(`this is the current item: ${currentItem}`)
                }
                */


                display.appendChild(menu)
                //display.appendChild( createMenu() )
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