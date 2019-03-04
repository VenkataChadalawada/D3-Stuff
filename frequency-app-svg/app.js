// write your code here!
var width = 800;
var height = 400;
var barPadding = 10;
var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

d3.select("#reset")
  .on("click", function(){
      d3.selectAll(".letter")
        .remove();
      d3.select("#phrase")
        .text("");
      d3.select("#count")
        .text("");
  })

d3.select("#form")
.on('submit', function(){
    d3.event.preventDefault();
    var input = d3.select("input");
    var text = input.property('value');
    var data = getFrequencies(text);
    var barWidth = width/data.length - barPadding;

    var letters = svg
                    .selectAll(".letter")
                    .data(getFrequencies(text), function(d){
                        return d.character;
                    });
    letters
        .classed("new", false)
        .exit()
        .remove();
        console.log('--l--', letters);
    letters
      .enter()
      .append("rect")
      .classed("letter", true)
      .classed("new", true)
      .merge(letters)
      .style("width", barWidth)
      .style("height", function(d){
          return d.count*20;
      })
      .attr("x", function(d, i){
        return (barWidth+barPadding)*i;
      })
      .attr("y", function(d){
        return height - d.count*20;
      })
    
    
    d3.select('#phrase')
      .text("Analysis of: "+ text);
    
    d3.select("#count")
      .text("Analysis of")
    
    input.property("value", "");
});

// this form works for one time. But we need it for subsequent tries
/*
d3.select("#form")
.on('submit', function(){
    d3.event.preventDefault();
    var input = d3.select("input");
    var text = input.property('value');
    // console.log('----input-----', input.property('value'));
    d3.select('#letters')
      .selectAll(".letter")
      .data(getFrequencies(text))
      .enter()
      .append("div")
      .classed("letter", true)
      .style("width", "20px")
      .style("line-height", "20px")
      .style("margin-right", "5px")
      .style("height", function(d){
          return d.count*20+"px";
      })
      .text(function(d){
          return d.character;
      });
    
    d3.select('#phrase')
      .text("Analysis of: "+ text);
    
    input.property("value", "");
});
*/
//getFrequencies('hello') => Obje [{charecter:"h", count:1},{charecter:"e", count:1}, {charecter:"l", count:2},{charecter:"o", count:1}];
function getFrequencies(str){
    var sorted = str.split("").sort();
    var data=[];
    for(var i=0; i<sorted.length; i++) {
        var last = data[data.length-1];
        if(last && last.character === sorted[i]) {
            last.count++;
        } else {
            data.push({character: sorted[i], count: 1});
        }
    }
    console.log(data);
    return data;
}
// getFrequencies('hello world');