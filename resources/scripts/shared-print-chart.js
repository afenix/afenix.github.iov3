// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Make the chart responsive on browser resize
$(window).resize(function(){
  drawChart();
});

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
    // Create the data table.
    var chartData = google.visualization.arrayToDataTable([
        ['Group Name', 'Uniquely retained by this group', 'Retentions overlapping those of other groups', { role: 'annotation' } ],
        ['ALI', 475057, 1226317, ''],
        ['CI-CCI', 989, 151564, ''],
        ['COPPUL', 847918, 299314, ''],
        ['CNY', 1183, 851022, ''],
        ['EAST',  1868773,  3877863 , ''],
        ['MI-SPI', 81949, 692224, ''],
        ['MSCS', 260398, 1148339, ''],
        ['SCELC', 269902, 929768, ''],
        ['TUG', 20012, 320267, ''],
        ['VIVA', 591266, 2939741, ''],
        ['WRLC', 467443, 2394901, '']
      ]);


    // Set chart options
      var chartOptions = {
        width: '900px',
        height: '600px',
        focusTarget: 'category',
        backgroundColor: 'transparent',
        colors: ['#66BC51', '#82F067'],
        fontName: 'Avenir Next W01, san serif',
        isStacked: true,
        chartArea: {
          left: 65,
          right: 50,
          top: 10,
          bottom: 150,
          width: '75%',
          height: '70%'
        },
        bar: {
          groupWidth: '60%'
        },
        hAxis: {
          textStyle: {
            fontSize: 14
          }
        },
        vAxis: {
          textStyle: {
            fontSize: 14
          }
        },
        legend: {
          position: 'bottom',
          textStyle: {
            fontSize: 14
          }
        },
        animation: {
          duration: 500,
          easing: 'in',
                startup: true
        }
      };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(chartData, chartOptions);
}