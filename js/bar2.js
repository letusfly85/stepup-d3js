var dataSet = [ 300, 130, 5, 60, 240 ];

d3.select("#myGraph")
  .selectAll("rect")
  .data(dataSet)
  .enter()
  .append("rect")
  .attr("x", 0)
  .attr("y", function(d, i){
	  return i * 25;
  })
  .attr("width", function(d, i) {
	  return d + "px";
  })
  .attr("height", "20px")

d3.select("#updateButton")
  .on("click", function() {
    dataSet2 = [20, 230, 150, 10, 20];
    for(var i=0; i<dataSet.length; i++) {
      dataSet2[i] = Math.floor(Math.random() * 320);
    }
    console.log("enter")
    d3.select("#myGraph")
      .selectAll("rect")
      .data(dataSet2)
      .transition()
      .attr("width", function(d, i) {
        return d + "px";
      })
})
