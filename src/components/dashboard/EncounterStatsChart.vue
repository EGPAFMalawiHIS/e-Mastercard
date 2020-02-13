
<template>
  <div class="row">
    <div class="col-sm-3">
      <div class="counter">
        <i class="fa fa-code fa-2x"></i>
        <p class="count-text">{{stats.name}}</p>
        <h2 class="timer count-title count-number" data-to="100" data-speed="1500">{{stats.total}}</h2>
      </div>
    </div>
    <div class="col-sm-9">
      <canvas ref="myChart" height="190"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "",
  props: ["stats"],
  updated() {
    new Chart(this.$refs.myChart, {
      type: "bar",
      data: {
        labels: this.stats.labels,
        datasets: [
          {
            label: this.stats.label,
            backgroundColor: this.stats.backgroundColor,
            data: [...this.stats.data, 0]
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
                suggestedMax: this.stats.total + 1
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
.counter {
  background-color: #f0f0f0;
  padding: 12px 0;
  margin-top: 23px;
  border-radius: 5px;
}
.count-title {
  font-size: 10px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
  text-align: center;
}
.count-text {
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
  text-align: center;
}
.fa-2x {
  margin: 0 auto;
  float: none;
  display: table;
  color: #4ad1e5;
}
</style>