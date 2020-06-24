function buildPlot (sampleId) {
    d3.json("samples.json").then(sampleData => {


        // var metaSelector = d3.select(".panel-body");
        // var metaD = sampleData.metadata
        // metaSelector
        // .append("th")
        // .text(sampleData.metadata.id)
        // .append("tr")
        // .html(`<td>${metaD.id}</td><td>${metaD.ethnicity}</td><td>${metaD.gender}</td><td>${metaD.age}</td><td>${metaD.location}</td><td>${metaD.bbtype}</td><td>${metaD.wfreq}</td>`)

        console.log(sampleData)

        var samples = sampleData.samples
        console.log(samples)

        var otuSamples = samples.filter(sample => sample.id == sampleId)[0]
        console.log(otuSamples.otu_ids)
        var otuLabels = otuSamples.otu_labels.slice(0,10).reverse()
        // otu_ids will be the labels for the bar chart 
        var otu_ids = otuSamples.otu_ids.slice(0, 10).reverse()
        // sample_values will be the values for the chart reverse so it goes from 10 - 1 descending? 
        var sample_values = otuSamples.sample_values.slice(0, 10).reverse()
        var otuAxisLabel = `OTU: ${otu_ids}`

        console.log(otuSamples)
        console.log(otu_ids)
        console.log(sample_values)
        console.log(otuLabels)
        console.log(otuAxisLabel)

        // var trace1 = {
        //     x: sample_values,
        //     y: otuAxisLabel,
        //     type: 'bar',
        //     orientation: 'h'
        // };

        var data = [
            {
                type: "bar",
                x: sample_values,
                y: otuAxisLabel,
                mode: "markers",
                marker: {size:16},
                text: otuLabels,
                orientation: "h"
            }
            ];

        var layout = {
            title: "Top 10 Operational Taxonomic Units (OTUs)",
            xaxis: {title: "Sample Value"},
            yaxis: {title: "Otu ID"}
        }

        Plotly.newPlot('bar', data, layout)

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

    })
    
}

function buildMetadata(sampleid) {
    console.log(sampleid)
    d3.json("samples.json").then(sampleData => {

    var metaSelector = d3.select(".panel-body");
    // need to find a way to change the index value when selecting a different subject ID
    // need to find a way to remove the old data when selecting a different subject ID from dropdown
    var metaD = sampleData.metadata[0]
    metaSelector
        .append("ul")
        .html(`<li>${metaD.id}</li><li>${metaD.ethnicity}</li><li>${metaD.gender}</li><li>${metaD.age}</li><li>${metaD.location}</li><li>${metaD.bbtype}</li><li>${metaD.wfreq}</li>`)
    })
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
    buildPlot(firstSample);
    buildMetadata(firstSample);
    });
  }
  function optionChanged(sampleid) {
    buildPlot(sampleid);
    buildMetadata(sampleid);
  }
  init();

