function parseTitleResults(data, groupID,parsedData) {
    var groupIdMap = {
        185: 'EAST',
        191: 'MI-SPI',
        258: 'COPPUL',
        300: 'ALI',
        302: 'SCELC',
        323: 'MMS'
    }; 

    for (var key in groupIdMap) {
        if (key == groupID) {
            groupName = groupIdMap[key];
        }
    }

    for (var i = 0; i < data.response.docs.length; i++) {
        var worldcat_oclc_nbr = data.response.docs[i].worldcat_oclc_nbr;
        if (parsedData.hasOwnProperty(worldcat_oclc_nbr)) {
            if ($.inArray(groupName, parsedData[worldcat_oclc_nbr].groups) === -1) {
                parsedData[worldcat_oclc_nbr].groups.push(groupName);
            }
        } else {
            parsedData[worldcat_oclc_nbr] = {};
            parsedData[worldcat_oclc_nbr].title = data.response.docs[i].title;
            parsedData[worldcat_oclc_nbr].edition = data.response.docs[i].edition;
            parsedData[worldcat_oclc_nbr].author = data.response.docs[i].author;
            parsedData[worldcat_oclc_nbr].publisher = data.response.docs[i].publisher;
            parsedData[worldcat_oclc_nbr].pub_year = data.response.docs[i].pub_year;
            parsedData[worldcat_oclc_nbr].opac_url = data.response.docs[i].opac_url;        
            if (data.response.docs[i].edition == null) {
                parsedData[worldcat_oclc_nbr].edition = "";
            } else {
                parsedData[worldcat_oclc_nbr].edition = data.response.docs[i].edition;
            }
            parsedData[worldcat_oclc_nbr].groups = [];
            parsedData[worldcat_oclc_nbr].groups.push(groupName);
        }
    }
    return parsedData;
}

function searchSolrTitles() {
    var parsedData = {};
    var rawUserInput = document.getElementById("searchInput").value;
    var row = "";
    $([185,191,258,300,302,323]).each(function() {
        var groupID = this.valueOf();
        $.getJSON("http://shared-print.scs.argenticsoftware.com/search/?q=" + rawUserInput + "&return=_all_fields", function(result) {
        $("#solr_results").html("");
        for (var holding_index in result.hits.hit) {
            var holding = result.hits.hit[holding_index].fields;
            if (!holding) continue;
            row +="<li class='search__item'><div class='search__item__desc'><strong class='search__author'>"+ holding.full_author + 
            "</strong>, <em class='search__title'>" + holding.full_title + 
            "</span><ul class='search__groups'>"; 

            // group_ids: 
            // 1013;"EAST Group - June 2015"
            // 1014;"MI-SPI - August 2015"
            // 5761;"COPPUL"
            // 8627;"ALI - September 2016"
            // 9003;"SCELC"
            // 9808;"MMS - April 2017"

            for (var index = 0; index < holding.group_ids.length; index++) {
                var group_inst_id = holding.group_ids[index];
                if (group_inst_id == 1013) {
                    var east = "<li class='search__groups__item east'>" + "EAST" + "<span class='numeral'>15yr</span></li>";  
                    row+= east;
                }
                if (group_inst_id == 1014) {
                    var mispi = "<li class='search__groups__item mi-spi'>" + "MI-SPI" + "<span class='numeral'>15yr</span></li>"; 
                    row+= mispi;
                } 
                if (group_inst_id == 5761) {
                    var coppul = "<li class='search__groups__item coppul'>" + "COPPUL" + "<span class='numeral'>15yr</span></li>";
                    row+= coppul;  
                }
                if (group_inst_id == 8627) {
                    var ali = "<li class='search__groups__item ali'>" + "ALI" + "<span class='numeral'>15yr</span></li>";
                    row+= ali;
                }
                if (group_inst_id == 9003) {
                    var scelc = "<li class='search__groups__item scelc'>" + "SCELC" + "<span class='numeral'>15yr</span></li>"; 
                    row+= scelc; 
                } 
                if (group_inst_id == 9808) {
                    var mms = "<li class='search__groups__item mms'>" + "MMS" + "<span class='numeral'>15yr</span></li>"; 
                    row+= mms;
                }
            }
console.log(holding.worldcat_oclc_nbr);
            row+= "</ul></div><a href='http://worldcat.org/oclc/" + holding.worldcat_oclc_nbr +
            "' class='search__item__link' target='_blank' rel='noopener noreferrer'><img src='resources/images/WorldCat_Logo_V_Color.png' alt='WorldCat Logo' width='48'></a></li>" ;
        }
        $("#solr_results").append(row);    
      });
    });
}