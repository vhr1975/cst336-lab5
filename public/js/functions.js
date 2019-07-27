/**
 * Class: CST-336
 * Lab 5: Express, Embedded JavaScript (EJS), Request, and MySQl
 * Authors:
 * - Victor Ramirez
 **/

$(document).ready(function(){

    $(".favoriteIcon").on("click", function()
    {

        // alert("it works!");
        if($(this).attr("src") == "img/fav_off.png") 
        {
            $(this).attr("src", "img/fav_on.png");            
        }// if
        else
        {
            $(this).attr("src", "img/fav_off.png");            
        }// else        

    }); // on click

});// doc ready