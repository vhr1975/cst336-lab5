    /*
        Return random image URLs from an API
        @param string keyword - search term
        @param int imageCount - number of random images
        @return array or image URLs
    */ 
module.exports = 
{

    getRandomImages_cb: function (keyword, imageCount, callback)
    {

        var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=87deea8bf0db05f15dc94780a1b0353a53f4da628290e91042928a8bfded2050&orientation=landscape";

        request(requestURL, function(error, response, body) 
        {
            if (!error) 
            {
                var parseData = JSON.parse(body);

                var imageURLs = [];

                for (let i = 0; i < 9; i++) 
                {

                    imageURLs.push(parseData[i].urls.regular);
                } // for

                //console.log(imageURLs);

                // return imageURLs;    
                callback(imageURLs);

            } // if
            else 
            {
                console.log("error", error);

            } // else

        }); // request

    }, // function

    /*
    Return random image URLs from an API
    @param string keyword - search term
    @param int imageCount - number of random images
    @return array or image URLs
    */ 
   getRandomImages: function (keyword, imageCount)
    {

        var requestURL = "https://api.unsplash.com/photos/random?query=" + keyword + "&count=" + imageCount + "&client_id=87deea8bf0db05f15dc94780a1b0353a53f4da628290e91042928a8bfded2050&orientation=landscape";

        return new Promise ( function (resolve, reject)
        {
            request(requestURL, function(error, response, body)
            {
                if (!error) 
                {
                    var parseData = JSON.parse(body);

                    var imageURLs = [];

                    for (let i = 0; i < 9; i++) 
                    {
                        imageURLs.push(parseData[i].urls.regular);
                    } // for

                    //console.log(imageURLs);
                    // return imageURLs;    
                    // resolve promise
                    resolve(imageURLs);                

                } // if
                else 
                {
                    console.log("error", error);
                } // else

            }); // request

        }); // promise

    }// function

} // module