const moment = require('moment');

function Time(timestring) {
  // Published v1 contract: Unix seconds and a natural date in UTC.
  const time = timestring === undefined
    ? moment.utc()
    : typeof timestring !== 'string' || timestring.length > 200
      ? moment.invalid()
      : moment.utc(timestring, [
        'MMMM D, YYYY', 'MMM D, YYYY', 'Do MMMM YYYY',
        'MMMM DD YYYY', 'DD MMMM YYYY', 'YYYY MMMM DD',
        'DD MM YYYY', 'X', moment.ISO_8601,
      ], false);
  return {
    isValid: () => time.isValid(),
    getUnixTimestamp: () => time.isValid() ? time.unix() : null,
    getNaturalTimestamp: () => time.isValid() ? time.format('MMMM DD, YYYY') : null,
  };
}
module.exports = Time;
