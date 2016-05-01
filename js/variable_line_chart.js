var svgWidth = 320;
var svgHeight = 240;
var offsetX = 30;
var offsetY = 20;
var scale = 2.0;

var dataSet1 = [10, 47, 65, 8,  64, 99, 75, 22, 63, 80];
var dataSet2 = [90, 77, 55, 48, 64, 90, 85, 42, 13, 40];
var dataSet3 = [50, 27, 45, 58, 84, 70, 45, 22, 30, 90];

var margin = svgWidth / (dataSet1.length - 1);

drawGraph(dataSet1, "itemA", "linear");
drawGraph(dataSet2, "itemB", "basis");
drawGraph(dataSet3, "itemC", "step");
drawScale();

function drawGraph(dataSet, cssClassName, type) {
	var line = d3.svg.area()
		.x(function(d, i) {
			return offsetX + i * margin;
		})
		.y0(function(d, i) {
			return svgHeight - offsetY;	
		})
		.y1(function(d, i) {
			return svgHeight - (d * scale) - offsetY;
		})
                .interpolate(type)

	var lineElements = d3.select("#myGraph")
		.append("path")
		.attr("class", "line "+cssClassName)
		.attr("d", line(dataSet))
}

function drawScale() {
	var yScale = d3.scale.linear()
		.domain([0, 100])
		.range([scale*100, 0])

		d3.select("#myGraph")
		.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX + ", "+offsetY+")")
		.call(
				d3.svg.axis()
				.scale(yScale)
				.orient("left")
		     )

		d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", svgWidth)
		.attr("height", 1)
		.attr("transform", "translate("+offsetX+", "+(svgHeight-offsetY-0.5)+")")
}
