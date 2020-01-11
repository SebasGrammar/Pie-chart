const pieChart = document.querySelector(".pie-chart")

let data = [5, 5, 5, 5, 5]
let value = data.reduce((acc, nxt) => acc + nxt)

let colors = ["red", "blue", "orange", "gray", "brown"]

let percentages = data.map(number => number * 31.42 / value)

let attributes = {
    r: "5",
    cx: "10",
    cy: "10",
    fill: "transparent",
    "stroke-width": "10",  
}

function setDashArray(percentage) {
    return `${percentage} 31.42`
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
