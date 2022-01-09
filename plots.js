// Data File Path
const data_file = "./samples.json";

function updatePlots() {

// D3 library to read in `samples.json`. 
  main_data = d3.json(data_file).then(function(data) {
    //console.log(data);

    var samples = data.samples
    //console.log(samples)

    let x = [];
    let y = [];

    for (i in samples) {
      d3.select("select").append("option").attr("value", i).text(samples[i]["id"]);
    };

    //  D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset"); 

    // Assign the ID chosen in dropdown menu option to a variable
    var subject_ID = dropdownMenu.property("value");

    // make plots responsive
    var config = {responsive: true}


    // individual's metadata (demographic information)
    var metadata = data.metadata[subject_ID]
    var metadata_keys = Object.keys(metadata)
    var metadata_values = Object.values(metadata)
    
    d3.select("#sample-metadata").html("")

    // loop to list demographic information
    for (i in metadata_keys) {d3.select("#sample-metadata").append("p").append("span").text(`${metadata_keys[i]}: ${metadata_values[i]}`)}



    // slice to display the top 10 OTUs found in that individual
    x = data.samples[subject_ID].sample_values.slice(0,10).reverse();
    y = data.samples[subject_ID].otu_ids.slice(0,10).reverse();

    // loop through data to return OTU's for given ID
    for (i in y) {y[i] = "OTU "+ y[i]};

    // store labels of OTU for plotting on horizontal bar chart
    t = data.samples[subject_ID].otu_labels;

    // horizontal bar chart
    var h_barchart = {
      x: x,
      y: y,
      name:"Bar",
      text: t,
      type: "bar",
      orientation:"h"
    };

    // plot barchart
    Plotly.newPlot("bar", [h_barchart], {responsive: true});

    var bubblechart = {
      x: data.samples[subject_ID].otu_ids,
      y: data.samples[subject_ID].sample_values,

      mode: "markers",
      marker:{
        size: data.samples[subject_ID].sample_values,
        color: data.samples[subject_ID].otu_ids,
      },
      text: data.samples[subject_ID].otu_labels,
      };

    // plot bubblechart
    Plotly.newPlot("bubble", [bubblechart], {
      xaxis: {
        title: "OTU ID"
      }
    }, {responsive: true}
    );

  })

}

// DOMContentLoaded = on immeadiately loading html
document.addEventListener("DOMContentLoaded", function() {
  updatePlots()
});



  

  