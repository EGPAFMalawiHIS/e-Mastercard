
<template>
  <div class="row">
    <div class="col-sm">
      <div class="counter">
        <i class="fa fa-code fa-2x"></i>
        <p class="count-text">Male</p>
        <h2 class="timer count-title count-number" data-to="100" data-speed="1500">
          {{stats.Reception.M}}
        </h2>
      </div>
    </div>
    <div class="col-sm">
      <canvas ref="myChart" height="190"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "MalePatientsChart",
  props: ['stats'],
  updated() {
    new Chart(this.$refs.myChart, {
      type: "bar",
      data: {
        labels: Object.keys(this.stats),
        datasets: [
          {
            label: "Number of Male",
            backgroundColor: "rgba(143, 143, 201, 0.3)",
            data: [...Object.values(this.stats).map(male => male.M), 0]
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: ""
        },
        tooltips: {
          enabled: true
        },
        hover: {
          animationDuration: 1
        },
        animation: {
          duration: 1,
          onComplete: function() {
            let chartInstance = this.chart,
              ctx = chartInstance.ctx;
            ctx.textAlign = "center";
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.textBaseline = "bottom";

            this.data.datasets.forEach(function(dataset, i) {
              let meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function(bar, index) {
                let data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        },
        scales: {
          yAxes: [
            {
              type: "linear",
              display: true,
              position: "left",
              id: "y-axis-1",
              gridLines: {
                display: false
              },
              labels: {
                show: true
              },
              ticks: {
                beginAtZero: true,
                userCallback: function(label, index, labels) {
                  if (Math.floor(label) === label) {
                    return label;
                  }
                },
                suggestedMin: 0,
                suggestedMax: this.stats.Reception.M + 1
              }
            }
          ]
        }
      }
    });
  }
};
</script>

<style>
</style>