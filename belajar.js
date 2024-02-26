let dateNow = new Date();

var day = dateNow.getDay();

// Array of day names
var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Get the current hour, minute, and second
var hour = dateNow.getHours();
var minute = dateNow.getMinutes();
var second = dateNow.getSeconds();

console.log("Today is = " + daylist[day]);
console.log("Current time is = " + daylist[hour]);