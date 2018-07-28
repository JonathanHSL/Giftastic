//function to show Gifs!
function showGif(stills, animates, rating) {
	var newGif = $("<img src = '" + stills + "'>");
	var newDiv = $("<div>");
	newDiv.append("<p>Rating: " + rating + "</p>");
	newDiv.addClass("float-left m-2");
	newGif.addClass("gif-image");
	newGif.attr("state", "still");
	newGif.attr("still-data", stills);
	newGif.attr("animated-data", animates);
	newDiv.append(newGif);
	$("#giffys").append(newDiv);

}



//display the array of toons to the buttons!
function makeButtons() {
	for (var i = 0; i < toons.length; i++) {
		var gifButton = $("<button>");
		gifButton.addClass("btn");
		gifButton.addClass("cartoon-button");
		gifButton.text(toons[i]);
		$("#buttons").append(gifButton);
	}

	$(".cartoon-button").on("click", function () {

		$("#giffys").empty();
		createGifs($(this).text());
	});

}
//to add the new button into the array of topics.
function addButton(show) {
	if (toons.indexOf(show) === -1) {
		toons.push(show);
		$("#buttons").empty();
		makeButtons();

	}
}
//function for ajax to get the gifs from giphy api.
function createGifs(show) {
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + show +
			"&api_key=dFNnGXb85LkyR37i8qf9UDCN9Rt8z5Ym&rating=r&limit=10",
		method: "GET"
	}).then(function (response) {
		response.data.forEach(function (element) {
			showGif(element.images.fixed_height_still.url, element.images.fixed_height.url, element.rating.toUpperCase());

		});
		//if/else statement to animate or still the image by click function.
		
		
	});
}
$(document).on("click",".gif-image", function () {
	if ($(this).attr("state") === "still") {
		$(this).attr("state", "animated");
		$(this).attr("src", $(this).attr("animated-data"));
	}
	else {
		$(this).attr("state", "still");
		$(this).attr("src", $(this).attr("still-data"));
	}
});
//array of topics to appear on top of webpage.
var toons = ["Pokemon", "Batman", "Teenage Mutant Ninja Turtles", "Doug", "Rocket Power", "Recess", "Scooby Doo", "Garfield", "Pepper Anne", "Scooby-Doo", "Animaniacs", "Pinky and the Brain"];

//adds new cartoon to the button list of toons[].

$(document).ready(function () {
	makeButtons();
});

$(document).on("click","#submit", function (event) {
	event.preventDefault();
	if ($("#cartoon-show").val().trim() === "") {
		return;
	}
	//calling the addBUtton() for the value of the id.
	addButton($("#cartoon-show").val().trim());
	//shows the images when you submit a new cartoon instead of having to click the generated button.	
	createGifs($("#cartoon-show").val().trim());
	$("#cartoon-show").val("");
});
