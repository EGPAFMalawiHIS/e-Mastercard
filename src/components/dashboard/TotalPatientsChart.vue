
<template>
  <div class="row">
    <div class="col-sm">
      <div class="counter">
        <i class="fa fa-code fa-2x"></i>
        <p class="count-text">Total Patients Seen</p>
        <h2
          class="timer count-title count-number"
          data-to="100"
          data-speed="1500"
        >{{stats.Reception.M + stats.Reception.F}}</h2>
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
  name: "TotalPatientsChart",
  props: ["stats"],
  updated() {
    new Chart(this.$refs.myChart, {
      type: "bar",
      data: {
        labels: Object.keys(this.stats),
        datasets: [
          {
            label: "Number of Patients",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            data: [
              ...Object.values(this.stats).map(
                patient => patient.M + patient.F
              ),
              0
            ]
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
                suggestedMax: (this.stats.Reception.M + this.stats.Reception.F) + 1
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
  padding: 20px 0;
  border-radius: 5px;
}

.count-title {
  font-size: 40px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
  text-align: center;
}

.count-text {
  font-size: 13px;
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