const dayWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

let today = new Date();
let options = { weekday: 'long' };
let actualDay = today.toLocaleDateString('en-EN', options);

actualDay = actualDay.charAt(0).toUpperCase() + actualDay.slice(1);

let arrDayOrder = dayWeek.slice(dayWeek.indexOf(actualDay)).concat(dayWeek.slice(0, dayWeek.indexOf(actualDay)));

export default arrDayOrder;
