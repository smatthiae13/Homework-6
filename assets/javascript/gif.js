$("button").on("click", function () {
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=40";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);


        var results = response.data;


        for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            var rating = results[i].rating;

            var p = $("<p>").text("rating: " + rating)

            var still = results[i].images.fixed_height_still.url;
            var active = results[i].images.fixed_height.url
            var animalImage = $("<img>");
            animalImage.attr({
                "active": active,
                "still": still,
                "src": still,
                "state": "still"
            });




            $("img").on("click", function (event) {
                event.preventDefault;

                var state = $(this).attr("data-state");
                var source = $(this).attr("src");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            })
            // animalImage.attr("data-state", "still");
            // animalImage.attr("data-still", still);
            // animalImage.attr("data-animate", animated);
            animalDiv.append(p);
            animalDiv.append(animalImage);

            $("#gifs-appear-here").prepend(animalDiv);


            $("#more-animals").on("click", function (event) {
                event.preventDefault;

                var moreAnimals = $("#more-animals").val().trim();
                moreAnimals.append(animalDiv);
                $("#my-buttons").append(moreAnimals);

            })


        }

    });

});