// @TODO: YOUR CODE HERE!
var data_1 = emissions_data;
//console.log(emissions_data);
//convert file to GeoJson
// set widths
var svgWidth = 800;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// svg setups
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
// chart group set up
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
//var FELoop = Object.entries(data_1).forEach(([key, value]) => {
//Object.entries(data_1).forEach((Country_Name) => {
    //get Country Names
    //console.log(value[14]);
    //get Latitude
    //value.Latitude
    //get longitude

    //var pct_change = key.Percent_Change;
    //console.log(value.Percent_Change);
    //var lat = key.Latitude;
    //console.log(value.Latitude);
//var lon = Country_Name.Longitude;
    //var country_name = Country_Name.Country_Name;
    //console.log(value.Country_Name);
    // Once we get a response, send the data.features object to the createFeatures function
    //console.log(Object.Country_Name.Latitude)
    





d3.csv("final_emissions").then(function (myData) {

    // convert data to numbers, creating a function to call from csv
    myData.forEach(function (xdata) {
        xdata.County_Name = +xdata.Country_Name;
        xdata.Percent_Change = +xdata.Percent_Change;
        //checking that the data actually converted 
        console.log(xdata.Country_Name, xdata.Percent_Change);
    });

    // setting an x scale function
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(myData, d => d.Country_Name),
        d3.max(myData, d => d.Country_Name)])
        .range([0, width]);

    // setting a y scale function
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(myData, d => d.Percent_Change) * 1.1])
        .range([height, 0]);

    // setting up bottom and left axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .style("font-size", "18px")
        .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
        .style("font-size", "18px")
        .call(leftAxis);

    // circles
    chartGroup.selectAll("circle")
        .data(myData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.Percent_Change))
        .attr("cy", d => yLinearScale(d.Country_Name))
        .attr("r", 12)
        .attr("fill", "orchid")
        .attr("opacity", ".5");

    // text with in circles
    chartGroup.selectAll("text.text-circles")
        .data(myData)
        .enter()
        .append("text")
        .classed("text-circles", true)
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.Percent_Change))
        .attr("y", d => yLinearScale(d.Country_Name))
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px");

    // set y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 30 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("aText", true)
        .text("Country");

    // set x axis
    chartGroup.append("text")
        .attr("y", height + margin.bottom / 2 - 10)
        .attr("x", width / 2)
        .attr("dy", "1em")
        .classed("aText", true)
        .text("Percent Change");


});
//});
