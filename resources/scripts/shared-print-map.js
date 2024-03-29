var myAccessToken = "pk.eyJ1IjoiYWxpc3RlcmZ4IiwiYSI6ImNpcW80cnExOTAxZW9meW5uamNhdDIwcXcifQ.X8cJ7YP65MrR3bBq4a1rmQ";

if(!mapboxgl.supported()) {
    var JsUrl = '//api.mapbox.com/mapbox.js/v2.4.0/mapbox.js',
        cssUrl = '//api.mapbox.com/mapbox.js/v2.4.0/mapbox.css';

    loadScript(JsUrl, cssUrl, initJS);

} else {
    var JsUrl = 'https://api.mapbox.com/mapbox-gl-js/v0.38.0/mapbox-gl.js',
        cssUrl = 'https://api.mapbox.com/mapbox-gl-js/v0.38.0/mapbox-gl.css';

    loadScript(JsUrl, cssUrl, initGL);

}

function initJS() {
    L.mapbox.accessToken = myAccessToken;
    var map = L.mapbox.map('map', 'alisterfx.a4f587a5', { 
        scrollWheelZoom: false,
        zoomControl: true 
    }).setView([42.793385,-100.722656], 4);
    map.gridControl.options.follow = true;
    map.zoomControl.setPosition('topright');
    addGroupFunctionality(map, 'nonWebGL');
    if (map.tap) map.tap.disable();
    if (map.tap) map.dragging.disable();
}

function loadScript(sScriptSrc, cssSrc, oCallback) {
    /**
     * adapted from - http://stackoverflow.com/questions/11160948/how-to-know-if-jquery-has-finished-loading/11161045#11161045.1
     *
     */
    var oHead = document.getElementsByTagName('head')[0];
    var oScript = document.createElement('script');

    var oCss = document.createElement('link');
    oCss.href = cssSrc;
    oCss.rel = 'stylesheet';
    oHead.appendChild(oCss);

    // make sure callback isn't run more than once
    function runCallback() {
        if (oCallback) {
            oCallback();
            oScript.onload = oScript.onreadystatechange = null;
            oCallback = null;
        }
    }

    oScript.type = 'text/javascript';
    // most browsers
    oScript.onload = runCallback;
    // IE 6 & 7
    oScript.onreadystatechange = function() {
        if (this.readyState === 'complete') {
            runCallback();
        }
    };
    oScript.src = sScriptSrc;
    oHead.appendChild(oScript);
}


function initGL() {
    mapboxgl.accessToken = myAccessToken;
    var map = new mapboxgl.Map({
    		container: 'map',
    		style: 'mapbox://styles/mapbox/light-v9', //hosted style id
    	   	center: [-91.230469, 34.510218], // starting position
    	    minzoom: 3,
    	    maxzoom: 10,
    	    zoom: 1.75, //staring zoom
            bearing: 5,
            pitch: 45
    });
    if (map.tap) map.tap.disable();
    if (map.tap) map.dragging.disable();

    
    $(document).on('scroll.stopEvent', function() {
       var hT = $('.map').offset().top,
           hH = $('.map').outerHeight(),
           wH = $(window).height(),
           wS = $(this).scrollTop();
       if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)) {
            $(document).off('scroll.stopEvent');
            playback(0);
        }
    });

    function playback(index) {
        // Animate the map position based on camera properties
        map.flyTo({
            center: [-100.722656, 42.793385],
            zoom: 3,
            bearing: 0,
            pitch: 0,
            speed: 0.5, // make the flying slow
            curve: 1, // change the speed at which it zooms out
            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            easing: function (t) {
                return t;
            }
        });
    }

    // Add and style vector tiles from mapbox of shared collection data
     map.on('load', function () {
         map.addLayer({
            'id': 'shared_collection',
            'type': 'circle',
            //Load the vector tile source from mapbox
            'source': {
                type: 'vector',
                url: 'mapbox://alisterfx.bdmmk67p' //Your Mapbox tileset Map ID
            },
            'source-layer': 'Shared_Print_Retentions_by_Li-c5s569', //name of tileset
            'paint' : {
                'circle-radius' : {
                	property: 'total_count_num',
    	            type: 'interval',
    	            stops: [ 
                        [20000, 5],
                        [100000, 7.5],
                        [200000, 10],
                        [500000, 13.5],
                        [1408737, 17]
                    ]
                },
                'circle-color': {
                    property: 'group',
                    type: 'categorical',
                    stops: [
                        ['ALI', '#FF7F00'],
                        ['CI-CCI', '#beea7b'],
                        ['CNY', '#A6CEE3'],
                        ['COPPUL', '#33A02C'],
                        ['SCELC', '#036564'],
                        ['EAST', '#FB9A99'],
                        ['MI-SPI', '#FF4847'],
                        ['MSCS', '#FDBF6F'],
                        ['TUG', '#6A3D9A'],
                        ['VIVA', '#CAB2D6'],
                        ['WRLC', '#1F78B4']]
                },
                'circle-opacity' : 0.55
              },
        }); addGroupFunctionality(map, 'webGL');
    });

    // add nav features to the map
    map.addControl(new mapboxgl.NavigationControl({position: 'top-left'}));

    // disable map scrolling (i.e. zoom in/out on scroll)
    map.scrollZoom.disable();

    // Create a popup object, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    // add a info popup to map on hover 
    map.on('mouseenter', 'shared_collection', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var features = map.queryRenderedFeatures(e.point, { layers: ['shared_collection'] });
         // if the features has no info, return nothing
        if (!features.length) {
            return;
        }
        var feature = features[0];			        
        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(feature.geometry.coordinates)
             .setHTML('<div id="popup" class="popup"> <h2 class="popup-group-title"> ' + feature.properties.group + ' Group</h2><h3 class="popup-library-title"><strong>' + feature.properties.inst_name + '</strong></h3>' +
    	              '<ul>' +
    	              '<li class="popup-list"> Total titles retained: ' + feature.properties.total_count_string + ' </li>' +
    	              '<li class="popup-list"> Total titles uniquely retained: ' + feature.properties.unique_count_string + " </li></ul> </div>")
            .addTo(map);
    });

    map.on('mouseleave', 'shared_collection', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
}


function addGroupFunctionality(map, browser) {
    // Add group legend buttons, group name, description, participating members and links   
    var groupLegendElements = document.getElementById('group-legend-elements');
    var groupName = document.getElementById('group-name');
    var groupDescription = document.getElementById('group-description');
    var groupMemberName = document.getElementById('member-name');
    var groupWebsite = document.getElementById('group-website');
    var groupTwitter = document.getElementById('group-twitter');

    // Add the Overview title and description on page load
    groupName.textContent = libraries[0].title;
    groupDescription.textContent = libraries[0].description;
    var groupInfo = [{
            "group_name": "Overview",
            "group_color": "#666666",
            "group_count": "19.7M Titles"
        },
        {
            "group_name": "SCELC",
            "group_color": "#036564",
            "group_count": "1.2M"
        },
        {
            "group_name": "COPPUL",
            "group_color": "#33A02C",
            "group_count": "1.14M"
        },
        {
            "group_name": "CI-CCI",
            "group_color": "#beea7b",
            "group_count": "153K"
        },
        {
            "group_name": "ALI",
            "group_color": "#FF7F00",
            "group_count": "1.7M"
        },
        {
            "group_name": "MI-SPI",
            "group_color": "#FF4847",
            "group_count": "774K"
        },
        {
            "group_name": "TUG",
            "group_color": "#6A3D9A",
            "group_count": "340K"
        },
        {
            "group_name": "VIVA",
            "group_color": "#CAB2D6",
            "group_count": "3.5M"
        },
        {
            "group_name": "WRLC",
            "group_color": "#1F78B4",
            "group_count": "2.9M"
        },
        {
            "group_name": "CNY",
            "group_color": "#A6CEE3",
            "group_count": "850K"
        },
        {
            "group_name": "EAST",
            "group_color": "#FB9A99",
            "group_count": "5.75M"
        },
        {
            "group_name": "MSCS",
            "group_color": "#FDBF6F",
            "group_count": "1.4M"
        }
    ];

    // Iteratively create the group buttons 
    $.each(groupInfo, function(key, obj) {
        var groupDiv = document.createElement('div');
        $(groupDiv).addClass('group-div');
        $(groupDiv).addClass('group-div--' + obj.group_name);
        if (key == 0) {
          $(groupDiv).addClass('selected');
        }
        var groupCount = document.createElement('h6');
         $(groupCount).addClass('group_count');

        $.each(obj, function(key, value) {
            if (key === 'group_name') {
                $(groupDiv).html('<span>' + value + '</span>');
            } else if (key === 'group_count') {
                $(groupCount).text(value);
            }
        });

        $(groupDiv).on("click", function() {
            if (libraries[key].id == 12) {
                $('#member-library-label').hide();
                $('#group-links').hide();
            } else {
                $('#member-library-label').show();
                 $('#group-links').show();
            }

            $('#group-twitter').remove(); // remove the twitter icon from the last click event
            if ($('.member-list').length) { // remove former member lists icon from the last click event
                $('.member-list').remove();
            }

            if (browser == 'webGL') {
                map.flyTo(libraries[key].camera); // pan/zoom map to the appropriate group
            } else {
                map.setView(libraries[key].latLongJS, libraries[key].zoomJS, {animate: true, duration: 10, easeLinearity: 10});
            }
            
            $('.group-div').removeClass('selected');
            $(this).addClass('selected');     
            
            groupName.textContent = libraries[key].title;
            groupDescription.textContent = libraries[key].description;
            $('#group-website').attr("href", libraries[key].website);
           
            if (libraries[key].hasOwnProperty('twitter')) {
                var twitterLink = document.createElement('a');
                twitterLink.href = libraries[key].twitter;
                $(twitterLink).addClass( "group-description__twitter").attr('id', 'group-twitter').attr('target','_blank').attr('rel','noopener noreferrer').append('<svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>');
                document.getElementById('group-links').appendChild(twitterLink);
            }

            for (var i = 0; i < libraries[key].members.length; i++) {
                var groupMemberList = document.createElement('li');
                $(groupMemberList).addClass( "member-list");
                $(groupMemberList).attr('id', 'member-list');
                $(groupMemberList).text(libraries[key].members[i]);
                var groupMemberAnchor = document.createElement('a');
                $(groupMemberList).append(groupMemberAnchor);
                groupMemberAnchor.href = "#";
                document.getElementById('library-list').appendChild(groupMemberList);
            }

        });

        groupLegendElements.appendChild(groupDiv);
        groupDiv.appendChild(groupCount);
    });
}

var libraries = [{
        "id": "12",
        "title": "Shared Print Overview",
        "description": "Models and retention criteria vary according to local and regional priorities, but most of the committed titles are secured under formal Memoranda of Understanding (MOU) for 15 years, often with review every five years. In some respects, these are grass-roots activities, designed to address local needs, but it seems clear that these programs can contribute significantly to a federated national or international solution, such as that envisioned by the MLA’s Working Group on The Future of the Print Record.",
        "members": [],
        "camera": {
            center: [-100.722656, 42.793385],
            zoom: 3,
            bearing: 0,
            pitch: 0
        },
        "latLongJS": [42.793385,-100.722656],
        "zoomJS": 4
      },{
        "id": "11",
        "title": "SCELC",
        "description": "Statewide California Electronic Library Consortium (SCELC) was established in 1986 to develop resource-sharing among the libraries of private academic institutions in Southern California. SCELC brings together independent nonprofit academic and research institutions to foster innovation and collaboration in the acquisition and effective use of library resources and services.  The consortium is comprised of 14 academic and reseaerch libraries located in the state of California with a shared print collection of 4,866,476 million title holdings and 2,628,215 million title sets.  Due to their ongoing efforts for collective retention strategies SCELC has been able to retain a shared print collection of 1,199,670 milliion title-holdings, with 269,902 thousand of those titles being uniquely retained by this group. ",
        "members": ["Azusa Pacific University","California Lutheran University","California Institute of Technology","Claremont Colleges","Holy Names University","Loyola Marymount University","Mount Saint Mary's University","Occidental College",
                    "Pepperdine University","University of Redlands","Saint Mary's College","University of Southern California","University of San Diego","University of San Francisco"],
        "twitter": "https://twitter.com/scelc",
        "website": "https://scelc.org/",
        "camera": {
            center: [-119.597168, 35.830618],
            zoom: 4.8,
            bearing: 0,
            pitch: 0
        },
        "latLongJS": [35.5, -119.597168],
        "zoomJS": 6
      },{
        "id": "10",
        "title": "COPPUL",
        "description": "Working together, the Council of Prairie and Pacific University Libraries (COPPUL) members leverage their collective expertise, resources, and influence, increasing capacity and infrastructure, to enhance learning, teaching, student experiences, and research amongst their institutions. The consortium is comprised of 22 university libraries located in Manitoba, Saskatchewan, Alberta and British Columbia with a shared print collection of 7,276,328 million title holdings and 3,738,751 million title sets.  Due to their ongoing efforts for collective retention strategies COPPUL has been able to retain a shared print collection of 1,147,232 milliion title-holdings, with 847,918 thousand of those titles being uniquely retained by this group. ",
        "members": ["University of Calgary","University of Lethbridge","University of Manitoba","University of Regina","University of Saskatchewan","Simon Fraser University","Thompson Rivers University","Vancouver Island University","University of Victoria","University of Winnipeg"],
        "twitter": "https://twitter.com/coppul?lang=en",
        "website": "//www.coppul.ca/",
        "camera": {
            center: [-110.039063, 49.999795],
            zoom: 4.5,
            bearing: 0,
            pitch: 0
        },
        "latLongJS": [49.999795, -110.0390638],
        "zoomJS": 5
     }, {
        "id": "9",
        "title": "CI-CCI",
        "description": "The formation of the Central Iowa Collaborative Collections Initiative (CI-CCI) was announced in the summer of 2013, with an initial membership of 5 universities in the state.  By working together the CI-CCI group has been able to meet their goals of decreasing the size of local print collections by reducing duplication among the participating libraries and creating and maintaining a distributed, shared collection of these titles to ensure that circulating copies of them are retained within the group. Because of this CI-CCI has been able to retain 152,553 thousand title-holdings, with 989 of those titles being uniquely retained by this group. ",
        "members": ["Central College","Drake University","Grand View","Grinnell College","Simpson College"],
        "website": "https://ci-cci.org/",
        "camera": {
            center: [-93.144836, 41.553233],
            zoom: 7.6,
            bearing: 0,
            pitch: 0
        },
        "latLongJS": [41.553233, -93.144836],
        "zoomJS": 8
    }, {
        "id": "8",
        "title": "ALI",
        "description": "The mission of Academic Libraries of Indiana (ALI) is to build and foster community and collaboration among academic libraries in Indiana. ALI is a consortium of 37 participating libraries with a shared print collection of 5,512,435 million title holdings and 2,287,041 million title sets.  Due to their ongoing efforts for a state-wide academic library collaboration, the ALI project has been able to retain a shared print collection of 1,701,374 title-holdings, with 475,057 thousand of those titles being uniquely retained by this group. ", 
        "members": ["Anabaptist Mennonite Biblical Seminary (AMBS)", "Ancilla College", "Anderson Univ", "Butler University", "Concordia", "Christian Theological Seminary (CTS)", "DePauw University","Earlham College","Franklin College",
                    "Goshen College","Grace College","Hanover College","Huntington University","Indiana State University","Indiana University - Purdue University Fort Wayne","Indiana University School of Dentistry","Indiana University Kokomo",
                    "Indiana University School of Medicine","Indiana University Northwest","Indiana University Southeast","Indiana University Purdue University at Indianapolis","Manchester University","Marian University","Oakland City University",
                    "Purdue Calumet","Saint Mary's College","Saint Meinrad Seminary and School of Theology","Saint Joseph's College","Saint Mary-of-the-Woods College","Taylor University","Trine University","University of Indianapolis",
                    "University of Saint Francis","University of Southern Indiana","Valparaiso University","Wabash College"],
        "website": "//academiclibrariesofindiana.org/home",
        "camera": {
            center: [-86.149292, 39.769360],
            zoom: 5.2,
            bearing: 0,
            pitch: 0
        },
        "latLongJS": [39.769360, -85],
        "zoomJS": 6
    }, {
        "id": "7",
        "title": "MI-SPI",
        "description": "In 2011, the libraries at Michigan's publicly-supported universities sought to devise a collaborative approach to shared print collections among themselves, calling themselves the Michigan Shared Print Initiative (MI-SPI). Participating libraries used services and tools developed by Sustainable Collection Services (SCS) to identify such titles in their respective individual collections, and to compare results across the group. Eleven universities participated in this endeavor across Michigan state, allowing participating members to retain 774,173 thousand title-holdings, with 81,949 thousand of those titles being uniquely retained by this group.   ",
        "members": ["Central Michigan University","Eastern Michigan University","Ferris State University","Grand Valley State University","University of Michigan Dearborn","Michigan Technological University","Northern Michigan University",
                    "Oakland University","Saginaw Valley","Wayne State University","Western Michigan University"],
        "website": "https://www.mcls.org/engagement/mi-spi/",
        "camera": {
            center: [-85.253906, 44.570415],
            zoom: 4.8,
            bearing: 0,
            pitch: 0
        },
        "latLongJS": [44.78, -85.253906],
        "zoomJS": 6
    }, {
        "id": "6",
        "title": "TUG",
        "description": "The TriUniversity Group of Libraries (TUG) is a unique example of administrative co-operation among the Libraries of three Ontario universities: University of Guelph, Universtiy of Waterloo, and the Wilfred Laurier University.  The TUG libraries have been informally collaborating for nearly thirty years; however more recently, they have enhanced their co-operation with a more formalised agreement to work together to leverage rapidly-advancing technologies for mutual benefit. Because of their shared committment TUG has now been able to retain 340,279 thousand title-holdings, with 20,012 thousand of those titles being uniquely retained by this group. ",
        "members": ["University of Guelph","University of Waterloo","Wilfrid Laurier University"],
        "website": "https://www.tug-libraries.on.ca/",
        "camera": {
            center: [-80.362244, 43.488237],
            zoom: 8.5,
            bearing: 0,
            pitch: 0
        },
        "latLongJS": [43.488237, -80.362244],
        "zoomJS": 10
    }, {
        "id": "4",
        "title": "VIVA",
        "description": "The Virtual Library of Virginia (VIVA) is the consortium of nonprofit academic libraries within the Commonwealth of Virginia. These include six doctoral institutions and two 4-year comprehensive colleges and universities.  Due to their ongoing efforts for participating members to make collaborative decisions VIVA has been able to retain a shared print collection of 3,531,007 title-holdings, with 591,266 thousand of those titles being uniquely retained by this group. ",
        "members": ["George Mason University","James Madison University","Old Dominion University","Radford University","University of Virginia","Virginia Commonwealth University","Virginia Tech","William and Mary University"],
        "website": "//www.vivalib.org/",
        "camera": {
            center: [-78.002930, 37.785639],
            zoom: 5.8,
            bearing: 0,
            pitch: 0
        },
        "latLongJS": [37.785639, -78.002930],
        "zoomJS": 7
    }, {
        "id": "5",
        "title": "WRLC",
        "description": "The Washington Research Library Consortium (WRLC) was established as a non-profit corporation in 1987 to support and enhance the library and information services of universities in the Washington, DC metropolitan area. Currently WRLC has 9 partner universities.  Due to their ongoing efforts for participating members to make collaborative decisions WRLC has been able to retain a shared print collection of 2,862,344 title-holdings, with 467,443 thousand of those titles being uniquely retained by this group. ",
        "members": ["American University","Catholic University","Gallaudet University","Georgetown University","George Washington University","Howard University","Marymount University","University of DC"],
        "twitter": "https://twitter.com/wrlc",
        "website": "//www.wrlc.org/",
        "camera": {
            center: [-77.053986, 38.932407],
            zoom: 10,
            bearing: 0,
            pitch: 0
        },
        "latLongJS": [38.932407, -77.053986],
        "zoomJS": 11
        }, {
        "id": "3",
        "title": "CNY",
        "description": "ConnectNY (CNY) is a consortium of 12 independent academic institutions in New York State. The mission of ConnectNY is to share collections, leverage resources, and enhance services through cooperative initiatives and coordinated activities. Due to their ongoing efforts for collaborative retention the CNY project has been able to retain a shared print collection of 852,205 thousand title-holdings, with 1,183 thousand of those titles being uniquely retained by this group. ",
        "members": ["Adelphi University","Bard College","Canisius College","Cazenovia College","Colgate University","Hamilton College","Le Moyne College","Medaille College","Pace University","Saint Lawrence University","Union College","Vassar College"],
        "twitter": "https://twitter.com/Connect_NY",
        "website": "//connectny.org/",
        "camera": {
            center: [-75.498047, 42.613244],
            zoom: 5.2,
            bearing: 0,
            pitch: 0
        },
        "latLongJS": [42.613244, -75.498047],
        "zoomJS": 6
    }, {
        "id": "1",
        "title": "EAST",
        "description": "The Eastern Academic Scholars' Trust (EAST) is a shared print initiative involving academic and research libraries in 11 states from Maine to Florida. EAST is focused on retaining unique, scarcely held and frequently used scholarly monographs and serials in support of scholarship, research and teaching. EAST currently has 59 members with a shared print collection of 16,573,071 million title holdings and 4,749,042 million title sets.  Due to their ongoing efforts for participating members to commit to retain agreed upon titles the EAST project has been able to retain a shared print collection of 5,746,636 title-holdings, with 1,868,773 million of those titles being uniquely retained by this group. ",
        "members": ["Amherst College","Boston College","Boston University","Brandeis University","Bridgewater","Bryn Mawr College","Colby","Connecticut College","Elms College","Fairfield University","Five Colleges Incorporated",
                    "Hampshire College","Lafayette College","Loyola Notre Dame","Middlebury College","Mount Holyoke College","Phillips Exeter Academy","Rochester","Saint Anselm College","Siena College","Skidmore","Smith College",
                    "Swarthmore College","Trinity College","Tufts University","University of Connecticut","UMass Amherst","UMass Boston","UMass Dartmouth","UMass Lowell","University of New Hampshire","Wellesley College","Wesleyan University",
                    "Williams College","Yeshiva University"],
        "website": "https://eastlibraries.org/",
        "camera": {
            center: [-73.872070, 41.569738],
            zoom: 4.8,
            bearing: 0,
            pitch: 0
        },
        "latLongJS": [41.569738, -73],
        "zoomJS": 6
    }, {
        "id": "2",
        "title": "MSCS",
        "description": "The Maine Shared Collections Strategy (MSCS) was founded by eight of Maine’s largest libraries, plus the state’s consortium, Maine InfoNet, together they have implemented a shared approach to the management of print collections in the state. Due to their ongoing efforts for participating members to make collaborative decisions MSCS has been able to retain a shared print collection of 1,408,737 title-holdings, with 260,398 thousand of those titles being uniquely retained by this group. ",
        "members": ["Bangor Public Library","Bates College","Bowdoin College","Colby College","Maine State Library","Portland Public Library","University of Maine Orono","University of Southern Maine"],
        "twitter": "https://twitter.com/MESharedColls",
        "website": "//www.maineinfonet.org/mscs/about/",
        "camera": {
            center: [-69.433594, 44.368778],
            zoom: 6,
            bearing: 0,
            pitch: 0
        },
        "latLongJS": [44.368778, -69.433594],
        "zoomJS": 7
    }];


