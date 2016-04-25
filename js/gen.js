var svg1 = d3.selectAll(".bar")
    .style("fill", function(d, i) {
        if (i == 2) {
            return "skyblue";
        }
    })
    .style("stroke", "blue")
    .transition()
    .duration(3000)
    .attr("class", "bar_note")
