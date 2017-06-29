mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpc3RlcmZ4IiwiYSI6ImNpcW80cnExOTAxZW9meW5uamNhdDIwcXcifQ.X8cJ7YP65MrR3bBq4a1rmQ';
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

var title = document.getElementById('location-title');
var description = document.getElementById('location-description');

var libraries = [{
 	"id": "12",
    "title": "Shared Print Overview",
    "description": "Models and retention criteria vary according to local and regional priorities, but most of the committed titles are secured under formal Memoranda of Understanding (MOU) for 15 years, often with review every five years. In some respects, these are grass-roots activities, designed to address local needs, but it seems clear that these programs can contribute significantly to a federated national or international solution, such as that envisioned by the MLA’s Working Group on The Future of the Print Record.",
    "camera": {
        center: [-100.722656, 42.793385],
        zoom: 3,
        bearing: 0,
        pitch: 0
    }
  },{
    "id": "11",
    "title": "SCELC",
    "description": "SCELC brings together independent nonprofit academic and research institutions to foster innovation and collaboration in the acquisition and effective use of library resources and services.  The consortium is comprised of 14 academic and reseaerch libraries located in the state of California with a shared print collection of 4,866,476 million title holdings and 2,628,215 million title sets.  Due to their ongoing efforts for collective retention strategies SCELC has been able to retain a shared print collection of 1,199,038 milliion title-holdings.",
    "camera": {
        center: [-119.597168, 35.830618],
        zoom: 4.8,
        bearing: 0,
        pitch: 0
    }
  },{
    "id": "10",
    "title": "COPPUL",
    "description": "Working together, the Council of Prairie and Pacific University Libraries (COPPUL) members leverage their collective expertise, resources, and influence, increasing capacity and infrastructure, to enhance learning, teaching, student experiences, and research amongst their institutions. The consortium is comprised of 22 university libraries located in Manitoba, Saskatchewan, Alberta and British Columbia with a shared print collection of 7,276,328 million title holdings and 3,738,751 million title sets.  Due to their ongoing efforts for collective retention strategies COPPUL has been able to retain a shared print collection of 1,147,232 milliion title-holdings, with 778,071 thousand of those titles being uniquely retained by this group. ",
    "camera": {
        center: [-110.039063, 49.999795],
        zoom: 4.5,
        bearing: 0,
        pitch: 0
    }
 }, {
    "id": "9",
    "title": "CI-CCI",
    "description": "The formation of the Central Iowa Collaborative Collections Initiative (CI-CCI) was announced in the summer of 2013, with an initial membership of 5 universities in the state.  By working together the CI-CCI group has been able to meet their goals of decreasing the size of local print collections by reducing duplication among the participating libraries and creating and maintaining a distributed, shared collection of these titles to ensure that circulating copies of them are retained within the group. Because of this CI-CCI has been able to retain 152,553 thousand title-holdings, with 741 of those titles being uniquely retained by this group. ",
    "camera": {
        center: [-93.144836, 41.553233],
        zoom: 7.6,
        bearing: 0,
        pitch: 0
    }
}, {
    "id": "8",
    "title": "ALI",
    "description": "The mission of Academic Libraries of Indiana (ALI) is to build and foster community and collaboration among academic libraries in Indiana. ALI is a consortium of 37 participating libraries with a shared print collection of 5,512,435 million title holdings and 2,287,041 million title sets.  Due to their ongoing efforts for a state-wide academic library collaboration, the ALI project has been able to retain a shared print collection of 1,701,374 title-holdings, with 370,490 thousand of those titles being uniquely retained by this group. ", 
    "camera": {
        center: [-86.149292, 39.769360],
        zoom: 5.2,
        bearing: 0,
        pitch: 0
    }
}, {
    "id": "7",
    "title": "MI-SPI",
    "description": "In 2011, the libraries at Michigan's publicly-supported universities sought to devise a collaborative approach to shared print collections among themselves, calling themselves the Michigan Shared Print Initiative (MI-SPI). Participating libraries used services and tools developed by Sustainable Collection Services (SCS) to identify such titles in their respective individual collections, and to compare results across the group. Eleven universities participated in this endeavor across Michigan state, allowing participating members to retain 774,173 thousand title-holdings, with 79,227 thousand of those titles being uniquely retained by this group.   ",
    "camera": {
        center: [-85.253906, 44.570415],
        zoom: 4.8,
        bearing: 0,
        pitch: 0
    } 
}, {
    "id": "6",
    "title": "TUG",
    "description": "The TriUniversity Group of Libraries (TUG) is a unique example of administrative co-operation among the Libraries of three Ontario universities: University of Guelph, Universtiy of Waterloo, and the Wilfred Laurier University.  The TUG libraries have been informally collaborating for nearly thirty years; however more recently, they have enhanced their co-operation with a more formalised agreement to work together to leverage rapidly-advancing technologies for mutual benefit. Because of their shared committment TUG has now been able to retain 340,279 thousand title-holdings, with 20,396 thousand of those titles being uniquely retained by this group. ",
    "camera": {
        center: [-80.362244, 43.488237],
        zoom: 8.5,
        bearing: 0,
        pitch: 0
    }
}, {
    "id": "4",
    "title": "VIVA",
    "description": "The Virtual Library of Virginia (VIVA) is the consortium of nonprofit academic libraries within the Commonwealth of Virginia. These include six doctoral institutions and two 4-year comprehensive colleges and universities.  Due to their ongoing efforts for participating members to make collaborative decisions VIVA has been able to retain a shared print collection of 3,531,007 title-holdings, with 421,803 thousand of those titles being uniquely retained by this group. ",
    "camera": {
        center: [-78.002930, 37.785639],
        zoom: 5.8,
        bearing: 0,
        pitch: 0
    }
}, {
    "id": "5",
    "title": "WRLC",
    "description": "The Washington Research Library Consortium (WRLC) was established as a non-profit corporation in 1987 to support and enhance the library and information services of universities in the Washington, DC metropolitan area. Currently WRLC has 9 partner universities.  Due to their ongoing efforts for participating members to make collaborative decisions WRLC has been able to retain a shared print collection of 2,862,344 title-holdings, with 437,841 thousand of those titles being uniquely retained by this group. ",
    "camera": {
        center: [-77.053986, 38.932407],
        zoom: 10,
        bearing: 0,
        pitch: 0
    }
	}, {
    "id": "3",
    "title": "CNY",
    "description": "ConnectNY (CNY) is a consortium of 12 independent academic institutions in New York State. The mission of ConnectNY is to share collections, leverage resources, and enhance services through cooperative initiatives and coordinated activities. Due to their ongoing efforts for collaborative retention the CNY project has been able to retain a shared print collection of 852,205 thousand title-holdings to date.",
    "camera": {
        center: [-75.498047, 42.613244],
        zoom: 5.2,
        bearing: 0,
        pitch: 0
    }
}, {
    "id": "1",
    "title": "EAST",
    "description": "The Eastern Academic Scholars' Trust (EAST) is a shared print initiative involving academic and research libraries in 11 states from Maine to Florida. EAST is focused on retaining unique, scarcely held and frequently used scholarly monographs and serials in support of scholarship, research and teaching. EAST currently has 59 members with a shared print collection of 16,573,071 million title holdings and 4,749,042 million title sets.  Due to their ongoing efforts for participating members to commit to retain agreed upon titles the EAST project has been able to retain a shared print collection of 5,746,636 title-holdings, with 1,760,944 million of those titles being uniquely retained by this group. ",
    "camera": {
        center: [-73.872070, 41.569738],
        zoom: 4.8,
        bearing: 0,
        pitch: 0
    } 
}, {
    "id": "2",
    "title": "MSCS",
    "description": "The Maine Shared Collections Cooperative (MSCC) was founded by eight of Maine’s largest libraries, plus the state’s consortium, Maine InfoNet, together they have implemented a shared approach to the management of print collections in the state. Due to their ongoing efforts for participating members to make collaborative decisions MSCS has been able to retain a shared print collection of 1,408,737 title-holdings, with 302,601 thousand of those titles being uniquely retained by this group. ",
    "camera": {
        center: [-69.433594, 44.368778],
        zoom: 6,
        bearing: 0,
        pitch: 0
    }
}];


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
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center: [-100.722656, 42.793385],
        zoom: 3,
        bearing: 0,
        pitch: 0,

        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 0.5, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function (t) {
            return t;
        }
    });
}

// Display the last title/description first
title.textContent = libraries[0].title;
description.textContent = libraries[0].description;

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
    }); 
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
         .setHTML('<div id="popup" class="popup" style="width:230px;"> <h2 style="text-align:center;padding:0px 0px"> ' + feature.properties['group'] + ' Group</h2><h3 style="padding:0px 10px 0px 15px;margin:0px;"><strong>' + feature.properties['inst_name'] + '</strong></h3>' +
	              '<ul>' +
	              '<li class="popup-list" style="padding:0px 10px 0px 15px;"> Total titles retained: ' + feature.properties['total_count_string'] + ' </li>' +
	              '<li class="popup-list" style="padding:0px 10px 0px 15px;"> Total titles uniquely retained: ' + feature.properties['unique_count_string'] + " </li></ul> </div>")
        .addTo(map);
});

map.on('mouseleave', 'shared_collection', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

// Add a clickable group legend to the map
var group_legend_elements = document.getElementById('group-legend-elements');
var group_info = [{
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
$.each(group_info, function(key, obj) {
	var group_div = document.createElement('div');
    $(group_div).addClass('group_div');
    if (key == 0) {
      $(group_div).addClass('selected');
    }
    var group_flair = document.createElement('div');
    $(group_flair).addClass('flair');
    var group_count = document.createElement('h6');
     $(group_count).addClass('group_count');

    $.each(obj, function(key, value) {
    	if (key === 'group_name') {
	    	$(group_div).html('<span>' + value + '</span>');
    	} else if (key === 'group_count') {
	    	$(group_count).text(value);
    	} else {
	    	group_flair.style.backgroundColor = value;
    	}
	});

    group_div.addEventListener('click', function() {
        if (libraries[key].title != "") {
	        $('.descriptive-text-container').animate({
	        }, 750, function() {
	            $('.descriptive-text-container').show();
	        });
        } else if (libraries[key].title === "") {
        	$('.descriptive-text-container').animate({
	        }, 750, function() {
	            $('.descriptive-text-container').hide();
	        });
        }

	$('.group_div').removeClass('selected');
	$(this).addClass('selected');
       

        map.flyTo(libraries[key].camera);
        if (libraries[key].title != 'Overview') {
	        title.textContent = libraries[key].title;
	    	description.textContent = libraries[key].description; 	
        } else {
        	title.textContent = '';
	    	description.textContent = ''; 	
        }
    });
    group_legend_elements.appendChild(group_div);
 	group_div.appendChild(group_count);
 	group_div.appendChild(group_flair);
});

function parseTitleResults(data, groupID,parsedData) {
    var groupIdMap = {
        185: 'EAST',
        191: 'MI-SPI',
        258: 'COPPUL',
        300: 'ALI',
        302: 'SCELC',
        323: 'MMS'
    }; 
    for (key in groupIdMap) {
        if (key == groupID) {
            groupName = groupIdMap[key];
        }
    }

    for (var i = 0; i < data.response.docs.length; i++) {
        var worldcat_oclc_nbr = data.response.docs[i].worldcat_oclc_nbr;
        if (parsedData.hasOwnProperty(worldcat_oclc_nbr)) {
            if ($.inArray(groupName, parsedData[worldcat_oclc_nbr]["groups"]) === -1) {
                parsedData[worldcat_oclc_nbr]["groups"].push(groupName);
            }
        } else {
            parsedData[worldcat_oclc_nbr] = {};
            parsedData[worldcat_oclc_nbr]["title"] = data.response.docs[i].title;
            parsedData[worldcat_oclc_nbr]["edition"] = data.response.docs[i].edition;
            parsedData[worldcat_oclc_nbr]["author"] = data.response.docs[i].author;
            parsedData[worldcat_oclc_nbr]["publisher"] = data.response.docs[i].publisher;
            parsedData[worldcat_oclc_nbr]["pub_year"] = data.response.docs[i].pub_year;
            parsedData[worldcat_oclc_nbr]["opac_url"] = data.response.docs[i].opac_url;           
            if (data.response.docs[i].edition == null) {
                parsedData[worldcat_oclc_nbr]["edition"] = "";
            } else {
                parsedData[worldcat_oclc_nbr]["edition"] = data.response.docs[i].edition;
            }
            parsedData[worldcat_oclc_nbr]["groups"] = [];
            parsedData[worldcat_oclc_nbr]["groups"].push(groupName);
        }
    };
    return parsedData;
}

function searchSolrTitles() {
    var parsedData = {};
    var rawUserInput = document.getElementById("searchInput").value;
    var cleanUserInput = rawUserInput.split(' ').join(' AND ');
    $([185,191,258,300,302,323]).each(function() {
      var groupID = this.valueOf();
      $.getJSON("http://shared-print.scs.argenticsoftware.com/solr/groupProject" + groupID + "TitleHoldings/select?q=retention_allocated:true&fq=in_scope:TRUE&fq=title:(" + cleanUserInput + ")&wt=json&json.wrf=?&indent=true", function(result) {  
        var finalParsedData = parseTitleResults(result,groupID, parsedData);
        var row = "";
        for (var key in finalParsedData) {
            var groupArray = finalParsedData[key].groups;
            var groupLength = finalParsedData[key].groups.length;
            row+="<li class='search__item'><div class='search__item__desc'><strong class='search__author'>"+ finalParsedData[key].author + 
            "</strong>, <em class='search__title'>" + finalParsedData[key].title + "</em><span class='search__edition'>" + finalParsedData[key].edition + 
            "</span><span class='search__publisher'>" + finalParsedData[key].publisher + "</span><span class='search__date'>" + 
            finalParsedData[key].pub_year + "</span><ul class='search__groups'>"; 
            for (var i = 0; i < finalParsedData[key].groups.length; i++) {
                if (finalParsedData[key].groups[i] == "EAST") {
                    var east = "<li class='search__groups__item east'>" + finalParsedData[key]['groups'][i] + "<span class='numeral'>15yr</span></li>";  
                    row+= east;
                };
                if (finalParsedData[key].groups[i] == "MI-SPI") {
                    var mispi = "<li class='search__groups__item mi-spi'>" + finalParsedData[key]['groups'][i] + "<span class='numeral'>15yr</span></li>"; 
                    row+= mispi;
                }; 
                if (finalParsedData[key].groups[i] == "COPPUL") {
                    var coppul = "<li class='search__groups__item coppul'>" + finalParsedData[key]['groups'][i] + "<span class='numeral'>15yr</span></li>";
                    row+= coppul;  
                };
                if (finalParsedData[key].groups[i] == "ALI") {
                    var ali = "<li class='search__groups__item ali'>" + finalParsedData[key]['groups'][i] + "<span class='numeral'>15yr</span></li>";
                    row+= ali;
                };
                if (finalParsedData[key].groups[i] == "SCELC") {
                    var scelc = "<li class='search__groups__item scelc'>" + finalParsedData[key]['groups'][i] + "<span class='numeral'>15yr</span></li>"; 
                    row+= scelc; 
                }; 
                if (finalParsedData[key].groups[i] == "MMS") {
                    var mms = "<li class='search__groups__item mms'>" + finalParsedData[key]['groups'][i] + "<span class='numeral'>15yr</span></li>"; 
                    row+= mms;
                };
            }; 

            row+= "</ul></div><a href='" + finalParsedData[key].opac_url + 
            "' class='search__item__link'><img src='resources/WorldCat_Logo_V_Color.png' alt='WorldCat_Logo_V_Color' width='48'></a></li>" ;
        };
        $("#solr_results").html(row);    
      });
    });
}


