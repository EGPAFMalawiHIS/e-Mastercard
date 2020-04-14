
<template>
  <b-overlay :show="loading" spinner-variant="primary" spinner-type="grow" :spinner-small="true">
    <div class="col-sm-12 shadow p-3 mb-5 bg-white rounded"> 
      <div class="row">
        <div class="col-md-3">
          <i class="fa fa-code fa-2x"></i>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-12">
              <label style="float: left"><slot></slot></label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <label style="font-weight: bold; float: left;">{{value}}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
      
      <!-- <div class="counter">
        <i class="fa fa-code fa-2x"></i>
        <label class="count-text">{{stats.name}}</label>
        <h2 class="timer count-title count-number" data-to="100" data-speed="1500">{{stats.count}}</h2>
      </div> -->
    <!-- </div> -->
  </b-overlay>
</template>

<script>
import Chart from "chart.js"
export default {
  name: "",
  props: ['value'],
  computed: {
    loading() {
      return this.value == -1;
    }
  }
  // updated() {
  //   new Chart(this.$refs.myChart, {
  //     type: "bar",
  //     data: {
  //       labels: this.stats.labels,
  //       datasets: [
  //         {
  //           label: "Label",
  //           backgroundColor: 'rgba(137, 232, 200, 0.3)',
  //           data: [1, 2, 3, 4, 5, 0]
  //         }
  //       ]
  //     },
  //     options: {
  //       legend: { display: false },
  //       title: {
  //         display: true,
  //         text: ""
  //       },
  //       tooltips: {
  //         enabled: true
  //       },
  //       hover: {
  //         animationDuration: 1
  //       },
  //       animation: {
  //         duration: 1,
  //         onComplete: function() {
  //           let chartInstance = this.chart,
  //             ctx = chartInstance.ctx
  //           ctx.textAlign = "center"
  //           ctx.fillStyle = "rgba(0, 0, 0, 1)"
  //           ctx.textBaseline = "bottom"

  //           this.data.datasets.forEach(function(dataset, i) {
  //             let meta = chartInstance.controller.getDatasetMeta(i)
  //             meta.data.forEach(function(bar, index) {
  //               let data = dataset.data[index]
  //               ctx.fillText(data, bar._model.x, bar._model.y - 5)
  //             })
  //           })
  //         }
  //       },
  //       scales: {
  //         yAxes: [
  //           {
  //             type: "linear",
  //             display: true,
  //             position: "left",
  //             id: "y-axis-1",
  //             gridLines: {
  //               display: false
  //             },
  //             labels: {
  //               show: true
  //             },
  //             ticks: {
  //               beginAtZero: true,
  //               userCallback: function(label, index, labels) {
  //                 if (Math.floor(label) === label) {
  //                   return label
  //                 }
  //               },
  //               suggestedMin: 0,
  //               suggestedMax: this.stats.total + 1
  //             }
  //           }
  //         ]
  //       }
  //     }
  //   })
  // }
};
</script>

<style>
.counter {
  padding: 12px 0;
  margin-top: 0px;
  border-radius: 5px;
}
.count-title {

  background-color: #f0f0f0;
  font-size: 50px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
  padding-top: 50px;
  text-align: center;
}
.count-text {
  font-size: 20px;
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