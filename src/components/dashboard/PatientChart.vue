
<template>
  <div class="row">
    <div class="col md-12">
        <canvas ref="myChart" height="180"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js"

export default {
  name: "",
  mounted() {
    new Chart(this.$refs.myChart, {
      type: "bar",
      data: {
        labels: "A, B, C, D, E",
        datasets: [
          {
            label: "Label",
            backgroundColor: "rgba(143, 143, 201, 0.3)",
            data: [1, 2, 3, 4, 5, 0]
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
              ctx = chartInstance.ctx
            ctx.textAlign = "center"
            ctx.fillStyle = "rgba(0, 0, 0, 1)"
            ctx.textBaseline = "bottom"

            this.data.datasets.forEach(function(dataset, i) {
              let meta = chartInstance.controller.getDatasetMeta(i)
              meta.data.forEach(function(bar, index) {
                let data = dataset.data[index]
                ctx.fillText(data, bar._model.x, bar._model.y - 5)
              })
            })
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
                    return label
                  }
                },
                suggestedMin: 0,
                suggestedMax: 10
              }
            }
          ]
        }
      }
    })
  }
}
</script>

<style>
.counter {
  background-color: #f0f0f0;
  padding: 12px 0;
  margin-top: 23px;
  border-radius: 5px;
}
.count-title {
  font-size: 15px;
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