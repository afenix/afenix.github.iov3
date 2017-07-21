function searchSolrTitles() {
    var parsedData = {};
    var rawUserInput = document.getElementById("searchInput").value;
    var row = "";
    var groupID = this.valueOf();
    $.getJSON("http://shared-print.scs.argenticsoftware.com/search/?q=" + rawUserInput + "&return=_all_fields", function(result) {
    $("#solr_results").html("");
    for (var holding_index in result.hits.hit) {
        var holding = result.hits.hit[holding_index].fields;
        // var holdingAuthor = (typeof holding.full_author === "undefined") ? "N/A" : holding.full_author;
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
        row+= "</ul></div><a href='http://worldcat.org/oclc/" + holding.worldcat_oclc_nbr +
        "' class='search__item__link' target='_blank' rel='noopener noreferrer'><img src='resources/images/WorldCat_Logo_V_Color.png' alt='WorldCat Logo' width='48'></a></li>" ;
    }
    $("#solr_results").append(row);    
  });
}