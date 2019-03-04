var input = d3.select("input");
var preview = d3.select(".preview");

input.on('input', function(){
  console.log('--', input);
  var note = d3.event.target.value;
  preview.text(note)
          .classed("hide", note ==="");
});

d3.select("#new-note")
    .on('submit', function() {
      d3.event.preventDefault();
      var input = d3.select('input');
      d3.select("#notes")
        .append('p')
          .classed('note', true)
          .text(input.property('value'));
      input.property('value', '');
      d3.select(".preview")
        .text("")
        .classed("hide", true);

});

d3.select(".remove-button")
    .on('click', function() {
      d3.selectAll(".note").remove();
});

d3.select(".lucky-button")
    .on('click', function(){
      d3.selectAll(".note")
        .style("font-size", function(){
          return Math.random() * 100 + "px";
        })
});