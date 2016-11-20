
class DateTime {

  static formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(DateTime.formatNumber).join('-') + ' ' + [hour, minute, second].map(DateTime.formatNumber).join(':')
  }
  static formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  static get today() {
    return DateTime.clearTime(new Date());
  }

  static get nextMonth() {
    let now = DateTime.today.getTime();

    let current = new Date(now + 2592000000);// 1000 * 60 * 60 * 24 * 30
    return current;
  }

  static formatEventTime(date) {
    var year = date.getFullYear();
    var month = DateTime.padString(date.getMonth() + 1);
    var day = DateTime.padString(date.getDate());

    var hour = DateTime.padString(date.getHours());
    var minute = DateTime.padString(date.getMinutes());
    var second = DateTime.padString(date.getSeconds());

    return `${year}${month}${day}${hour}${minute}${second}`;
  }

  static padString(str, pad = "00") {
    str = "" + str;
    let ans = pad.substring(0, pad.length - str.length) + str;
    return ans;
  }

  static isInOneDay(date) {

  }



  static personlize(date1, date2, isAllDay) {
    // 今天 : 今天 10:00, 11:00
    // 明天 : 明天 10:10, 11:00
    // 今年同天 :  11-19 10:00 , 11-19 11:00     
    // 非今年通天:  2017-11-19 10:00   

    if (typeof (date1) === 'string') {
      date1 = new Date(date1);
    }
    if (typeof (date2) === 'string') {
      date2 = new Date(date2);
    }



    const oneDay = 86400000;
    const todayStamp = DateTime.today.getTime();
    const tomorrowStamp = todayStamp + oneDay;
    const dayNextTomorrowStamp = tomorrowStamp + oneDay;

    let date = '';
    let start = '';
    let end = '';

    let stamp1 = date1.getTime();
    let stamp2 = date2.getTime();
    if (stamp2 - stamp1 <= oneDay) { // 同一天
      if (isAllDay) {
        start = '全天';
      } else {
        start = date1.getHours() + ':' + DateTime.padString(date1.getMinutes());
        end = date2.getHours() + ':' + DateTime.padString(date2.getMinutes());
      }
      if (stamp1 > todayStamp && stamp1 < tomorrowStamp) { //今天
        date = '今天';
      } else if (stamp1 > tomorrowStamp && stamp1 < dayNextTomorrowStamp) {
        date = '明天';
      } else {
        var month = date1.getMonth() + 1;
        var day = date1.getDate()
        date = month + '月' + day + '日';
      }
    } else {

    }

    return {
      date: date,
      start: start,
      end: end
    };

  }

  static WeekDay(date) {
    let day = date.getDay();
    let weekdayName = null;
    switch (day) {
      case 1:
        weekdayName = 'Mon';
        break;
      case 2:
        weekdayName = 'Tue';
        break;
      case 3:
        weekdayName = 'Wed';
        break;
      case 4:
        weekdayName = 'Thur';
        break;
      case 5:
        weekdayName = 'Fri';
        break;
      case 6:
        weekdayName = 'Sat';
        break;
      case 7:
        weekdayName = 'Sun';
        break;
    }
    return weekdayName;
  }

  static clearTime(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }




}




module.exports = DateTime;