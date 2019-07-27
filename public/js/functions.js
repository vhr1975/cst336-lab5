import { get } from "https";

/**
 * Class: CST-336
 * Lab 5: Express, Embedded JavaScript (EJS), Request, and MySQl
 * Authors:
 * - Victor Ramirez
 **/

 /*
    function to toggle the fav icon on and off
 */
$(document).ready(function () {

	$(".favoriteIcon").on("click", function () {

        // alert($(this).prev().attr("src"));

        var imageURL = $(this).prev().attr("src");
        
		if ($(this).attr("src") == "img/fav_off.png") {
            $(this).attr("src", "img/fav_on.png");
            updateFavorite(imageURL);            
		} // if
		else {
            $(this).attr("src", "img/fav_off.png");
            
		} // else        

    }); // on click
    
    function updateFavorite (imageURL){

        $.ajax({
            method: "get",
            url: "/api/updateFavorites",
            data: {"imageURL" : imageURL, "keyword" : "coming soon!"}
        }); // ajax
        
    } // function

}); // doc ready