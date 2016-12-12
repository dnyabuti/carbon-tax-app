/**
 * @flow
 */
'use strict';

function formatTime(unix: number): string {
  var date = new Date(unix);
  var nowDate = new Date(new Date().getTime()).toLocaleDateString();
  var lDate = date.toLocaleDateString();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes;
  if (lDate===nowDate) {
    return strTime + ' ' + ampm;
  }
  return lDate + ', ' + strTime + ' ' + ampm;
}

module.exports = formatTime;
