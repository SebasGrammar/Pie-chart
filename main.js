const pieChart = document.querySelector(".pie-chart")
const backgroundCircle = document.querySelector(".background-circle")

pieChart.setAttribute("height", 5)
pieChart.setAttribute("width", 5)

let dimensions = "250px";

pieChart.style.setProperty("width", dimensions)
pieChart.style.setProperty("height", dimensions)

console.log(pieChart.width.baseVal.value)

const pieWidth = pieChart.width.baseVal.value;
const pieHeight = pieChart.height.baseVal.value;
pieChart.setAttribute("viewBox", `0 0 ${pieWidth} ${pieHeight}`)

const cx = pieWidth / 2
const cy = pieHeight / 2

backgroundCircle.setAttribute("r", pieWidth / 2)


backgroundCircle.setAttribute("cx", cx)
backgroundCircle.setAttribute("cy", cy)

const radio = backgroundCircle.r.baseVal.value

const sliceRadio = radio / 2

console.log(2 * Math.PI * sliceRadio)

// circumference = 2 * pi * r

const circumference = 2 * Math.PI * sliceRadio

let data = [5, 5, 5, 5, 5]
let value = data.reduce((acc, nxt) => acc + nxt) // TOTAL, addition of all numbers

let colors = ["#edf7fa", "#5f6caf", "#ffb677", "#ff8364", "#df8543"]

let percentages = data.map(number => number * circumference / value)

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

console.log(pieChart)