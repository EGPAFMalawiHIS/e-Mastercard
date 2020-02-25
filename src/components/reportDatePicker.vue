<template>
  <div class="control-container">

    <select id="quarters">
      <option>Select cohort quarter</option>
      <option v-for="(quarter, index) in quarters" v-bind:key="index" :value="quarter">
        {{quarter}}
      </option>
    </select>
    <button class="btn btn-primary" @click="selectQuarter" id="submit-btn" ref="myid">Submit</button>

  </div>
</template>

<script>


export default {
  data: function() {
    return {
      quarters : []
    }
  },
  props: ["onSubmit"],
  methods: {
    selectQuarter: function() {
      //this.$refs.myid.disabled=true;
      if(quarters.value != 'Select cohort quarter')
        this.onSubmit(quarters.value);

  },
  enableBTN: function() {
    this.$refs.myid.disabled=false;
  },
  loadQuarters() {
    var qtrs = [];
    var current_qtr = "";
    var curr_date = new Date();
    var curr_year = curr_date.getFullYear();

    if(  curr_date >= (new Date(curr_year + '-01-01')) && curr_date <= (new Date(curr_year + '-03-31'))  ){
      current_qtr = '1 ' + curr_year;
    }else if ( curr_date >= (new Date(curr_year + '-04-01')) && curr_date <= (new Date(curr_year + '-06-30')) ){
      current_qtr = '2 ' + curr_year;
    }else if ( curr_date >= (new Date(curr_year + '-07-01')) && curr_date <= (new Date(curr_year + '-09-30')) ){
      current_qtr = '3 ' + curr_year;
    }else if ( curr_date >= (new Date(curr_year + '-10-01')) && curr_date <= (new Date(curr_year + '-12-31')) ){
      current_qtr = '4 ' + curr_year;
    }

    var count = parseInt(current_qtr.substring(0,1));
    var i = 0;

    while(i < 5) { 
      if(i == 0)
        this.addFollowingQ(qtrs, count, curr_year);
        qtrs.push('Q' + count + ' ' + curr_year);
        count = (count > 0 ? (count -= 1) : count);
        curr_year = (count == 0 ? (curr_year - 1) : curr_year);
        count = (count == 0 ? (count += 4) : count);

        i++;
    }

  this.quarters = qtrs;
},
  addFollowingQ(qtrs, count, curr_year){
    if(count < 4){
      qtrs.push('Q' + (count + 1) + " " + curr_year);
    }else{
      qtrs.push('Q1' + " " + (curr_year + 1));
    }
  }
},
  mounted() {
    this.loadQuarters();
  }
}
// loadQuarters();
</script>

<style scope>
  .control-container {
    text-align: right;
    margin: 10px  0px 10px 0px;
    width: 100%;
  }

  select {
    margin-right: 10px;
    height: 40px;
    width: 250px;
    vertical-align: top;
  }

  .control-container button {
    height: 35px;
    vertical-align: top;
  }

</style>