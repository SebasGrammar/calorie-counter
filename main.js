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

let selectedElements = {

};

function deployMenu() {
    this.style.display = choices[getComputedStyle(this).getPropertyValue("display")]
}

function createElement(name, menu) {

    let foodName = document.createElement("div")
    console.log(name)
    foodName.classList.add("result")
    foodName.textContent = name
    foodName.addEventListener("click", function() {
        this.classList.toggle("selected")
    })
    foodName.addEventListener("click", deployMenu.bind(menu))

    return foodName

}

function increase({ row, quantity, portionAmount, calories }) {
    quantity.textContent = Number(quantity.textContent) + 1
    portionAmount.textContent = `${Number(row[3]) * Number(quantity.textContent)} ${row[4]}` //Number(portionAmount.textContent) * Number(quantity.textContent)
    calories.textContent = Number(calories.textContent) + Math.round(Number(row[24])) //* Number(quantity.textContent)
}

function decrease({ row, quantity, portionAmount, calories }) {
    if (quantity.textContent > row[2]) {
        quantity.textContent = Number(quantity.textContent) - 1
        portionAmount.textContent = `${Number(row[3]) * Number(quantity.textContent)} ${row[4]}` //Number(portionAmount.textContent) * Number(quantity.textContent)
        calories.textContent = Number(calories.textContent) - Math.round(Number(row[24])) //* Number(quantity.textContent)
    }
}


clear.addEventListener("click", clearAll)

function replaceMeasurement(input) {
    if (input.includes(".25")) {
        return "1/4"
    } else if (input.includes(".50")) {
        return "1/2"
    } else if (input.includes(".75")) {
        return "3/4"
    } else if (input.includes("1")) {
        return "1"
    } else {
        return Number(input)
    }
}



async function getData(input) {

    let response = await fetch("Food_Display_Table.csv")
    let data = await response.text()
    let rows = data.split("\n")

    rows.forEach(element => {

        let row = element.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)

        if (element) {

            let name = row[1]

            if (name.toLowerCase().includes(input)) {

                let menu = createMenu()

                let tex = {
                    quantity: row[2],
                    portionAmount: `${Number(row[3])} ${row[4]}`,
                    calories: Math.round(Number(row[24]))
                }

                let increaseButton = menu.querySelector(".increase-button");
                let decreaseButton = menu.querySelector(".decrease-button");

                let properties = {
                    row,
                    quantity: menu.querySelector(".quantity"),
                    portionAmount: menu.querySelector(".portion-amount"),
                    calories: menu.querySelector(".calories")
                }
                
                Object.keys(tex).forEach(key => {
                    properties[key].textContent = tex[key]
                })

                increaseButton.addEventListener("click", function () {
                    increase(properties)
                })
                decreaseButton.addEventListener("click", function () {
                    decrease(properties)
                })
            
                display.appendChild(createElement(name, menu))
                display.appendChild(menu)

            }

        }

    })

}

/*
searchBox.addEventListener("change", function () {
    if (searchBox.value) {
        getData(searchBox.value)
    }
})
*/

searchBox.addEventListener("keydown", function () {
    if (searchBox.value) {
        clearAll()
        getData(searchBox.value)
    }
})