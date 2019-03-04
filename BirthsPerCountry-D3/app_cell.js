
var width = 600;
var height = 600;
var padding = 50;
// we are interested in below data
//cellularsubc , literacyrate, medianage & urban poulation
// say if a country has null in it - we need to filter out
var data = regionData.filter(mustHaveKeys);
//literacy rate on X axis
var xScale = d3.scaleLinear()
                .domain(d3.extent(data, function(d) {
                    return d.adultLiteracyRate;
                }))
                .range([padding, width-padding]);

//cell subscribers on Y axis
var yScale = d3.scaleLinear()
                .domain(d3.extent(data,  function(d) { return d.subscribersPer100 }))
                .range([height-padding, padding]);
// fill radius using median age in radius range of 5-30
var radiusScale = d3.scaleLinear()
                    .domain(d3.extent(data,  function(d) { return d.medianAge }))
                    .range([5,30]);
// fill color with ranging from                    
var fillScale = d3.scaleLinear()
                    .domain(d3.extent(data,  function(d) { return d.urbanPopulationRate} ))
                    .range(["skyblue", "purple"]);

var xAxis  = d3.axisBottom(xScale)
                .tickSize(-height+2*padding)
                .tickSizeOuter(0);
                
var yAxis  = d3.axisLeft(yScale)
                .tickSize(-width+2*padding)
                .tickSizeOuter(0);

var svg = d3.select("svg")
             .attr("width", width)
             .attr("height", height);

//Attaching ticks
svg.append("g")
    .attr("transform", "translate(0,"+(height-padding)+")")
    .call(xAxis);
svg.append("g")
    .attr("transform", "translate("+padding+",0)")
    .call(yAxis);
//Attaching Labels
svg.append("text")
    .attr("x", width/2)
    .attr("y", (height-padding))
    .attr("dy", padding/2)
    .style("text-anchor", "middle")
    .style("font-family", "tahoma")
    .text("Literacy Rate");

svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height/2)
    .attr("dy", padding/2)
    .style("text-anchor", "middle")
    .style("font-family", "tahoma")
    .text("Cellular Subscribers");

svg.append("text")
    .attr("x", width/2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "2em")
    .style("font-family", "tahoma")
    .text("Literacy Rate Vs Cellular Subscriptions");

svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", function(d){
            return xScale(d.adultLiteracyRate);
        })
        .attr("cy", function(d){
            return yScale(d.subscribersPer100);
        })
        .attr("r", function(d) { return radiusScale(d.medianAge);})
        .attr("fill", function(d) { return fillScale(d.urbanPopulationRate);})
        .attr("stroke", "#fff");

function mustHaveKeys(obj){
    var keys = [
        "subscribersPer100",
        "adultLiteracyRate",
        "urbanPopulationRate",
        "medianAge"
    ];
    for(var i=0;i<keys.length;i++){
        if(obj[keys[i]] === null) return false;
    }
    return true;
}
