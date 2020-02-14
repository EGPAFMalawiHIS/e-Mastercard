
<template>
  <div class="chart-wrapper">
    <canvas ref="myChart" width="1600" height="400"></canvas>
    <p hidden class="count-text">{{stats}}</p>
  </div>
</template> 

<script>
import Chart from "chart.js"

export default {
  name: "VisitsStartChart",
  props: ["stats"],
  data() {
    return {
      selected: ""
    }
  },

  updated() {
    new Chart(this.$refs.myChart, {
      type: "line",
      data: {
        labels: this.stats.days,
        datasets: [
          {
            label: "Compete Visits",
            borderColor: "rgba(222, 187, 240, 0.9)",
            backgroundColor: "rgba(187, 130, 245, 0.1)",
            data: this.stats.complete
          },
          {
            label: "Incomplete Visits",
            borderColor: "rgba(174, 225, 242, 0.9)",
            backgroundColor: "rgba(150, 229, 255, 0.1)",
            data: this.stats.incomplete
          }
        ]
      },
      options: {
        legend: { 
          display: true,
          position: 'bottom' 
          },
        title: {
          display: true,
          text: this.stats.name
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
              scaleLabel: {
                display: true,
                labelString: "Complete/Incomplete Visits"
              },
              ticks: {
                beginAtZero: true,
                userCallback: function(label, index, labels) {
                  if (Math.floor(label) === label) {
                    return label
                  }
                }
            }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Days"
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
</style>