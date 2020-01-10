let searchBox = document.querySelector("#search-food")
let display = document.querySelector(".display")
let clear = document.querySelector(".clear")
let searchButton = document.querySelector(".search")

let calorieCounter = document.querySelector(".calorie-counter")
let calorieGoal = document.querySelector(".calorie-goal")
let submitGoal = document.querySelector(".submit")
let yourGoal = document.querySelector(".your-goal")

/** OPEN AND CLOSE **/

let choices = {
    "none": "block",
    "block": "none"
}

let chosenCalories;

function createGoal() {
    yourGoal.textContent = calorieGoal.value
    chosenCalories = calorieGoal.value
}

// CTRL + K + C -> comment out code
// CTRL + K + U -> uncomment code

let keys = {

}


function removeElement(element, code) {

    this.parentElement.remove()
    delete element[code]

}

function createAddition({ calories, name, quantity, code, id }) {

    let element = document.createElement("div")
    element.classList.add("food-element")
    keys[`${code} ${id}`] = element

    let closeIcon = document.createElement("img")
    closeIcon.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1024px-Grey_close_x.svg.png")
    closeIcon.classList.add("close-icon")
    //closeIcon.addEventListener("click", removeElement)
    closeIcon.addEventListener("click", function() {
        removeElement.bind(this)(keys, `${code} ${id}`)

        //yourGoal.textContent = chosenCalories

        if (Object.keys(keys).length) {

            yourGoal.textContent = chosenCalories
            for (let element in keys) {
                                
                let amount = keys[element].querySelector(".caloric-content").textContent
                yourGoal.textContent = Number(yourGoal.textContent) - Number(amount)
            }

        } else {
            yourGoal.textContent = chosenCalories
        }

        // for (let element in keys) {
        //     console.log(element)
        //     console.log(keys[element])
        //     let amount = keys[element].querySelector(".caloric-content").textContent
        //     yourGoal.textContent = Number(yourGoal.textContent) - Number(amount)
        // }

        //console.log(keys)
    })

    let caloricContent = document.createElement("p")
    caloricContent.classList.add("caloric-content")

    let span = document.createElement("p")
    span.classList.add("amount")

    caloricContent.textContent = calories.textContent
    span.textContent = `${quantity.textContent}x ${name}`

     // This is going to create a unique property that will allow me to
    // identify the element being created when calling this function.
    element.appendChild(caloricContent)
    element.appendChild(span)
    element.appendChild(closeIcon)
    
}

submitGoal.addEventListener("click", createGoal)

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
        <div></div>
    </div>
    <div class="row">
        <div class="buttons">
            <button class="decrease-button">-</button>
            <button class="increase-button">+</button>
        </div>
        <div class="quantity"></div>
        <div class="portion-amount"></div>
        <div class="calories"></div>
        <button class="add-calories">Add</button>
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
    foodName.classList.add("result")
    foodName.textContent = name
    foodName.addEventListener("click", function () {
        this.classList.toggle("selected")
    })
    foodName.addEventListener("click", deployMenu.bind(menu))

    return foodName

}

function increase({ row, quantity, portionAmount, calories }) {
    quantity.textContent = Number(quantity.textContent) + 1
    portionAmount.textContent = `${Number(row[3]) * Number(quantity.textContent)} ${row[4]}` 
    calories.textContent = Number(calories.textContent) + Math.round(Number(row[24])) 
}

function decrease({ row, quantity, portionAmount, calories }) {
    if (quantity.textContent > row[2]) {
        quantity.textContent = Number(quantity.textContent) - 1
        portionAmount.textContent = `${Number(row[3]) * Number(quantity.textContent)} ${row[4]}`
        calories.textContent = Number(calories.textContent) - Math.round(Number(row[24])) 
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

                let contentValues = {
                    quantity: row[2],
                    portionAmount: `${Number(row[3])} ${row[4]}`,
                    calories: Math.round(Number(row[24]))
                }

                let increaseButton = menu.querySelector(".increase-button");
                let decreaseButton = menu.querySelector(".decrease-button");
                let addButton = menu.querySelector(".add-calories")

                let properties = {
                    row,
                    name,
                    code: row[0],
                    id: `${Number(row[3])} ${row[4]}`,
                    quantity: menu.querySelector(".quantity"),
                    portionAmount: menu.querySelector(".portion-amount"),
                    calories: menu.querySelector(".calories")
                }

                addButton.addEventListener("click", function () {
 
                    if (!keys[`${properties.code} ${properties.id}`]) {
                        createAddition(properties)
                        yourGoal.textContent = Number(yourGoal.textContent) - Number(properties.calories.textContent)
                        calorieCounter.appendChild(keys[`${properties.code} ${properties.id}`])
                        
                    } else {

                        
                        let foodCalories = keys[`${properties.code} ${properties.id}`].querySelector(".caloric-content")
                        let amount = keys[`${properties.code} ${properties.id}`].querySelector(".amount")
                        foodCalories.textContent = properties.calories.textContent
                        amount.textContent = `${properties.quantity.textContent}x ${properties.name}`

                        /*****/
                        yourGoal.textContent = chosenCalories
                        for (let element in keys) {
                            
                            let amount = keys[element].querySelector(".caloric-content").textContent
                            yourGoal.textContent = Number(yourGoal.textContent) - Number(amount)
                        }

                    }
                })

                Object.keys(contentValues).forEach(key => {
                    properties[key].textContent = contentValues[key]
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