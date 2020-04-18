var margin = { top: 30, right: 50, bottom: 30, left: 50 };
var svgWidth = 600;
var svgHeight = 270;
var graphWidth = svgWidth - margin.left - margin.right;
var graphHeight = svgHeight - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y").parse;

var x = d3.time.scale().range([0, graphWidth]);
var y = d3.scale.linear().range([graphHeight, 0]);

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

var highLine = d3.svg.line()
    .x(function (d) { return x(d.TIME); })
    .y(function (d) { return y(d.Value); });

var svg = d3.select("box_1")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")


d3.json(GHGdata, function (countryplz) {
    myObj = {};
    for (var i = 0; i < d3.keys(countryplz).length; i++) {
        myObj[d3.keys(countryplz)[i]] = +d3.values(countryplz)[i];
    }
    return myObj;
}       
function drawGraph(data) {
        // For each row in the data, parse the date
        // and use + to make sure data is numerical
        data.forEach(function (d) {
            d.TIME = parseDate(d.TIME);
            d.Value = +d.Value;
        });
        // Scale the range of the data
        //x.domain(d3.extent(data, function (d) { return d.TIME; }));
        //y.domain([d3.min(data, function (d) {
        //  return Math.min(d.High, d.Close, d.Low)
        //}),
        //d3.max(data, function (d) {
        //  return Math.max(d.High, d.Close, d.Low)
        //})]);
        // Add the area path
        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area)
        // Add the highLine as a green line
        svg.append("path")
            .style("stroke", "green")
            .style("fill", "none")
            .attr("class", "line")
            .attr("d", highLine(data));
        // Add the closeLine as a blue dashed line
        svg.append("path")
            .style("stroke", "blue")
            .style("fill", "none")
            .style("stroke-dasharray", ("3, 3"))
            .attr("d", closeLine(data));
        // Add the lowLine as a red dashed line
        svg.append("path")
            .style("stroke", "red")
            .attr("d", lowLine(data));
        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + graphHeight + ")")
            .call(xAxis);
        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
        // Add the text for the "High" line
        svg.append("text")
            .attr("transform", "translate(" + (graphWidth + 3) + "," + y(graphData[0].High) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "green")
            .text("High");
        // Add the text for the "Low" line
        svg.append("text")
            .attr("transform", "translate(" + (graphWidth + 3) + "," + y(graphData[0].Low) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "red")
            .text("Low");
        // Add the text for the "Close" line
        svg.append("text")
            .attr("transform", "translate(" + (graphWidth + 3) + "," + y(graphData[0].Close) + ")")
            .attr("dy", ".35em")
            .attr("text-anchor", "start")
            .style("fill", "blue")
            .text("Close");
    };