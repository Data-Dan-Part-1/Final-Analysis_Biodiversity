function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
          selector
          .append("option")
          .text(sample)
          .property("value", sample)
      });
optionChanged();
})}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
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

function buildCharts(samples) {
  d3.json('samples.json').then((data) => {
      var OTU = data.samples;
      var resultOTU = OTU.filter(sampleObj => sampleObj.id == samples);
      var finalOTU = resultOTU[0];
      var otu_ids = resultOTU.otu_ids;
      var OTUCount = resultOTU[1];
      var sample_values = resultOTU.sample_values;
      var wfreq = resultOTU.wfreq;
      var barChart = d3.select('#bar');

      var data = [
        {
          domain: { x: [resultOTU, wfreq], y: [resultOTU, wfreq] },
          value: 2,
              title: { text: "Belly Button Washing Frequency" },
              type: "indicator",
              gauge: {axis: {range: [null, 9]}},
          mode: "gauge+number"
        }
      ];
      
      Plotly.newPlot('gauge', data);
              
      var trace = {
          x: [otu_ids],
          y: [sample_values],
          type: 'bar',
          orientation: 'h'
      };

      var data = [trace];
      var layout = {
          showlegend: false, 
      };        
      Plotly.newPlot('bar', data, layout);

      var trace1 ={
          x: [resultOTU],
          y: [sample_values],
          mode: 'markers',
          marker: {
              size: [sample_values],
              color: [otu_ids],
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



