import moment from 'moment';

export default (() => {
  /**
   * Returns quarter in which date belongs.
   * 
   * @param {Date} date 
   */
  function dateQuarter(date) {
    const month = date.getMonth();
    const year = date.getFullYear();

    if (month < 3) {
      return [`${year}-01-01`, `${year}-03-31`];
    } else if (month < 6) {
      return [`${year}-04-01`, `${year}-06-30`];
    } else if (month < 9) {
       return [`${year}-07-01`, `${year}-09-30`];
    } else {
      return [`${year}-10-01`, `${year}-12-31`];
    }
  }

  function dateQuarterStr(date) {
    const month = date.getMonth();
    const year = date.getFullYear();

    if (month < 3) {
      return `Q1-${year}`;
    } else if (month < 6) {
      return `Q2-${year}`;
    } else if (month < 9) {
      return `Q3-${year}`;
    } else {
      return `Q4-${year}`;
    }
  }

  function isoDate(date) {
    return moment(date).isoDate;
  }

  return {dateQuarter, dateQuarterStr, isoDate};
})();