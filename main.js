mapboxgl.accessToken = 'pk.eyJ1IjoiYWdkaHJ1diIsImEiOiJjamR5aXI1N2EwM3VvMndtb3o1NWFsOHJhIn0.wZx6N5iVJpMdNUC94DOZbg';

var chapters = {
    'part-0': {
        center: [78.558, 22.801],
        zoom: 4,
        bearing: 0,
        pitch: 0,
    },
    'part-1': {
        center: [78.766, 28.722],
        zoom: 5.8,
        bearing: 0,
        pitch: 0,
    },
    'part-2': {
        center: [86.126, 23.924],
        zoom: 5.8,
        bearing: 0,
        pitch: 0,
    },
    'part-3': {
        center: [79.207, 14.425],
        zoom: 5.0,
        bearing: 0,
        pitch: 0,
    },
    'part-4': {
        center: [75.839, 20.890],
        zoom: 6.0,
        bearing: 0,
        pitch: 0,
    }
};


var map;

window.onload = function() {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/agdhruv/cjdzvllgs4esn2rqf99x8gu74',
        center: [82.8, 23.88],
        zoom: 4,
        bearing: 0,
        pitch: 0,
    });

    // $.get('/data/population-top-25.geojson', (res) => {
    //     var geojsonData = JSON.parse(res);

    //     for (var i = 0; i < geojsonData["features"].length; i++) {
    //         var coordinates = geojsonData["features"][i]["geometry"]["coordinates"];
    //         var place = geojsonData["features"][i]["properties"]["city"];
            
    //         var popup = new mapboxgl.Popup({closeOnClick: false})
    //             .setLngLat(coordinates)
    //             .setHTML(`<h3>${place}</h3>`)
    //             .addTo(map);
    //     }
        
    // });

    map.on('click', 'population-top-25', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var place = e.features[0].properties.city;
        var pop_2011 = e.features[0].properties.pop_2011;
        var pop_2001 = e.features[0].properties.pop_2001;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup({closeOnClick: true})
            .setLngLat(coordinates)
            .setHTML(`<h4>${place}</h4><h5>Population in 2001: ${pop_2001}</h5><h5>Population in 2011: ${pop_2011}</h5>`)
            .addTo(map);
    });
}

$(document).ready(function(){

    // On every scroll event, check which element is on screen
    $('div#scroll').on('scroll', function() {
        var chapterNames = Object.keys(chapters);

        for (var i = 0; i < chapterNames.length; i++) {
            var chapterName = chapterNames[i];
            if (isElementOnScreen(chapterName)) {
                setActiveChapter(chapterName);
                break;
            }
        }
    });

});

var activeChapterName = 'part-0';
var left_out = false;

function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(chapters[chapterName]);

    // if ((!left_out) && (chapterName !== 'part-0')) {
    //     // the left panel comes in
    //     $('.extra-information').show().animate({
    //         width: '20%'
    //     });
    //     // simultaneously, the map is pushed to the right
    //     $('.map').animate({
    //         'margin-left': '20%'
    //     });
    //     left_out = true;
    // }
    // if ((left_out) && (chapterName === 'part-0')) {
    //     // the left panel goes back
    //     $('.extra-information').animate({
    //         width: '0%'
    //     }).hide();
    //     // simultaneously, the map is pushed back to the left
    //     $('.map').animate({
    //         'margin-left': '0%'
    //     });

    //     left_out = false;
    // }

    document.getElementById(chapterName).setAttribute('class', 'active');
    document.getElementById(activeChapterName).setAttribute('class', '');

    activeChapterName = chapterName;
}

function isElementOnScreen(id) {
    var elem = $(`#${id}`);
    var elementTop = elem.offset().top;
    var elementBottom = elementTop + elem.outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementTop < viewportBottom/2 && elementBottom > 2*viewportTop;
}




