
<template>
  <div class="chart-wrapper">
    <select
      class="btn btn-default"
      v-model="selected"
      style="float:right; background-color: #ededed"
    >
      <option disabled value>Last 5 Months</option>
      <option>Last Month</option>
      <option>Last 3 Months</option>
      <option>Last 6 Months</option>
      <option>Last 9 Months</option>
      <option>Last 12 Months</option>
    </select>
    <canvas ref="myChart" width="1600" height="400"></canvas>
  </div>
</template> 

<script>
import Chart from "chart.js";

export default {
  name: "MonthlyPatientRegistrationChart",
  data() {
    return {
      selected: ""
    };
  },

  mounted() {
    new Chart(this.$refs.myChart, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Compete Visits",
            borderColor: "rgba(222, 187, 240, 0.9)",
            backgroundColor: "rgba(187, 130, 245, 0.1)",
            data: [11, 3, 5, 7, 9]
          },
          {
            label: "Incomplete Visits",
            borderColor: "rgba(174, 225, 242, 0.9)",
            backgroundColor: "rgba(150, 229, 255, 0.1)",
            data: [1, 7, 6, 2, 3]
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: `Total Visits`
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
              scaleLabel: {
                display: true,
                labelString: "Number of Complete/Incomplete Visits"
              },
              ticks: {
                beginAtZero: true
            }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Month(s)"
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