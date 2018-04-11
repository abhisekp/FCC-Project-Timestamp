import _ from 'lodash/fp';
import moment from 'moment';
import StampIt from '@stamp/it';
import Privatize from '@stamp/privatize';
import { setName } from '@stamp/named';

const Time = StampIt({
  init(timestring) {
    this.time = moment.utc(timestring, ['MMMM DD YYYY', 'DD MMMM YYYY', 'YYYY MMMM DD', 'DD MM YYYY', 'X'], false);
  },
  
  methods: {
    getUnixTimestamp() {
      return this.time.isValid() ? this.time.unix() : null;
    },
    getNaturalTimestamp() {
      return this.time.isValid() ? this.time.format('MMMM DD, YYYY') : null;
    },
    isValid() {
      return this.time.isValid();
    },
  },
}).compose(setName('TimeStamp'), Privatize);

export default Time;