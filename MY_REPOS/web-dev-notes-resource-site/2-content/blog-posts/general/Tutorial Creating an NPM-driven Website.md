# Tutorial: Creating an NPM-driven Website

> In this tutorial, we will show you how you can use npm to develop a small web application. We will start from scratch - we will set up a package.json, install a bunch of libraries and make things work nicely together.

A few weeks ago, the jQuery plugins website, which developers used to find and download plugins for the popular client-side library, was switched to read-only mode. Developers are now encouraged to use npm to publish and search for jQuery plugins.

This demonstrates how central npm has become to the JavaScript community. It originally arose as the package manager for node.js, but quickly proved itself versatile for any kind of JavaScript code, and developers started using it to host client-side libraries as well.

In this tutorial, we will show you how you can use npm to develop a small web application. We will start from scratch - we will set up a package.json, install a bunch of libraries and make things work nicely together.

How to install and use client-side libraries with npm
-----------------------------------------------------

There are [two ways to do this](http://blog.npmjs.org/post/112064849860/using-jquery-plugins-with-npm). We are going to use the simpler one, which is a great fit for small websites and apps:

1.  We will install the libraries that we need with npm. You can see a bunch of [jQuery plugins](https://www.npmjs.com/browse/keyword/jquery-plugin) here. To install one of them, run the command `npm install <package-name> --save`
2.  npm creates the **node\_modules** folder and places the libraries there.
3.  In our HTML file, we include the scripts and CSS files directly from the node\_modules folder with <script> and <link> tags.
4.  When the time comes to put your web site/app online, just upload the node\_modules folder together with the other files.

This is similar to how [Bower](https://bower.io/) works, but has the benefit that we are only using npm without installing additional package managers.

Setting things up
-----------------

We are ready to start coding! However, there are a few things that you have to do first:

1.  Make sure that you have node.js installed. If you don't, [download an installer](https://nodejs.org/download/) for your OS and run it. This will also set up npm for you.
2.  Create a new empty folder for your new website. As an example, we will use `project-folder` throughout this tutorial.
3.  Open a terminal (or a command prompt if you are on Windows) and navigate to the project folder (cd is your friend!).
4.  Type `npm init`. This will create an empty `package.json` file. Press enter to use the defaults, if you don't know what info to supply.

Great! Now you've got an empty folder with a valid package.json inside it. package.json is a special file which is used by npm to write down the libraries you've installed so far, and details about your project.

Let's install some libraries
----------------------------

We are going to make a simple web app that will visualize addresses using Google Maps, and will let people save addresses in their browser's localStorage. For this purpose, we will need a bunch of libraries which are available on npm:

npm install bootswatch gmaps jquery moment 

This will download and write to node\_modules [Bootswatch](https://bootswatch.com/) (Bootstrap with pretty themes applied), [gmaps](https://github.com/hpneo/gmaps) (an easy way for working with Google Maps), jQuery and [moment.js](http://momentjs.com/) (library for working with [date and time in JavaScript](https://tutorialzine.com/2012/08/quick-tip-handle-date-and-time-like-a-boss-with-moment-js/ "Quick Tip: Handle Date and Time Like a Boss with moment.js")). The --save flag will write them to package.json in addition to downloading them.

All that is left is to include these libraries in your HTML.

[![Screen-Shot-2015-03-30-at-2.14.15-PM.png](https://tutorialzine.com/media/2015/03/Screen-Shot-2015-03-30-at-2.14.15-PM.png)](https://tutorialzine.com/media/2015/03/Screen-Shot-2015-03-30-at-2.14.15-PM-e1427714165209.png)

Tutorialzine NPM-Driven Website

The HTML
--------

We have a basic HTML5 document with a few Bootstrap components. Notice how we've included the bootswatch stylesheet and the libraries by directly specifying their path inside the node\_modules folder.

### index.html

<!DOCTYPE html>
<html\>
<head lang\="en"\>
  <meta charset\="UTF-8"\>
  <title\>Creating an Npm-driven Website</title\>
  <link href\="node\_modules/bootswatch/flatly/bootstrap.min.css" type\="text/css" rel\="stylesheet" />
  <link href\="assets/css/styles.css" type\="text/css" rel\="stylesheet" />
</head\>
<body\>

  <div class\="container"\>

    <h1\>Your Google Maps Locations</h1\>

    <form id\="geocoding\_form" class\="form-horizontal"\>
      <div class\="form-group"\>
        <div class\="col-xs-12 col-md-6 col-md-offset-3"\>
          <div class\="input-group"\>
            <input type\="text" class\="form-control" id\="address" placeholder\="Enter your location..."\>
            <span class\="input-group-btn"\>
              <span class\="glyphicon glyphicon-search" aria-hidden\="true"\></span\>
            </span\>
          </div\>
        </div\>
      </div\>
    </form\>

    <div class\="map-overlay"\>
      <p\>Loading...</p\>
      <div id\="map"\></div\>
    </div\>
    <div class\="col-xs-12 col-md-6 col-md-offset-3 save-container"\>
      <h4 id\="save-location"\></h4\>
      <span class\="glyphicon glyphicon-star-empty" aria-hidden\="true"\></span\>
    </div\>

    <div class\="list-group col-xs-12 col-md-6 col-md-offset-3"\>
      <span class\="list-group-item active"\>Saved Locations</span\>
    </div\>

  </div\>

  
  <script src\="node\_modules/jquery/dist/jquery.min.js"\></script\>

  
  <script src\="node\_modules/moment/moment.js"\></script\>

  
  <script src\="http://maps.google.com/maps/api/js?sensor=true"\></script\>
  <script src\="node\_modules/gmaps/gmaps.js"\></script\>

  
  <script src\="assets/js/script.js"\></script\>

</body\>
</html\>

I have chosen the modern-looking Flatly theme from Bootswatch, which we installed a moment ago. In the HTML you can also see some of Bootstrap's grid classes, along with a list group for presenting the favorite locations.

The JavaScript
--------------

Our JavaScript file will handle saving to and reading from [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), creating Google Maps using the Gmaps library and converting from addresses to geographic coordinates. You can see the entire file below.

### assets/js/script.js

$(function(){

    var saveContainer = $('.save-container'),
        favoriteIcon = saveContainer.find('.glyphicon'),
        favoriteLocationsListGroup = $('.list-group');

    var hasFavoriteLocations = false;

    

    var map = new GMaps({
        el: '#map',
        lat: '0',
        lng: '0',
        zoom: 1
    });

    

    if(!localStorage.hasOwnProperty('favorite-locations')) {
        localStorage.setItem('favorite-locations', JSON.stringify(\[\]));
    }

    hasFavoriteLocations = JSON.parse(localStorage.getItem('favorite-locations')).length ? true : false;

    
    $('.glyphicon-search').click(showLocationByAddress);
    $('#geocoding\_form').submit(showLocationByAddress);

    
    $(document).on('click','a.list-group-item', showLocationByCoordinates);

    
    $(document).on('click', '.glyphicon-star', removeFavoriteLocation);
    $(document).on('click', '.glyphicon-star-empty', saveFavoriteLocation);

    

    if(hasFavoriteLocations) {

        var array = JSON.parse(localStorage.getItem('favorite-locations'));

        favoriteLocationsListGroup.empty();
        favoriteLocationsListGroup.append('<span class="list-group-item active">Saved Locations</span>');

        array.forEach(function(item){
            favoriteLocationsListGroup.append('<a class="list-group-item" data-lat="'+item.lat+'" data-lng="'+item.lng+'" data-createdAt="'+item.createdAt+'">'+item.address+'<span class="createdAt">'+moment(item.createdAt).fromNow()+'</span><span class="glyphicon glyphicon-menu-right"></span></a>');
        });

        favoriteLocationsListGroup.show();

    }

    

    function showLocationByAddress(e) {

        e.preventDefault();

        

        GMaps.geocode({
            address: $('#address').val().trim(),
            callback: function(results, status) {

                if (status !== 'OK') return;

                var latlng = results\[0\].geometry.location,
                    fullAddress = results\[0\].formatted\_address,
                    isLocationFavorite = false,
                    locationsArray = JSON.parse(localStorage.getItem('favorite-locations')),
                    saveLocation = $('#save-location');

                var map = new GMaps({
                    el: '#map',
                    lat: latlng.lat(),
                    lng: latlng.lng()
                });

                

                map.addMarker({
                    lat: latlng.lat(),
                    lng: latlng.lng()
                });

                

                if(locationsArray.length) {
                    locationsArray.forEach(function (item) {
                        if (item.lat == latlng.lat() && item.lng == latlng.lng()) {
                            isLocationFavorite = true;
                        }
                    });
                }

                
                saveLocation.text(fullAddress).attr({'data-lat': latlng.lat(), 'data-lng': latlng.lng()});

                
                favoriteLocationsListGroup.find('a.list-group-item').removeClass('active-location');

                

                if(!isLocationFavorite) {
                    favoriteIcon.removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                }
                else {

                    
                    favoriteIcon.removeClass('glyphicon-star-empty').addClass('glyphicon-star');

                    
                    

                    favoriteLocationsListGroup.find('a.list-group-item\[data-lat="'+latlng.lat()+'"\]\[data-lng="'+latlng.lng()+'"\]').addClass('active-location');
                }

                
                saveContainer.show();

            }

        });
    }

    
    

    function showLocationByCoordinates(e) {

        e.preventDefault();

        var elem = $(this),
            location = elem.data();

        

        GMaps.geocode({
            location: {lat: location.lat, lng: location.lng},
            callback: function(results, status) {

                if (status !== 'OK') return;

                var fullAddress = results\[0\].formatted\_address,
                    saveLocation = $('#save-location');

                var map = new GMaps({
                    el: '#map',
                    lat: location.lat,
                    lng: location.lng
                });

                map.addMarker({
                    lat: location.lat,
                    lng: location.lng
                });

                
                

                saveLocation.text(fullAddress);
                saveLocation.attr({
                    'data-lat': location.lat,
                    'data-lng': location.lng
                });

                
                

                favoriteLocationsListGroup.find('a.list-group-item').removeClass('active-location');
                favoriteLocationsListGroup.find('a.list-group-item\[data-lat="'+location.lat+'"\]\[data-lng="'+location.lng+'"\]').addClass('active-location');

                
                favoriteIcon.removeClass('glyphicon-star-empty').addClass('glyphicon-star');

                
                saveContainer.show();

                
                $('#address').val('');

            }

        });

    }

    

    function saveFavoriteLocation(e){

        e.preventDefault();

        var saveLocation = $('#save-location'),
            locationAddress = saveLocation.text(),
            isLocationFavorite = false,
            locationsArray = JSON.parse(localStorage.getItem('favorite-locations'));

        var location = {
            lat: saveLocation.attr('data-lat'),
            lng: saveLocation.attr('data-lng'),
            createdAt: moment().format()
        };

        

        if(locationsArray.length) {
            locationsArray.forEach(function (item) {
                if (item.lat == location.lat && item.lng == location.lng) {
                    isLocationFavorite = true;
                }
            });
        }

        
        

        if(!isLocationFavorite) {

            favoriteLocationsListGroup.append(
                '<a class="list-group-item active-location" data-lat="'+location.lat+'" data-lng="'+location.lng+'" data-createdAt="'+location.createdAt+'">'+
                locationAddress+'<span class="createdAt">'+moment(location.createdAt).fromNow()+'</span>' +
                '<span class="glyphicon glyphicon-menu-right"></span>' +
                '</span></a>');

            favoriteLocationsListGroup.show();

            
            locationsArray.push({
                address: locationAddress,
                lat: location.lat,
                lng: location.lng,
                createdAt: moment().format()
            });

            localStorage.setItem('favorite-locations', JSON.stringify(locationsArray));

            
            favoriteIcon.removeClass('glyphicon-star-empty').addClass('glyphicon-star');

            
            hasFavoriteLocations = true;
        }

    }

    
    

    function removeFavoriteLocation(e){

        e.preventDefault();

        var saveLocation = $('#save-location'),
            isLocationDeleted = false,
            locationsArray = JSON.parse(localStorage.getItem('favorite-locations'));

        var location = {
            lat: saveLocation.attr('data-lat'),
            lng: saveLocation.attr('data-lng')
        };

        
        if(locationsArray.length) {
            locationsArray.forEach(function (item, index) {
                if (item.lat == location.lat && item.lng == location.lng) {
                    locationsArray.splice(index,1);
                    isLocationDeleted = true;
                }
            });
        }

        if(isLocationDeleted) {

            

            favoriteLocationsListGroup.find('a.list-group-item\[data-lat="'+location.lat+'"\]\[data-lng="'+location.lng+'"\]').remove();

            localStorage.setItem('favorite-locations', JSON.stringify(locationsArray));

            
            favoriteIcon.removeClass('glyphicon-star').addClass('glyphicon-star-empty');

            if(!locationsArray.length) {

                

                hasFavoriteLocations = false;
                favoriteLocationsListGroup.hide();
            }
            else {
                hasFavoriteLocations = true;
            }

        }

    }

});

The CSS
-------

We mostly rely on Bootstrap with the Flatly theme to do the styling for us. However I did write a few additional CSS rules, which you can see in **assets/css/styles.css** in the downloadable zip with the source code.

To wrap it up
-------------

This concludes our tutorial! Npm has a huge number of JavaScript libraries, a lot of which are usable in the browser directly (for the rest we have [Browserify](http://browserify.org/), but this is a topic for another article). Do you think you will use npm in your client side development? Share your thoughts in our comment section.

###### **Bootstrap Studio**

The revolutionary web design tool for creating responsive websites and apps.

[Learn more](#)


[Source](https://tutorialzine.com/2015/03/npm-driven-website)