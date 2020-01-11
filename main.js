const pieChart = document.querySelector(".pie-chart")


let data = [105, 20, 32, 70, 43]

let colors = ["red", "blue", "orange", "gray", "brown"]

let percentages = data.map(number => number * 31.42 / 100)

// let attributes = {
//     r: "5",
//     cx: "10",
//     cy: "10",
//     fill: "transparent",
//     stroke: "tomato",
//     "stroke-width": "10",
    


  
// }

let attributes = {
    r: "5",
    cx: "10",
    cy: "10",
    fill: "transparent",
    "stroke-width": "10",
    
}

/*
"stroke-dasharray": function(percentage) {
    return `${percentage} 31.42`
}
*/

function setThis(percentage) {
    return `${percentage} 31.42`
}

function setColor(index) {
    return colors[index]
}

percentages.forEach((percentage, index) => {
    //const slice =  document.createElement("circle")
    const slice = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    Object.keys(attributes).forEach(attribute => slice.setAttribute(attribute, attributes[attribute]))

    // slice.style.setProperty("transform-origin", "50%")
    // slice.style.setProperty("transform", "rotate(-72deg)")
    slice.setAttribute("stroke-dasharray", setThis(percentage))
    slice.setAttribute("stroke", setColor(index))
    /*
    `<circle class="${percentage}" r="5" cx="10" cy="10" fill="transparent" stroke="tomato" stroke-width="10"
    stroke-dasharray="${percentage} 31.42" />`
    */
    slice.classList.add(`circle-${Math.round(percentage)}`)
    console.log(slice)
    pieChart.appendChild(slice)

})

console.log(percentages)

console.log(pieChart)