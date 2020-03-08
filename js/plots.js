function init() {
  alert('HI there')
  var selector = d3.select("#selDataset");

  d3.json("js/samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
          selector
          .append("option")
          .text(sample)
          .property("value", sample)
      });
optionChanged("940");
})}

//Call Init Function ================================================================
init();

//Declare optionChanged function (called from HTML Index file)==================================
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("js/samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");
     
    PANEL.html("");
    PANEL.append("h6").text('ID: '+result.id);
    PANEL.append("h6").text('ETHNICITY: '+result.ethnicity);
    PANEL.append("h6").text('GENDER: '+result.gender);
    PANEL.append("h6").text('AGE: '+result.age);
    PANEL.append("h6").text('LOCATION: '+result.location);
    PANEL.append("h6").text('BBTYPE: '+result.bbtype);
    PANEL.append("h6").text('Weekly Frequency: '+result.wfreq);
  });
}

function buildCharts(sample) {
  d3.json('js/samples.json').then((data) => {
      var OTU = data.samples;
      var resultOTU = OTU.filter(sampleObj => sampleObj.id == sample);
      var finalOTU = resultOTU[0];
      var otu_ids = resultOTU.otu_ids;
      var OTUCount = resultOTU[1];
      var sample_values = resultOTU.sample_values;
      var wfreq = resultOTU.wfreq;
      var barChart = d3.select('#bar');


//Gauge  this works ============================================================================
// var data = [
// {
//   domain: { x: [0, 1], y: [0, 1] },
//   value: 2,
//       title: { text: "Belly Button Washing Frequency" },
//       type: "indicator",
//       gauge: {axis: {range: [null, 9]}},
//   mode: "gauge+number"
// }
// ];

// Plotly.newPlot('gauge', data);
var traceA = {
  type: "pie",
  showlegend: false,
  hole: 0.4,
  rotation: 90,
  values: [100 / 5, 100 / 5, 100 / 5, 100 / 5, 100 / 5, 100],
  text: ["Very Low", "Low", "Average", "Good", "Excellent", ""],
  direction: "clockwise",
  textinfo: "text",
  textposition: "inside",
  marker: {
    colors: ["rgba(255, 0, 0, 0.6)", "rgba(255, 165, 0, 0.6)", "rgba(255, 255, 0, 0.6)", "rgba(144, 238, 144, 0.6)", "rgba(154, 205, 50, 0.6)", "white"]
  },
  labels: ["0-10", "10-50", "50-200", "200-500", "500-2000", ""],
  hoverinfo: "label"
};

var degrees = 115, radius = .6;
var radians = degrees * Math.PI / 180;
var x = -1 * radius * Math.cos(radians);
var y = radius * Math.sin(radians);

var layout = {
  shapes:[{
      type: 'line',
      x0: 0,
      y0: 0,
      x1: x,
      y1: 0.5,
      line: {
        color: 'black',
        width: 8
      }
    }],
  title: 'Number of Printers Sold in a Week',
  xaxis: {visible: false, range: [-1, 1]},
  yaxis: {visible: false, range: [-1, 1]}
};

var data = [traceA];

Plotly.plot(gaugeDiv, data, layout, {staticPlot: true});
//Top 10 Bar Graph ==========================================================================       

      var trace = {
          //x: otu_ids,
          x: [40,40,47,50,51,71,78,113,126,163],
          //y: sample_values,
          y: ["OTU 1977", "OTU 2318", "OTU 189", "OTU 352", "OTU 1189", "OTU 41", "OTU 2264", "OTU 482", "OTU 2859", "OTU 1167"],
          type: 'bar',
          orientation: 'h'
      };

      var data = [trace];
      var layout = {
          showlegend: false, 
      };        
      Plotly.newPlot('bar', data, layout);

//Bubble PLOT ============================================================================
      var trace1 ={
          //x:
          x: [1167, 2859, 482, 2264, 41, 1189, 352, 189, 2318, 1977, 3450, 874, 1959, 2191, 1950, 2077],
          y: [163, 126, 113, 78, 71, 51, 50, 47, 40, 40, 37, 36, 30, 28, 25, 23],
          mode: 'markers',
          marker: {
              size: [163, 126, 113, 78, 71, 51, 50, 47, 40, 40, 37, 36, 30, 28, 25, 23],
              color: [1167, 2859, 482, 2264, 41, 1189, 352, 189, 2318, 1977, 3450, 874, 1959, 2191, 1950, 2077],
          }
      };
   
      var data = [trace1];
      var layout = {
          title: 'Quantity of Bacteria by OTU_ID',
          showlegend: false 
      };
      Plotly.newPlot('bubble', data, layout);      
  });
};