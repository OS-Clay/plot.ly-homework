
function plotMe(id){

  d3.json("/js/samples.json").then((data)=> {

    //console.log(data);


    var sample = data.samples.filter(q => q.id.toString() === id)[0];

    console.log(sample);

    var sampleValues = sample.sample_values;
    //console.log(sampleValues);

    var topValues = sampleValues.slice(0,10).reverse();

    var otu_ids = sample.otu_ids;

    var top_ids = otu_ids.slice(0,10).reverse();
    //console.log(top_ids);

    var otu_labels = sample.otu_labels;

    var top_labels = otu_labels.slice(0,10).reverse();

    // bar graph looks terrible and i dont know why

    var trace1 = {

      x: topValues,
      y: top_ids,
      text: top_labels,
      marker: {
        color: "blue"},
      type: "bar",
      orientation: "h",
    };

    var data1 = [trace1];

    var layout1 = {
        title: "Top 10 OTUs for Selected ID",
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };

    Plotly.newPlot("bar", data1, layout1);


    var trace2 = {
      x: sampleValues,
      y: otu_ids,
      mode: "markers",
      marker: {
        color: otu_ids,
        size:sampleValues
    },
      text:otu_labels
    };

    var data2 = [trace2];

    var layout2 = {
      title: "OTUs present, amount",
      height:750,
      width: 1000

    };

    Plotly.newPlot("bubble", data2, layout2);

});
};

function personInfo(id){

  d3.json("/js/samples.json").then((data)=> {

    var person = data.metadata.filter(q => q.id.toString() === id)[0];

    //var idNo = person[0];

    var blankCard = d3.select("#sample-metadata");

    blankCard.html("");

    for ([key, value] of Object.entries(person)) {
      blankCard.append("p").text(`${key}: ${value}`);
    }

  });


}

function optionChanged(id){
  plotMe(id);
  personInfo(id);
}


// not sure why this doesnt work, but it doesn't


/*function letsBegin(){

  var selector = d3.select("selDataset");

  d3.json("/static/js/samples.json").then((data) => {

    console.log(data.names);

    var peoples = data.names;

    peoples.forEach(function(thing){

      selector.append("option").text(thing).property("value");
    });

  });

};
letsBegin(); */


function pleaseWorkFinally() {

    var selector = d3.select("#selDataset");

    d3.json("/js/samples.json").then((data)=> {
        console.log(data)

        data.names.forEach(function(name) {
            selector.append("option").text(name).property("value");
        });

        plotMe(data.names[0]);
        personInfo(data.names[0]);
    });
}

pleaseWorkFinally();
