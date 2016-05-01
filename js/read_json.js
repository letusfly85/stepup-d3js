var svgWidth = 320;
var svgHeight = 240;
var offsetX = 30;
var offsetY = 20;
var scale = 2.0;

var dataSet = [
	[
		{ year : 2004, value : 10 },
		{ year : 2005, value : 47 },
		{ year : 2006, value : 65 },
		{ year : 2007, value : 8 },
		{ year : 2008, value : 64 },
		{ year : 2009, value : 99 },
		{ year : 2010, value : 75 },
		{ year : 2011, value : 22 },
		{ year : 2012, value : 63 },
		{ year : 2013, value : 80 }
	],
	[
		{ year : 2004, value : 90 },
		{ year : 2005, value : 77 },
		{ year : 2006, value : 55 },
		{ year : 2007, value : 48 },
		{ year : 2008, value : 64 },
		{ year : 2009, value : 90 },
		{ year : 2010, value : 85 },
		{ year : 2011, value : 42 },
		{ year : 2012, value : 13 },
		{ year : 2013, value : 40 }
	],
	[
		{ year : 2004, value : 50 },
		{ year : 2005, value : 27 },
		{ year : 2006, value : 45 },
		{ year : 2007, value : 58 },
		{ year : 2008, value : 84 },
		{ year : 2009, value : 70 },
		{ year : 2010, value : 45 },
		{ year : 2011, value : 22 },
		{ year : 2012, value : 30 },
		{ year : 2013, value : 90 }
	]
];

var margin = svgWidth / (dataSet[0].length - 1);
drawGraph(dataSet[0], "itemA", "basis");
drawGraph(dataSet[1], "itemB", "basis");
drawGraph(dataSet[2], "itemC", "basis");
drawScale();

function drawGraph(ds, cssClassName, type) {
	var area = d3.svg.area()
		.x(function(d, i) {
			return offsetX + i * margin;
		})
		.y0(function(d, i) {
			return svgHeight - offsetY;	
		})
		.y1(function(d, i) {
			return svgHeight - (d.value * scale) - offsetY;
		})
                .interpolate(type)

	var lineElements = d3.select("#myGraph")
		.append("path")
		.attr("class", "line "+cssClassName)
		.attr("d", area(ds))
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

	var xScale = d3.time.scale()
		.domain([new Date("2004/1/1"), new Date("2013/1/1")])
		.range([0, svgWidth])

	d3.select("#myGraph")
		.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + offsetX +", "+(svgHeight - offsetY)+")")
		.call(
				d3.svg.axis()
				.scale(xScale)
				.orient("bottom")
				.ticks(10)
				.tickFormat(function(d, i) {
					var fmtFunc = d3.time.format("%Y/%m");
					return fmtFunc(d);
				})
		     )
		.selectAll("text")
		.attr("transform", "rotate(90)")
		.attr("dx", "0.7em")
		.attr("dy", "-0.4em")
		.style("text-anchor", "start")

		d3.select("#myGraph")
		.append("rect")
		.attr("class", "axis_x")
		.attr("width", svgWidth)
		.attr("height", 1)
		.attr("transform", "translate("+offsetX+", "+(svgHeight-offsetY-0.5)+")")
}
