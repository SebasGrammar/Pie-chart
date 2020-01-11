const pieChart = document.querySelector(".pie-chart")
const backgroundCircle = document.querySelector(".background-circle")

const radio = backgroundCircle.r.baseVal.value

const sliceRadio = radio / 2

console.log(2 * Math.PI * sliceRadio)

// circumference = 2 * pi * r

const circumference = 2 * Math.PI * sliceRadio

let data = [5, 5, 5, 5, 5]
let value = data.reduce((acc, nxt) => acc + nxt) // TOTAL, addition of all numbers

let colors = ["red", "blue", "orange", "gray", "brown"]

let percentages = data.map(number => number * circumference / value)

let attributes = {
    r: sliceRadio,
    cx: "10",
    cy: "10",
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

percentages.forEach((percentage, index) => {

    const slice = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    Object.keys(attributes).forEach(attribute => slice.setAttribute(attribute, attributes[attribute]))

    slice.style.setProperty("transform-origin", "50%")

    slice.style.setProperty("transform", `rotate(${-data[index] / value * 360 + degrees}deg)`)
    degrees -= data[index] / value * 360

    slice.setAttribute("stroke-dasharray", setDashArray(percentage))
    slice.setAttribute("stroke", setColor(index))

    slice.classList.add(`circle-${Math.round(percentage)}`)
    pieChart.appendChild(slice)

})
