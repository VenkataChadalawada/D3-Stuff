var quotes = [
    {
      quote: "I see dead people.",
      movie: "The Sixth Sense",
      year: 1999,
      rating: "PG-13"
    }, {
      quote: "May the force be with you.",
      movie: "Star Wars: Episode IV - A New Hope",
      year: 1977,
      rating: "PG"
    }, {
      quote: "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
      movie: "Dirty Harry",
      year: 1971,
      rating: "R"
    }, {
      quote: "You had me at 'hello.'",
      movie: "Jerry Maguire",
      year: 1996,
      rating: "R"
    }, {
      quote: "Just keep swimming. Just keep swimming. Swimming, swimming, swiming.",
      movie: "Finding Nemo",
      year: 2003,
      rating: "G"
    }
];
var newQuotes = [
    {
        quote: "Houston, we have a problem.",
        movie: "Apollo 13",
        year: 1995,
        rating: "PG-13"
    }, {
        quote: "Gentlemen, you can't fight in here! This is the war room!",
        movie: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        year: 1964,
        rating: "PG"
    }
];
  

/* // Basic Example
d3.select("#quotes")
  .selectAll("li")
  .data(quotes)
  .enter()
  .append("li")
  .style("list-style", "none")
  .text(function(d) { return  d.quote });
*/

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
    .style("background", d => colors[d.rating])
    .style("border-radius", "8px");

// planning to removed R rated movies
var removeBtn = d3.select(".remove");
removeBtn.on('click', function(){
    var nonRQuotes = quotes.filter(function(movie){
        return movie.rating !== "R";
    });
    d3.selectAll("li")
    .data(nonRQuotes, function(d){
        return d.quote;
    })
    .exit()
    .remove();
removeBtn.remove();
});

// add more quotes
var add = d3.select(".add");
add.on('click', function(){
    quotes = quotes.concat(newQuotes);
    console.log('---quotes--', quotes);
    d3.select("#quotes")
      .selectAll("li")
      .data(quotes)
      .enter()
      .append("li")
      .text(d => '"'+d.quote+'"-'+d.movie+' ('+d.year+')')
      .style("margin", "20px")
      .style("padding", "20px")
      .style("font-size", d => d.quote.length < 25 ? "2em" : "1em")
      .style("background", d => colors[d.rating])
      .style("border-radius", "8px");
    add.remove();
})

/*
GENERAL PATTERN for updating DOM elements in D3
    Enter Selection => data with no elements
    Exit Selection => elements with no data
    Update Selection => data + elements
*/
// what if we want to update same set of changes to both 
// d3 provides merge it merges together enter & exit selections

// lets apply

var add = d3.select(".add");
add.on('click', function(){
    quotes = quotes.concat(newQuotes);
    console.log('---quotes--', quotes);
    var listItems = d3.select("#quotes")
        .selectAll('li')
        .data(quotes);

    listItems
      .enter()
      .append("li")
      .text(d => '"'+d.quote+'"-'+d.movie+' ('+d.year+')')
      .style("margin", "20px")
      .style("padding", "20px")
      .style("font-size", d => d.quote.length < 25 ? "2em" : "1em")
      .style("background", d => colors[d.rating])
      .style("border-radius", "8px")
      .merge(listItems)
      .style("color", "#5599ff")
    add.remove();
});
/*
  1.Grab update selection, make any changes unique to that selection, and store the selection in a variable.
  2.Grab the exit selection and remove any unnecessary elements.
  3.Grab the enter selection and make any changes unique to that selection.
  4.Merge the enter and update selections, and make any changes that you want to be shared accross both selections.
*/
