/**
 * Class: CST-336
 * Lab 5: Express, Embedded JavaScript (EJS), Request, and MySQl
 * Authors:
 * - Victor Ramirez
 **/

 /*
    AJax functions to execute once the document is loaded
*/
$(document).ready(function() {
    /*
        function to toggle the fav icon on and off
    */
    $(".favoriteIcon").on("click", function() {

        // alert($(this).prev().attr("src"));

        var imageURL = $(this).prev().attr("src");

        if ($(this).attr("src") == "img/fav_off.png") {
            $(this).attr("src", "img/fav_on.png");
            updateFavorite("add", imageURL); // insert new record
        } // if
        else {
            $(this).attr("src", "img/fav_off.png");
            updateFavorite("delete", imageURL); // delete a record
        } // else        

    }); // on favorite icon click

    $(".keywordLink").on("click", function() {

        // alert($(this).text().trim());

        $.ajax({
            method: "get",
            url: "/api/displayFavorites",
            data: {
                "keyword" : $(this).text().trim(),
            } // data

        }); // ajax

    }); // on keyword click

    /*
        function to update the db
    */
    function updateFavorite(action, imageURL) {

        $.ajax({
            method: "get",
            url: "/api/updateFavorites",
            data: {
                "imageURL": imageURL,                
                "keyword" : $("#keyword").val(), 
                "action" : action
            } // data

        }); // ajax

    } // function

}); // doc ready