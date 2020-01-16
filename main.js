const SVG = document.querySelector(".pie-chart")
const backgroundCircle = document.querySelector(".background-circle")
const input = document.querySelector(".input")
const generateButton = document.querySelector(".generate-button")

const slicesNumber = document.querySelector(".slices-number")
const inputContainer = document.querySelector(".input-container")
const add = document.querySelector(".add")

const range = document.querySelector(".test")

const labels = document.querySelector(".labels")


const modal = document.querySelector(".modal")
const closeModal = document.querySelector(".close-modal")
const modalMessage = document.querySelector(".modal-message")

const doughnut = document.querySelector(".doughnut")

const modes = document.querySelectorAll(".view")
const changeView = document.querySelector(".change-view")


// function changeMode(elements) {
//     for (let element of elements) {
//         if (element.style.display == "none") {
//             element.style.display = "block"
//         } else {
//             element.style.display = "none"
//         }
//     }
// }

let choices = {
    "none": "block",
    "block": "none"
}

function change() {
    this.style.display = choices[getComputedStyle(this).getPropertyValue("display")]
}

function close() {
    this.style.display = "none"
}

closeModal.addEventListener("click", close.bind(modal))

function handleUpdate(suffix = "") {
    suffix = this.dataset.sizing;
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}

range.addEventListener("input", handleUpdate)

let squares;
let names;
let duplicates = [];


function reset() {
    inputContainer.textContent = ""
    labels.textContent = ""
    SVG.textContent = ""
}

function createFields() {

    reset()

    for (let i = 0; i < Number(slicesNumber.value); i++) {

        let fieldContainer = document.createElement("div")
        fieldContainer.classList.add("field-container")

        let label = document.createElement("input")
        label.placeholder = "label name"
        label.classList.add("label-name", "text-input")

        let field = document.createElement("input")
        field.placeholder = `field #${i + 1}`
        field.classList.add("field")

        fieldContainer.appendChild(label)
        fieldContainer.appendChild(field)
        inputContainer.appendChild(fieldContainer)
    }

    squares = document.querySelectorAll(".field")
    names = document.querySelectorAll(".label-name")

}

add.addEventListener("click", createFields)
slicesNumber.addEventListener("input", createFields)

let dimensions = 5

SVG.setAttribute("height", dimensions)
SVG.setAttribute("width", dimensions)

const pieWidth = SVG.width.baseVal.value;
const pieHeight = SVG.height.baseVal.value;

SVG.setAttribute("viewBox", `0 0 ${pieWidth} ${pieHeight}`)

const cx = pieWidth / 2
const cy = pieHeight / 2

backgroundCircle.setAttribute("r", pieWidth / 2)
backgroundCircle.setAttribute("cx", cx)
backgroundCircle.setAttribute("cy", cy)

const radio = backgroundCircle.r.baseVal.value

const sliceRadio = radio / 2

const circumference = 2 * Math.PI * sliceRadio

let data = [];

let colors = ["#edf7fa", "#5f6caf", "#ffb677", "#ff8364", "#df8543"]

let attributes = {
    r: sliceRadio,
    cx: cx,
    cy: cy,
    fill: "transparent",
    "stroke-width": radio,
}

function setDashArray(percentage) {
    return `${percentage} ${circumference}`
}

function setColor(index) {
    return colors[index]
}

let degrees = -90;

function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function createOverlap() {
    let overlap = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    overlap.classList.add("top")
    overlap.setAttribute("fill", "#F5F5F5")
    overlap.setAttribute("r", 2)
    overlap.setAttribute("cx", cx)
    overlap.setAttribute("cy", cy)
    SVG.appendChild(overlap)
    test = overlap;

}

function conjugate(number, text, verb = "is") {
    if (number > 1) {
        text += "s";
        verb = "are"
    }

    return `There ${verb} ${number} empty ${text}.`
}

let greenLight;

let test;

function generateChart() {

    for (let index = 0; index < squares.length; index++) {
        if (!squares[index].value || !names[index].value) {
            greenLight = false
            break
        } else {
            greenLight = true
        }
    }

    if (checkForDuplicates(names)) {
        greenLight = false
        modalMessage.textContent = "There can't be duplicate labels."
        modal.style.display = "block"
    }

    if (greenLight) {

        data.length = 0
        labels.textContent = ""

        for (let square of squares) {
            data.push(Number(square.value))
        }

        let value = data.reduce((total, currentValue) => total + currentValue)
        let percentages = data.map(number => number * circumference / value)

        percentages.forEach((percentage, index) => {

            const color = generateRandomColor()

            const percent = data[index] / value * 100

            const slice = document.createElementNS("http://www.w3.org/2000/svg", "circle");

            const label = document.createElement("div")
            label.classList.add("label")

            Object.keys(attributes).forEach(attribute => slice.setAttribute(attribute, attributes[attribute]))
            slice.style.setProperty("transform-origin", "50%")
            slice.style.setProperty("transform", `rotate(${-data[index] / value * 360 + degrees}deg)`)
            degrees -= data[index] / value * 360
            slice.setAttribute("stroke-dasharray", setDashArray(percentage))
            slice.setAttribute("stroke", color)

            label.style.setProperty("background", color)

            label.addEventListener("mouseover", function () {
                this.setAttribute("stroke", "red")
            }.bind(slice))

            label.addEventListener("mouseout", function () {
                this.setAttribute("stroke", color)
            }.bind(slice))


            label.textContent = `${names[index].value} ${Math.round(percent)}%`

            labels.appendChild(label)
            SVG.appendChild(slice)

            changeView.style.display = "flex"

            


        })


        createOverlap()



    } else {

        

        let emptyFields = 0;
        let emptyLabels = 0;
        for (let square of squares) {
            square.addEventListener("input", function () {
                this.style["border-color"] = "#d1d1d1"
            })
            if (!square.value) {
                emptyFields++
                square.style["border-color"] = "red"
            } else {
                square.style["border-color"] = "#d1d1d1"
            }
        }

        for (let label of names) {
            label.addEventListener("input", function () {
                this.style["border-color"] = "#d1d1d1"
            })
            if (!label.value) {
                emptyLabels++
                label.style["border-color"] = "red"
            } else {
                label.style["border-color"] = "#d1d1d1"
            }
        }


        if (emptyFields && emptyLabels) {
            modalMessage.textContent = "There are empty fields and labels."
        } else if (emptyFields) {
            modalMessage.textContent = conjugate(emptyFields, "field")
        } else if (emptyLabels) {
            modalMessage.textContent = conjugate(emptyLabels, "label") //"There are empty labels"
        }


        modal.style.display = "block"
    }

    checked.bind(doughnut)(test)
}


function checked(element) {
    if (this.checked) {
        element.style.display = "block"
    } else {
        element.style.display = "none"
    }
}

// function changeMode(elements) {
//     for (let element of elements) {
//         if (element.style.display == "none") {
//             element.style.display = "block"
//         } else {
//             element.style.display = "none"
//         }
//     }
// }

doughnut.addEventListener("click", function () {
    checked.bind(this)(test)

})


for (let mode of modes) {
    doughnut.addEventListener("click", change.bind(mode))
}



function checkForDuplicates(arr) {
    duplicates.length = 0
    for (let item of arr) {
        duplicates.push(item.value)
    }

    console.log(duplicates)

    return new Set(duplicates).size !== duplicates.length
}

generateButton.addEventListener("click", generateChart)
