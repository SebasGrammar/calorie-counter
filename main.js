let searchBox = document.querySelector("#search-food")
let display = document.querySelector(".display")
let clear = document.querySelector(".clear")
let searchButton = document.querySelector(".search")

let calorieCounter = document.querySelector(".calorie-counter")
let calorieGoal = document.querySelector(".calorie-goal")
let submitGoal = document.querySelector(".submit")
let yourGoal = document.querySelector(".your-goal")

/** OPEN AND CLOSE **/

let test = {
    "hello world 8 and me": 2
}

console.log(test["hello world 8 and me"])

let choices = {
    "none": "block",
    "block": "none"
}

function createGoal() {
    //let goal = document.createElement("div")
    yourGoal.textContent = calorieGoal.value

    //calorieCounter.appendChild(goal)

}

// CTRL + K + C -> comment out code
// CTRL + K + U -> uncomment code

// function createAddition(text) {
//     let element = document.createElement("div")
//     element.textContent = text
//     calorieCounter.appendChild(element)
// }


// function createAddition({calories, name, quantity}) {
//     let element = document.createElement("div")
//     let span = document.createElement("p")

//     span.textContent = `${quantity.textContent}x ${name}`

//     element.textContent = calories.textContent //+ name

//     element.appendChild(span)
//     calorieCounter.appendChild(element)

// }


let keys = {

}

function createAddition({calories, name, quantity, code, id}) {
    let element = document.createElement("div")
    let span = document.createElement("p")

    span.textContent = `${quantity.textContent}x ${name}`

    element.textContent = calories.textContent //+ name


    element.setAttribute("data-id", code)

    


    // if (!calorieCounter.contains(element)) {
    //     console.log(element)
    //     element.appendChild(span)
    //     calorieCounter.appendChild(element)
    // } 

    if (!keys[`${code} ${id}`]) {
        console.log(`${code} ${id}`)
        console.log(keys)
        //keys[code][id] = true
        keys[`${code} ${id}`] = true
        console.log(element)
        element.appendChild(span)
        calorieCounter.appendChild(element)
    } else {
        console.log(code)
    }



    // if (!keys.hasOwnProperty(element)) {
    //     console.log(keys)
    //     keys[element] = 1
    //     element.appendChild(span)
    //     calorieCounter.appendChild(element)
    //     console.log(keys)
    // }



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
    //console.log(name)
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

                addButton.addEventListener("click", function() {
                    //createAddition(properties.calories.textContent)
                    createAddition(properties)
                    /****/
                    yourGoal.textContent = Number(yourGoal.textContent) - Number(properties.calories.textContent) 
                })
                
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