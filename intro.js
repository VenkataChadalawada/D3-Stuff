/*
- select elements in the DOM using d3.select and d3.selectAll
- set Attributes, innertext and style properties on D3 selections
- Get Attribute and property values on D3 selections
- Chain D3 methods together to make more complex changes to the DOM
- Pass callback functions into D3 selection methods for more dynamic behaviour
- Add EVENT LISTENERS using the on method
- Use d3.event to access the event object inside of an event listener
- Add and remover DOM elements
*/

// Loading D3 using a script tag
<script src="https://d3js.org/d3.v4.js"></script>

//----------------------------------------------------------
/* 1 Selection Methods
d3.select - single element
d3.selectAll - multiple elements
*/
d3.version
d3.select('#page-title');
d3.selectAll("li");
// dont do this
d3.selectAll("li")._groups[0]
// instead use this node() method
d3.selectAll("li").node()



/* 2 Manipulating Selections
style, attr, text, and html methods
selection.style
selection.attr
selection.text
selection.html
*/
// GET
d3.select("#page-title").text();
d3.select("li").style("color");

// SET
// eg- select & change color
d3.select("#page-title")
.style("background-color", "#000")
.style("color", "#fff")
.attr("class", "new-class")
.text("D3 is cool");
// to SET a class - classed method
d3.select("#page-title")
.style("background-color", "#000")
.style("color", "#fff")
.classed("new-class", true)
.attr("class", "new-class")
.text("D3 is cool");



/* 3 Selections & Callbacks
callback function runs 
     function(_, idx)
*/
d3.selectAll("li")
.style("font-size", function(){
    return Math.random() * 40 + "px";
});
// idx to pick id and modify
d3.selectAll("li")
.style("ackground-color", function(_, idx){
    return idx%2===0 ? "lightgrey" : "white";
});
//manipulating nested div tags

d3.select(".outer")
    .style("color", "purple")
  .select("div")
    .style("font-size", "30px")
    .style("background-color", "orange")
  .select("div")
    .style("border", "8px solid blue");  


/* 4 Event Listeners in D3
selection.on(eventType, callback)
*/
// add a listener
d3.select("h1").on("click", function(){
    console.log("event listeners are sweet");
});
// remove a listner with a null
d3.select("h1").on("click", null);

//to access event you need to use special function of d3
d3.select("#new-note").on("submit", function(){
    d3.event.preventDefault();
    var input = d3.select("input");
});

//appending element
//input doesnt have text - we need to get Value of it , we have a generic property method
d3.select("#notes")
  .append("p")
    .classed("note", true)
    .text(input.property("value"));
input.property("value", "");

//remove
d3.selectAll("p").remove();


//================= chapter 2:  Data Joins=============
/*
- join data to a d3 selection using the data method
- target nodes to append to the DOM via the enter selection
- target nodes to remove from the DOM via the exit selection
- perform more advanced data joins by using a key function
- update existing DOM elements with new data
- Merge update and enter selections, and describe D3's general update pattern
*/

/* 
function(d, i){
// d is data
// i is index
}
*/

d3.select("#quotes")
  .style("list-style", "none")
  .selectAll("li")
  .data(quotes)
  .enter()
  .append("li")
  .text(function(d) {
    return d.quotes;
  });

  //add more styles & data
  d3.select("#quotes")
  .style("list-style", "none")
  .selectAll("li")
  .data(quotes)
  .enter()
  .append("li")
  .text(function(d) {
    return '"'+d.quotes+'"-'+d.movie+' ('+d.year+')';
  })
  .style("margin", "20px")
  .style("padding", "20px")
  .style("font-size", function(d){
    return d.quote.length < 25 ? "2em" : "1em";
  });

  //same above using arrouw functions
  d3.select("#quotes")
    .style("list-style", "none")
    .selectAll("li")
    .data(quotes)
    .enter()
    .append("li")
    .text(d => '"'+d.quotes+'"-'+d.movie+' ('+d.year+')')
    .style("margin", "20px")
    .style("padding", "20px")
    .style("font-size", d => d.quote.length < 25 ? "2em" : "1em");

  //lets color  them based on movie rating
  var colors = {
    "G": "#3cff00",
    "PG": "#f9ff00",
    "PG-13": "#ff9000",
    "R": "#ff0000"
  };

  d3.select("#quotes")
    .style("list-style", "none")
    .selectAll("li")
    .data(quotes)
    .enter()
    .append("li")
    .text(d => '"'+d.quote+'"-'+d.movie+' ('+d.year+')')
    .style("margin", "20px")
    .style("padding", "20px")
    .style("font-size", d => d.quote.length < 25 ? "2em" : "1em")
    .style("background-color", d => colors[d.rating])
    .style("border-radius", "8px");

  // Now data is already in Dom we can now select and do whatever we WebAuthentication
  // eg -
  d3.selectAll("li")
    .text(d => d.rating);
  


/*
  Exit Selections and key functions
  - target elements which should be removed from DOM


*/

// quotes.pop() => removes last elemnt but we will still see it , Its now in exit selection ready to be removed
quotes.pop();
d3.selectAll("li")
  .data(quotes)
  .exit()
  .remove();

// removing more elements
var nonRQuotes = quotes.filter(function(movie){
  return movie.rating !== "R";
})
d3.selectAll("li")
  .data(nonRQuotes)
  .exit()
  .remove();

// hmm, there is a problem it removed the last two instead left one which has R
// using a key function we can solve this
// eg:-

var nonRQuotes = quotes.filter(function(movie){
  return movie.rating !== "R";
})
d3.selectAll("li")
  .data(nonRQuotes, function(d){
    return d.quote;
  })
  .exit()
  .remove();
// enter exit & update selection => follow "basic-data-join" folder

/*
  1.Grab update selection, make any changes unique to that selection, and store the selection in a variable.
  2.Grab the exit selection and remove any unnecessary elements.
  3.Grab the enter selection and make any changes unique to that selection.
  4.Merge the enter and update selections, and make any changes that you want to be shared accross both selections.
*/

// SVG - Scalable Vector Graphics
/*
compare and contrast raster and vector graphics
create SVG elements in the DOM
Draw lines using SVG
create groups of SVG elements
Draw rectangles, polygons and circles using SVG
write text on SVG
Draw general paths on SVG
Use D3 to build an SVG bar chart
*/
<svg version ="1.1"
     baseProfile="full"
     xmlns="http://www.w3.org/2000/svg">
</svg>
/*
svg{
  border: 1px solid black;
  width: 800px;
  height: 450px;
}
*/
// =======Line========
<svg version ="1.1"
     baseProfile="full"
     xmlns="http://www.w3.org/2000/svg">

     <line x1="100" y1="100" x2="700" y2="350" />

</svg>


//if you have multiple lines and want to group -> using g tag

<svg version ="1.1"
     baseProfile="full"
     xmlns="http://www.w3.org/2000/svg">
    <g stroke-width="5px" stroke="blue">
      <line x1="100" y1="100" x2="700" y2="350" />
      <line x1="100" y1="350" x2="700" y2="100" />
    </g>
</svg>

// =======rectangle========
// Rectagle rect => x y width height stroke stroke-width fill rx ry
<svg version ="1.1"
     baseProfile="full"
     xmlns="http://www.w3.org/2000/svg">
     <rect x="0" y="50" width="300" height="200" fill="#ffc107" stroke="#2196f3" stroke-width="8px" />
</svg>

//another rectangle over lapping
<svg version ="1.1"
     baseProfile="full"
     xmlns="http://www.w3.org/2000/svg">
     <rect x="50" y="50" width="300" height="200" fill="#ffc107" stroke="#2196f3" stroke-width="8px" />
     <rect rx="30" ry="300" x="100" y="200" width="300" height="400" fill="#fe91e63" stroke="#795548" stroke-width="8px" />
</svg>

// =======polygon========
<svg version ="1.1"
     baseProfile="full"
     xmlns="http://www.w3.org/2000/svg">
     <polygon points="100,200 400,500 100,500" fill="#ffc107" stroke="#2196f3" stroke-width="8px" />
</svg>

//==========circle=========
<svg version ="1.1"
     baseProfile="full"
     xmlns="http://www.w3.org/2000/svg">
     <circle cx="400" cy="250" r="60" fill="black" />
</svg>
// https://codepen.io/mmmaaatttttt/pen/jLLbPJ?editors=1100

//===========text===========
<text x="400" y="430" text-anchor="middle" font-size="1.5em" font-family="sans-serif" 
fill="white" stroke-width="1px" stroke="black" transform="rotate(-10 400,430)">Starry starry SVG.
</text>


//===========path===========
/*
--------------------
d attribute commands
---------------------
6 fundamental commands 
M -> Move command eg:- M 400 100 => This moves 400px over and 100 px down
L -> Line command eg:- L 500 300 => this draws line from cursors present position to whatever destination coordinates
Z -> close path
Q -> quadratic  curve
C -> cubic Bezier curve
A -> circular arc

*/
//eg: -
<path d="M 400 100
         L 500 300
         L 300 300
         L 400 100"
      stroke="purple"
      stroke-witdh="3"
      />
// uppercase vs lowercase
say we started at M 400 100 both L 500 300 and  l 100 200 are equal
uppercase - L 500 300 => drawn from the current position to (400,100) point
lowercase - l 100 200 => drawn from the current position to 100px over and 200px down

// shortcuts
/*
Z/z - close the path with a line
H/h - draw a horizontal line
V/v - draw a vertical line
*/

// what if we want curved lines
/*
Q -> quadratic curve
C -> cubic Bezier curve
A -> circular arc
*/
// Q cx cy, x y
<path d="M0 225 Q 400 0 800 225" stroke="red" />

// C cx1 cy1, cx2 cy2, x y => this allows to control points
<path d="M0 225 C 200 450 400 0 800 225" stroke="red" />

//A rx ry rotate largeArc sweep x y
// rx is xradius and ry is y radius i


/*
INTERMEDIATE D3
D3 to calculate extreme values in a data set
D3 to scale data
Build scatterplots using D3 and SVG
axes & gridlines to graphs
axis labels , titles to graphs
build histograms using D3 and svg
build piecharts
*/

// Extrema and Scales
d3.max([1,2,3,4,5,6,7,8]) // 8
d3.min([1,2,3,4,5,6,7,8]) // 1

var people = [
  {name: "victor", age:40 },
  {name: "sai", age:30 },
  {name: "venkat", age:80 },
  {name: "ranga", age:20 },
  {name: "naga", age:60 },
];
d3.max(people, function(d){
  return d.age;
}); //80
d3.min(people, function(d){
  return d.age;
}); //20
// on another value say length of name
d3.min(people, function(d){
  return d.name.length;
});
//say you want both min and max we can use extent function in d3
d3.extent(people, d=>d.age); // [20,80]

// Refactored in -> d3-and-svg-extreme

// Scale
/*
1 to 17
-4 to 52
*/
var scale = d3.scaleLinear().domain([1,17]).range([-4,52]);
//Now
scale(1) // -4
scale(17) // 52
scale(10.23) // 28.305

// you can flip the range downwards to  for example
var scale = d3.scaleLinear().domain([1,maxBirths]).range([height,0]);

/*
d3.select("svg")
    .attr("width", width)
    .attr("height", height)
.selectAll("circle")
.data(birthData2011)
.enter()
.append("circle")
    .attr("cx", 200)
    .attr("cy", 100)
    .attr("r", 5); 
*/

// Axes

d3.axisTop(scale)
d3.axisRight(scale)
d3.axisBottom(scale)
d3.axisLeft(scale)


// Gridlines
axis.tickSize([size])
