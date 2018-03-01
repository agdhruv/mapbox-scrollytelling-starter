mapboxgl.accessToken = 'pk.eyJ1IjoiYWdkaHJ1diIsImEiOiJjamR5aXI1N2EwM3VvMndtb3o1NWFsOHJhIn0.wZx6N5iVJpMdNUC94DOZbg';

var chapters = {
    'part-0': {
        center: [82.8, 23.88],
        zoom: 4,
        bearing: 0,
        pitch: 0,
    },
    'part-1': {
        center: [77.766, 28.722],
        zoom: 6.4,
        bearing: 0,
        pitch: 0,
    },
    'part-2': {
        center: [86.126, 23.924],
        zoom: 5.9,
        bearing: 0,
        pitch: 0,
    },
    'part-3': {
        center: [79.207, 14.425],
        zoom: 5.5,
        bearing: 0,
        pitch: 0,
    },
    'part-4': {
        center: [75.839, 20.890],
        zoom: 6.2,
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

    if ((!left_out) && (chapterName !== 'chapter-0')) {
        // the left panel comes in
        $('.extra-information').show().animate({
            width: '20%'
        });
        // simultaneously, the map is pushed to the right
        $('#map').animate({
            'margin-left': '20%'
        });
    }
    else {
        // the left panel goes back
        $('.extra-information').show().animate({
            width: '20%'
        });
        // simultaneously, the map is pushed back to the left
        $('#map').animate({
            'margin-left': '20%'
        });
    }

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

    return elementTop < viewportBottom && elementBottom > viewportTop;
}




