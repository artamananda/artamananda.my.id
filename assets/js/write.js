function isValid(inputField) {
  if (inputField == "") {
    return false;
  } else {
    var datetime = "[" + getDateTime() + "]";
    const url = "https://sheet2api.com/v1/WlmGDOXaS8W7/db-question";
    const newRowData = { timestamp: datetime, question: inputField };
    const options = {};
    Sheet2API.write(url, options, newRowData).then(
      function (result) {
        console.log(result);
      },
      function (error) {
        console.log(error);
      }
    );
  }
  return true;
}

function getDateTime() {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var now = new Date();
  var year = now.getFullYear();
  var month = months[now.getMonth()];
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (day.toString().length == 1) {
    day = "0" + day;
  }
  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }
  if (second.toString().length == 1) {
    second = "0" + second;
  }
  var dateTime =
    day + " " + month + " " + year + ", " + hour + ":" + minute + ":" + second;
  return dateTime;
}
