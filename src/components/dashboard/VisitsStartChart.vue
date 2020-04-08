
<template>
  <b-overlay :show="loading" spinner-type="grow" spinner-variant="primary" :spinner-small="true">
    <div class="chart-wrapper">
      <canvas ref="myChart" height="120"></canvas>
      <p hidden class="count-text">Title</p>
    </div>
  </b-overlay>
</template> 

<script>
import Chart from "chart.js"

export default {
  name: "VisitsStartChart",
  props: ['visits'],
  data() {
    return {
      selected: ""
    }
  },
  computed: {
    destructuredVisits() {
      function visitsReducer([days, completeVisits, incompleteVisits], [day, {complete, incomplete}]) {
        days.push(day);
        completeVisits.push(complete);
        incompleteVisits.push(incomplete);

        return [days, completeVisits, incompleteVisits];
      }

      return Object.entries(this.visits || {}).reduce(visitsReducer, [[], [], []]);    
    },
    loading() {
      return !this.visits;
    }
  },
  mounted() {
    const [days, completeVisits, incompleteVisits] = this.destructuredVisits;

    new Chart(this.$refs.myChart, {
      type: "line",
      data: {
        labels: days,
        datasets: [
          {
            label: "Complete Visits",
            borderColor: "rgba(222, 187, 240, 0.9)",
            backgroundColor: "rgba(187, 130, 245, 0.1)",
            data: completeVisits
          },
          {
            label: "Incomplete Visits",
            borderColor: "rgba(174, 225, 242, 0.9)",
            backgroundColor: "rgba(150, 229, 255, 0.1)",
            data: incompleteVisits
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
          text: "Name"
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