let searchBox = document.querySelector("#search-food")
let display = document.querySelector(".display")
let clear = document.querySelector(".clear")
let searchButton = document.querySelector(".search")

let calorieCounter = document.querySelector(".calorie-counter")
let calorieGoal = document.querySelector(".calorie-goal")
let submitGoal = document.querySelector(".submit")
let yourGoal = document.querySelector(".your-goal")


/****/


let dimensions = 5

const pieWidth = 20;
const pieHeight = 20;

const cx = pieWidth / 2
const cy = pieHeight / 2


const circumference = 2 * Math.PI * dimensions


let data = [];


let colors = ["#FF6B35", "#F8FFE5", "red", "#6A4C93", "white"]


// let attributes = {
//     r: sliceRadio,
//     cx: cx,
//     cy: cy,
//     fill: "transparent",
//     "stroke-width": radio,  
// }

let attributes = {
    r: 5,
    cx: cx,
    cy: cy,
    fill: "transparent",
    "stroke-width": 10,  
}

function setDashArray(percentage) {
    return `${percentage} ${circumference}`
}

function setColor(index) {
    return colors[index]
}

let degrees = -90;

function generateChart(data, container) {

    let value = data.reduce((total, currentValue) => total + currentValue)
    let percentages = data.map(number => number * circumference / value)

    percentages.forEach((percentage, index) => {

        const slice = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        Object.keys(attributes).forEach(attribute => slice.setAttribute(attribute, attributes[attribute]))
        slice.style.setProperty("transform-origin", "50%")
        slice.style.setProperty("transform", `rotate(${-data[index] / value * 360 + degrees}deg)`)
        degrees -= data[index] / value * 360
        slice.setAttribute("stroke-dasharray", setDashArray(percentage))
        //slice.setAttribute("stroke", setColor(index))
        slice.setAttribute("stroke", colors[index])
        container.appendChild(slice)

        let overlap = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        overlap.classList.add("top")
        overlap.setAttribute("fill", "#0270C1")
        overlap.setAttribute("r", 7)
        overlap.setAttribute("cx", attributes.cx)
        overlap.setAttribute("cy", attributes.cy)
        container.appendChild(overlap)
    
    })
}


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

let keys = {

}

function removeElement(element, code) {

    this.parentElement.remove()
    delete element[code]

}

let nutritionalInfo = []

function createAddition({ calories, name, quantity, code, id, info }) {

    let element = document.createElement("div")
    element.classList.add("food-element")
    keys[`${code} ${id}`] = element

    let textualInfo = document.createElement("div")
    textualInfo.classList.add("seeing")

    let closeIcon = document.createElement("a")
    closeIcon.classList.add("close-icon")
    closeIcon.addEventListener("click", function () {
        removeElement.bind(this)(keys, `${code} ${id}`)
        yourGoal.textContent = chosenCalories

        for (let element in keys) {
            let amount = keys[element].querySelector(".caloric-content").textContent
            yourGoal.textContent = Number(yourGoal.textContent) - Number(amount)
        }
    })

    let caloricContent = document.createElement("h4")
    caloricContent.classList.add("caloric-content")

    let span = document.createElement("p")
    span.classList.add("amount")

    caloricContent.textContent = `${calories.textContent} calories`
    span.textContent = `${quantity.textContent}x ${name}`

    // This is going to create a unique property that will allow me to
    // identify the element being created when calling this function.

    textualInfo.appendChild(caloricContent)
    textualInfo.appendChild(span)
    element.appendChild(textualInfo)
    element.appendChild(closeIcon)

    let solidFats = info[0]
    let addedSugar = info[1]
    let saturatedFats = info[3]

    let facts = document.createElement("p")
    facts.classList.add("facts")
    facts.textContent = `Solid fats: ${Math.round(solidFats)}gr - Added sugar: ${Math.round(addedSugar)}gr - Saturated fats: ${Math.round(saturatedFats)}gr`
    textualInfo.appendChild(facts)
    

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.classList.add("pie-chart")
    svg.setAttribute("viewBox", `0 0 ${pieWidth} ${pieHeight}`)

    let backgroundCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    backgroundCircle.classList.add("background-circle")
    backgroundCircle.setAttribute("r", pieWidth / 2)
    backgroundCircle.setAttribute("cx", cx)
    backgroundCircle.setAttribute("cy", cy)

    svg.appendChild(backgroundCircle)
    element.appendChild(svg)

    generateChart(info, svg)

}

/* THIS */
submitGoal.addEventListener("click", createGoal)

//calorieGoal.addEventListener("input", createGoal)

function clearAll() {

    display.innerHTML = ""
    calorieCounter.innerHTML = ""

    yourGoal.textContent = chosenCalories


    for (let property in keys){
        if (keys.hasOwnProperty(property)){
            delete keys[property];
        }
    }
}

function clearSearch() {
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
        <button class="add-calories functional-button">Add</button>
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

    let response = await fetch("Table with special characters.txt")
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
                    info: [Number(row[21]), Number(row[22]), Number(row[23]), Number(row[25])],
                    code: row[0],
                    id: `${Number(row[3])} ${row[4]}`,
                    quantity: menu.querySelector(".quantity"),
                    portionAmount: menu.querySelector(".portion-amount"),
                    calories: menu.querySelector(".calories")
                }

                nutritionalInfo = [row[8], row[9]]



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
        //clearAll()
        clearSearch()
        getData(searchBox.value)
    }
})