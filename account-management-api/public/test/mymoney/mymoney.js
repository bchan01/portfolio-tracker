var dataset;

//Define bar chart function 
	function barChart(dataset){	

		//Set width and height as fixed variables
		var w = 520;
		var h = 500;
		var padding = 25;

		//Scale function for axes and radius
		var yScale = d3.scale.linear()
						.domain(d3.extent(dataset, function(d){return d.have;}))
						.range([w+padding,padding]);

		var xScale = d3.scale.ordinal()
						.domain(dataset.map(function(d){ return d.name;}))
						.rangeRoundBands([padding,h+padding],.5);

		//To format axis as a 2 decimal place
		var formatPercent = d3.format(".2f");


		//Create y axis
		var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5).tickFormat(formatPercent);

		//Define key function
		var key = function(d){return d.name};

		//Define tooltip for hover-over info windows
		var div = d3.select("body").append("div")   
  							.attr("class", "tooltip")               
  							.style("opacity", 0);

		//Create svg element
		var svg = d3.select("#chart-container").append("svg")
				.attr("width", w).attr("height", h)
				.attr("id", "chart")
				.attr("viewBox", "0 0 "+w+ " "+h)
				.attr("preserveAspectRatio", "xMinYMin");
		
		//Resizing function to maintain aspect ratio (uses jquery)
		var aspect = w / h;
		var chart = $("#chart");
			$(window).on("resize", function() {
			    var targetWidth = $("body").width();
			   	
	    		if(targetWidth<w){
	    			chart.attr("width", targetWidth); 
	    			chart.attr("height", targetWidth / aspect); 			
	    		}
	    		else{
	    			chart.attr("width", w);  
	    			chart.attr("height", w / aspect);	
	    		}

			});


		//Initialize state of chart according to drop down menu
		var state = d3.selectAll("option");

		//Create barchart
		svg.selectAll("rect")
			.data(dataset, key)
			.enter()
		  	.append("rect")
		    .attr("class", function(d){return d.have < 0 ? "negative" : "positive";})
		    .attr({
		    	x: function(d){
		    		return xScale(d.name);
		    	},
		    	y: function(d){
		    		return yScale(Math.max(0, d.have)); 
		    	},
		    	width: xScale.rangeBand(),
		    	height: function(d){
		    		return Math.abs(yScale(d.have) - yScale(0)); 
		    	}
		    })
		    .on('mouseover', function(d){
							d3.select(this)
							    .style("opacity", 0.2)
							    .style("stroke", "black")
					
					var info = div
							    .style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
							    .text(d.name);
						info.append("p")
							    .text(formatPercent(d.have));
						})
        				.on('mouseout', function(d){
        					d3.select(this)
							.style({'stroke-opacity':0.5,'stroke':'#a8a8a8'})
							.style("opacity",1);

							div
	    						.style("opacity", 0);
        				});
		//Add y-axis
		svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(40,0)")
				.call(yAxis);

		
	};

	//Load data and call bar chart function 
		d3.csv("data.csv", function(error,data){
				if(error){
					console.log(error);
				}
				else{
					data.forEach(function(d) {
						d.have = parseFloat(d.have);
					});
					dataset=data;
					barChart(dataset);
				}
			});