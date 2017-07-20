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
    var cleanUserInput = rawUserInput.split(' ').join(' AND ');
    $([185,191,258,300,302,323]).each(function() {
      var groupID = this.valueOf();
      $.getJSON("http://prodsolrcloud-1947786843.us-east-1.elb.amazonaws.com:8983/solr/groupProject" + groupID + "TitleHoldings/select?q=retention_allocated:true&fq=in_scope:TRUE&fq=title:(" + cleanUserInput + ")&wt=json&json.wrf=?&indent=true", function(result) {  
        var finalParsedData = parseTitleResults(result,groupID, parsedData);
        var row = "";
        for (var key in finalParsedData) {
            var groupArray = finalParsedData[key].groups;
            var groupLength = finalParsedData[key].groups.length;
            var worldCatUrl = 'http://worldcat.org/oclc/' + key;

            row+="<li class='search__item'><div class='search__item__desc'><strong class='search__author'>"+ finalParsedData[key].author + 
            "</strong>, <em class='search__title'>" + finalParsedData[key].title + "</em><span class='search__edition'>" + finalParsedData[key].edition + 
            "</span><span class='search__publisher'>" + finalParsedData[key].publisher + "</span><span class='search__date'>" + 
            finalParsedData[key].pub_year + "</span><ul class='search__groups'>"; 
            for (var i = 0; i < finalParsedData[key].groups.length; i++) {
                if (finalParsedData[key].groups[i] == "EAST") {
                    var east = "<li class='search__groups__item east'>" + finalParsedData[key].groups[i] + "<span class='numeral'>15yr</span></li>";  
                    row+= east;
                }
                if (finalParsedData[key].groups[i] == "MI-SPI") {
                    var mispi = "<li class='search__groups__item mi-spi'>" + finalParsedData[key].groups[i] + "<span class='numeral'>15yr</span></li>"; 
                    row+= mispi;
                } 
                if (finalParsedData[key].groups[i] == "COPPUL") {
                    var coppul = "<li class='search__groups__item coppul'>" + finalParsedData[key].groups[i] + "<span class='numeral'>15yr</span></li>";
                    row+= coppul;  
                }
                if (finalParsedData[key].groups[i] == "ALI") {
                    var ali = "<li class='search__groups__item ali'>" + finalParsedData[key].groups[i] + "<span class='numeral'>15yr</span></li>";
                    row+= ali;
                }
                if (finalParsedData[key].groups[i] == "SCELC") {
                    var scelc = "<li class='search__groups__item scelc'>" + finalParsedData[key].groups[i] + "<span class='numeral'>15yr</span></li>"; 
                    row+= scelc; 
                } 
                if (finalParsedData[key].groups[i] == "MMS") {
                    var mms = "<li class='search__groups__item mms'>" + finalParsedData[key].groups[i] + "<span class='numeral'>15yr</span></li>"; 
                    row+= mms;
                }
            } 

            row+= "</ul></div><a href='" + worldCatUrl + 
            "' class='search__item__link' target='_blank' rel='noopener noreferrer'><img src='resources/images/WorldCat_Logo_V_Color.png' alt='WorldCat Logo' width='48'></a></li>" ;
        }
        $("#solr_results").html(row);    
      });
    });
}