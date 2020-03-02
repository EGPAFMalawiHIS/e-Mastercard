<template>
    <div class="ctrs">
        <div class="ctr-table">
            <div class="ctr-row">
                <div class="ctr-cell">
                    <date-pick class="date-inputs" 
                        v-model="endDate"
                        :format="format"
                        :parseDate="parseDate"
                        :formatDate="formatDate" 
                        :inputAttributes="{placeholder: 'End Date', readonly: true}">
                    </date-pick>
                </div>
                <div class="ctr-cell"><button @click="submitDate" class="btn btn-success">Submit</button></div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.ctrs {
    width: 100%;
    padding: 10px;
}

.ctr-table{
    width: 350px;
    text-align: right;
    display: table;
    float: right;
    margin: 10px -5px 20px 0px;
    padding-bottom: 15px;
}

.date-inputs {
    text-align: right;
}

.ctr-row {
    display: table-row;
}
.ctr-cell{
    display:  table-cell;
}

.vdpComponent  {
    font-size: 18px;
}
</style>

<script>

import DatePick from 'vue-date-pick';
import moment from 'moment';
import 'vue-date-pick/dist/vueDatePick.css';
import fecha from 'fecha';

export default {
    components: {DatePick},
    props: ["onSubmit"],
    data: function() {
        return{
            endDate: null,
            format: 'DD/MMM/YYYY',
            date: fecha.format(new Date(), 'DD/MMM/YYYY')
        };
    },
    methods: {
    submitDate: function(){
        this.endDate = moment(this.endDate).format('YYYY-MM-DD');
        this.onSubmit(this.endDate);
    },
    parseDate(dateString, format) {
        return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
        return fecha.format(dateObj, format);
    }
  },
  mounted() {
  }    
}
</script>