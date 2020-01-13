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

function close() {
    this.style.display = "none"
}

closeModal.addEventListener("click", close.bind(modal))

function handleUpdate(suffix = "") {
    suffix = this.dataset.sizing;
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}

range.addEventListener("change", handleUpdate)

//const squares = document.querySelectorAll(".field");
let squares;
let names;
let fields = 0;

function createFields() {
    inputContainer.innerHTML = ""
    labels.innerHTML = ""
    SVG.innerHTML = ""


    for (let i = 0; i < Number(slicesNumber.value); i++) {
        //let field = document.createElement("div")
        let fieldContainer = document.createElement("div")
        fieldContainer.classList.add("field-container")


        let label = document.createElement("input")
        label.placeholder = "label name"
        label.classList.add("label-name")


        let field = document.createElement("input")
        field.placeholder = `field #${i + 1}`
        field.classList.add("field")


        fieldContainer.appendChild(label)
        fieldContainer.appendChild(field)
        inputContainer.appendChild(fieldContainer)
    }

    //fields = 0
    squares = document.querySelectorAll(".field")
    names = document.querySelectorAll(".label-name")

}

add.addEventListener("click", createFields)
slicesNumber.addEventListener("input", createFields)

console.log(generateButton)
let dimensions = 5
//let size = "150px";

SVG.setAttribute("height", dimensions)
SVG.setAttribute("width", dimensions)


//SVG.style.setProperty("width", size)
//SVG.style.setProperty("height", size)

const pieWidth = SVG.width.baseVal.value;
const pieHeight = SVG.height.baseVal.value;

SVG.setAttribute("viewBox", `0 0 ${pieWidth} ${pieHeight}`)

const cx = pieWidth / 2
const cy = pieHeight / 2

backgroundCircle.setAttribute("r", pieWidth / 2)
backgroundCircle.setAttribute("cx", cx)
backgroundCircle.setAttribute("cy", cy)

const radio = backgroundCircle.r.baseVal.value // Reference circle's radio value.

const sliceRadio = radio / 2 // radio for each slice

const circumference = 2 * Math.PI * sliceRadio

//let data = [234, 324, 884, 22, 134]
let data = [];


//let value = data.reduce((total, currentValue) => total + currentValue) // TOTAL, addition of all numbers
//let percentages = data.map(number => number * circumference / value)

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

// percentages.forEach((percentage, index) => {

//     const slice = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     Object.keys(attributes).forEach(attribute => slice.setAttribute(attribute, attributes[attribute]))
//     slice.style.setProperty("transform-origin", "50%")
//     slice.style.setProperty("transform", `rotate(${-data[index] / value * 360 + degrees}deg)`)
//     degrees -= data[index] / value * 360
//     slice.setAttribute("stroke-dasharray", setDashArray(percentage))
//     slice.setAttribute("stroke", setColor(index))
//     SVG.appendChild(slice)

// })

function generateRandomColor() {

    return '#' + Math.floor(Math.random() * 16777215).toString(16);
    //return `#${Math.floor(Math.random()*16777215).toString(16)}`

}

let greenLight;

function generateChart() {



    for (let square of squares) {

        if (!square.value) {
            greenLight = false
            break

        } else {

            greenLight = true
        }

    }

    if (greenLight) {

        data.length = 0
        labels.innerHTML = ""

        for (let square of squares) {
            //console.log(square.value)
            data.push(Number(square.value))
        }

        console.log(data)

        let value = data.reduce((total, currentValue) => total + currentValue) // TOTAL, addition of all numbers
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
            //slice.setAttribute("stroke", setColor(index))
            slice.setAttribute("stroke", color)

            label.style.setProperty("background", color)

            //label.textContent = `${data[index]} -> ${Math.round(percent)}%`;
            label.textContent = `${names[index].value} ${Math.round(percent)}%`

            labels.appendChild(label)
            SVG.appendChild(slice)

        })


        // let overlapping = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        // overlapping.classList.add("top")
        // overlapping.setAttribute("fill", "#FFF")
        // overlapping.setAttribute("r", 2)
        // overlapping.setAttribute("cx", cx)
        // overlapping.setAttribute("cy", cy)
        // SVG.appendChild(overlapping)
    } else {
        let emptyFields = 0;
        for (let square of squares) {
            if (!square.value) {
                emptyFields ++
                
            }
        }
        //alert("There are empty fields")
        //let verb;
        emptyFields < 2 ? modalMessage.textContent = `There is ${emptyFields} empty field.` : modalMessage.textContent = `There are ${emptyFields} empty fields.`
        //modalMessage.textContent = "There ${verb} ${}"
        modal.style.display = "block"
    }
}

generateButton.addEventListener("click", generateChart)


// let overlapping = document.createElementNS("http://www.w3.org/2000/svg", "circle")
// overlapping.classList.add("top")
// overlapping.setAttribute("fill", "#FFF")
// overlapping.setAttribute("r", 2)
// overlapping.setAttribute("cx", cx)
// overlapping.setAttribute("cy", cy)
// SVG.appendChild(overlapping)

console.log(SVG)