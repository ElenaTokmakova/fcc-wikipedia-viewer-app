$(document).ready(function() {

    //http://jqueryui.com/autocomplete/#remote-jsonp
    //https://w3lessons.info/2015/03/01/autocomplete-search-using-wikipedia-api-and-jquery-ui/
    $("#request").autocomplete({
    
        source: function(request, response) {        
            $.ajax({        
                url: "https://en.wikipedia.org/w/api.php",        
                dataType: "jsonp",        
                data: {        
                    'action': "opensearch",        
                    'format': "json",        
                    'search': request.term        
                },
                success: function(data) {
                     response(data[1]);
                }        
            });        
        }        
    });

    //https://www.udacity.com/course/intro-to-ajax--ud110
    function loadArticles() {

    var keywords = $('#request').val();    
    var wikiBaseUrl = 'https://en.wikipedia.org/w/api.php?format=json&callback=wikiCallback&action=opensearch&search=';
    var wikiUrl = wikiBaseUrl + keywords;
    $("#error-message").html("");
    $("#wikipedia-articles").html("");

    var wikiRequestTimeout = setTimeout(function(){
        $("#error-message").html('Could not load wikipedia links');
    }, 8000);

    $.ajax({
      url: wikiUrl,
      dataType: "jsonp",
      //jsonp: "callback"
      success: function(articles) {
        var articlesTitle = articles[1];
        var articlesText = articles[2];
        var articlesLinks = articles[3];

        for (var i = 0; i < articlesTitle.length; i++) {
                //articleStr = articlesTitle[i];
                var article = '<li><a href="' + articlesLinks[i] + '" target="_blank"><h3>' + articlesTitle[i] + '</h3><p>' + articlesText[i] + '</p></a></li>';                
                $("#wikipedia-articles").append(article);
        };

        clearTimeout(wikiRequestTimeout);

      }  
      
    });    

    return false;

    };

    $('#form-container').submit(loadArticles);  

});

