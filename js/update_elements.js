d3.selectAll("button").on("click", function() {
    var csvFile = this.getAttribute("data-src");
    console.log(csvFile)

    d3.csv(csvFile, function(error, data) {
        var dataSet = [];
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]["商品A"])
            dataSet.push(data[i]["商品A"]);
        }
        barElements = d3.select("#myGraph")
            .selectAll("rect")
            .data(dataSet)

        barElements
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("width", function(d, i) {
                return d;
            })
            .attr("height", "20")
            .attr("x", "0")
            .attr("y", function(d, i) {
                return i * 25
            })

        barElements
            .attr("width", function(d, i) {
                return d;
            })

        barElements
            .exit()
            .remove()
    })
})
