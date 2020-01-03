let searchBox = document.querySelector("#search-food")
let display = document.querySelector(".display")
let clear = document.querySelector(".clear")
let searchButton = document.querySelector(".search")



/** OPEN AND CLOSE **/

let choices = {
    "none": "block",
    "block": "none"
}


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
            <button class="decrease-button">-</button>
            <button class="increase-button">+</button>
        </div>
        <div class="quantity"></div>
        <div class="portion-amount"></div>
        <div class="calories"></div>
    </div>
    `
    return menu

}

function deployMenu() {
    this.style.display = choices[getComputedStyle(this).getPropertyValue("display")]
}

function createElement(name, menu) {

    let foodName = document.createElement("div")
    console.log(name)
    foodName.classList.add("result")
    foodName.textContent = name
    foodName.style.background = "red"
    foodName.addEventListener("click", deployMenu.bind(menu))

    return foodName 
    
}


clear.addEventListener("click", clearAll)

async function getData(input) {
    let response = await fetch("Food_Display_Table.csv")
    let data = await response.text()

    let rows = data.split("\n")

    console.log(rows)

    rows.forEach(element => {

        let row = element.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)

        if (element) {

            let name = row[1]

            if (name.toLowerCase().includes(input)) {

                let menu = createMenu()
                
        
                /*
                let necessaryElements = ["buttons", "quantity", "portion-amount", "calories"]
                let text = [row[2], `${Number(row[3])} ${row[4]}`, Math.round(Number(row[24]))]
                necessaryElements.forEach((thing, index) => {
                
                    let currentItem = menu.querySelector(`.${thing}`)
                    currentItem.textContent = text[index]
                    console.log(`this is the current item: ${currentItem.textContent}`)
            
                })
                */

                /* BUTTONS */
                let increaseButton = menu.querySelector(".increase-button");
                let decreaseButton = menu.querySelector(".decrease-button");

                /* QUANTITY */
                let quantity = menu.querySelector(".quantity")
                quantity.textContent = row[2]

                /* PORTION AMOUNT */
                let portionAmount = menu.querySelector(".portion-amount")
                portionAmount.textContent = `${Number(row[3])} ${row[4]}`
                /* CALORIES */
                let calories = menu.querySelector(".calories")
                calories.textContent = Math.round(Number(row[24]))

                increaseButton.addEventListener("click", function() {
                    quantity.textContent = Number(quantity.textContent) + 1
                    portionAmount.textContent = `${Number(row[3]) * Number(quantity.textContent)} ${row[4]}` //Number(portionAmount.textContent) * Number(quantity.textContent)
                    calories.textContent = Number(calories.textContent) + Math.round(Number(row[24])) //* Number(quantity.textContent)
                })

                display.appendChild( createElement(name, menu) )
                display.appendChild(menu)
                
            }

        }

    })

}

//getData()
searchBox.addEventListener("change", function () {
    if (searchBox.value) {
        getData(searchBox.value)
    }
})