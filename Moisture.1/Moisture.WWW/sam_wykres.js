var buyerData = {
			labels: ["One", "Two"],
			datasets: [
			{
				fillColor : "rgba(172,194,132,0.4)",
				strokeColor : "#ACC26D",
				pointColor : "#fff",
				pointStrokeColor : "#9DB86D",
				data : [203,506]
			}]}
		//var buyers = document.getElementById("buyers").getContext("2d");
		//new Chart(buyers).Line();
		var ctx = new Chart(document.getElementById("buyers").getContext("2d")).Line(buyerData);
	