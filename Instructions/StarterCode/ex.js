// Create a function
function buildCharts (sampleid) {
  // Fetch the data and console log it.
    d3.json('samples.json').then(incData => {
      //    function otuPlot(id) {
      console.log(incData)
      // Use filter() to pass the function as its argument
      var samples = incData.samples
      console.log(samples)
      //Filters through samples
      var otuSamples = samples.filter(sample => sample.id == sampleid)[0]
      console.log(otuSamples.otu_ids, 'This is working')
      // Use the map method with the arrow function to return all the filtered OTU's
      //var sample_values = otuSamples.map(samples => samples.name);
      //console.log(sample_values);
      // Use the map method with the arrow function to return all the filtered OTU metascores.
      //var otu_ids = otuSamples.map(samples => samples.otu_ids);
      // var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var otu_ids = otuSamples.otu_ids.slice(0, 10).reverse()
      var sample_values = otuSamples.sample_values.slice(0, 10).reverse()
      // Check your filtered metascores
      console.log(otuSamples)
      console.log(sample_values)
      console.log(otu_ids)
      //Create a trace
      var trace1 = {
        x: sample_values,
        y: otu_ids,
        //text: otu_labels,
        type: 'bar',
        orientation: 'h'
      };
      //Create the data array for the plot
      var data = [trace1];
      //Define the plot layout
      var layout = {
        title: 'Top 10  Operational Taxonomic Units (OTUs)',
        barmode: 'group',
        xaxis: { title: 'Title' },
        yaxis: { title: "Metascore OTU's" }
      };
      //Plot the chart to a div tag with id "bar"
      Plotly.newPlot('bar', data, layout);
//bubble chart
      var trace2 = {
        x: otuSamples.otu_ids,
        y: otuSamples.sample_values,
        text: otuSamples,
        mode: 'markers',
        marker: {
          size: otuSamples.sample_values,
          color: otuSamples.otu_ids,
          colorscale: 'Blackbody'
        }
      };
        console.log(trace2)
    var data = [trace2];
    var layout = {
      title: "Samples",
      showlegend: false,
      height: 600,
      witdh: 600,
      margin: 200
    };
    Plotly.newPlot('bubble', data, layout);
  });
} 
function buildMetadata(sampleid) {
  console.log(sampleid)
}
function init() {
  var selector = d3.select("#selDataset");
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  var firstSample = sampleNames[0];
  buildCharts(firstSample);
  buildMetadata(firstSample);
  });
}
function optionChanged(sampleid) {
  buildCharts(sampleid);
  buildMetadata(sampleid);
}
init();