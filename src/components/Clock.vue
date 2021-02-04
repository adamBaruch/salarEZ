<template>
  <div class="q-pa-md">
    <div  class="clockBox">
      <span class="clock">{{hoursFormat}}</span>
      <span class="sep">{{colon }}</span>
      <span class="clock">{{minutesFormat}}</span>
      <span class="sep">{{colon }}</span>
      <span class="clock">{{secondsFormat}}</span>
    </div>
    <div>
      <q-btn
        class=" btn q-pa-sm"
        push
        :disable="started"
        :color="!started ? 'blue' : 'grey'"
        round
        icon="fas fa-play fa-2x"
        @click="startClock()"
      />
      <q-btn
        class="btn q-pa-sm"
        push
        :disable="!started"
        :color="started ? 'secondary' : 'grey'"
        round
        icon="fas fa-stop"
        @click="stopTime()"
      />
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import utills from "../middleware/utill";

export default {
  name: "Clock",
  data() {
    return {
      item: {
        date: '',
        day: '',
        month: '',
        year: '',
        duration: '',
        start: '',
        end: '',
        payday: '',
        startTimeFormat: '',
        endTimeFormat: '',
        durationTimeFormat: '',
      },
      clock: {
        seconds: 0,
        minutes: 0,
        hours: 0
      },
      // secondsFormat: this.clock.seconds > 9 ? this.clock.seconds : '0' + Math.floor(this.clock.seconds),
      // minutesFormat: this.clock.minutes > 9 ? this.clock.minutes : '0' + Math.floor(this.clock.minutes),
      // hoursFormat: this.clock.hours > 9 ? this.clock.hours : '0' + Math.floor(this.clock.hours)
      secondsFormat: '00',
      minutesFormat: '00',
      hoursFormat: '00',
      colon: ":",
      started: false
    }
  },
  computed: mapState('shifts', [
    'shifts',
    'editedShift',
    'editedShiftId',
    'userInfo'
  ]),
  created() {
    //todo: check first if start time in store then in firebase
    this.getUserInfo()
      .then(() => {
        if (this.userInfo.startTime != null) {
          this.started = true;
          let duration = Math.floor((new Date().getTime() - this.userInfo.startTime.startInMillis) / 1000);
          this.clock.hours = Math.floor(duration / 3600);
          duration = duration - this.clock.hours * 3600;
          this.clock.minutes = Math.floor(duration / 60);
          duration = duration - this.clock.minutes * 60;
          this.clock.seconds = duration;
          this.secondsFormat = utills.digitizeSingle(this.clock.seconds);
          this.minutesFormat = utills.digitizeSingle(this.clock.minutes);
          this.hoursFormat = utills.digitizeSingle(this.clock.hours);
          this.showClock();
        }
      })
      .catch(() => {
        console.log('לא עודכן שכר שעתי')
      })
  },
  methods: {
    showClock() {
      this.interval = setInterval(() => {
          if (this.clock.seconds < 59) {
            this.clock.seconds += 1;
            this.secondsFormat = utills.digitizeSingle(this.clock.seconds);
          } else if (this.clock.minutes < 59) {
            this.clock.minutes += 1;
            this.clock.seconds = 0;
            this.secondsFormat = '00';
            this.minutesFormat = utills.digitizeSingle(this.clock.minutes);
          } else if (this.clock.hours < 23) {
            this.clock.hours += 1;
            this.clock.minutes = 0;
            this.clock.seconds = 0;
            this.secondsFormat = '00';
            this.minutesFormat = '00';
            this.hoursFormat = utills.digitizeSingle(this.clock.hours);
          } else {
            this.clock.seconds = 0;
            this.clock.minutes = 0;
            this.clock.hours = 0;
            this.secondsFormat = '00';
            this.minutesFormat = '00';
            this.hoursFormat = '00';
          }
        }
        , 1000);
    },
    startClock() {
      this.started = true;
      const time = new Date();
      this.saveStartTimeToDb(this.dateToObj(time));
      this.showClock();
    },
    dateToObj(time) {
      return {
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds(),
        year: time.getFullYear(),
        month: time.getMonth(),
        day: time.getDate(),
        startInMillis: time.getTime()
      }
    },
    stopTime() {
      this.started = false;
      this.createItemData();
      this.setEditedShift(this.item);
      this.insertShift();
      this.saveStartTimeToDb(null);
      this.clearDisplay();
    },
    createItemData() {
      const startDate = this.userInfo.startTime;
      const endDate = this.dateToObj(new Date());
      const overSettings = [
        {numOfHours: 8, percentage: 1},
        {numOfHours: 2, percentage: 1.25},
        {numOfHours: 8, percentage: 1.5}
      ]
      this.item.year = Number.parseInt(startDate.year);
      this.item.month = Number.parseInt(startDate.month) + 1;
      this.item.day = Number.parseInt(startDate.day);
      this.item.start = startDate.hours + startDate.minutes / 60 + startDate.seconds / 3600;
      this.item.end = endDate.hours + endDate.minutes / 60 + endDate.seconds / 3600;
      this.item.duration = Number.parseFloat(((this.item.end - this.item.start)).toFixed(2));
      this.item.date = startDate.year + '-' + (Number.parseInt(startDate.month) + 1) + '-' + startDate.day;
      this.item.payday = utills.paydayCalc(overSettings, this.item.duration, this.userInfo.wage);

      this.item.startTimeFormat = utills.digitize(startDate.hours, startDate.minutes);
      this.item.endTimeFormat = utills.digitize(endDate.hours, endDate.minutes);
      this.item.durationTimeFormat = utills.digitize(this.item.duration, utills.toMinutes(this.item.duration));
    },
    clearDisplay() {
      clearInterval(this.interval);
      this.clock.hours = 0;
      this.clock.minutes = 0;
      this.clock.seconds = 0;
      this.secondsFormat = '00';
      this.minutesFormat = '00';
      this.hoursFormat = '00';
    },
    ...mapActions('shifts', ['insertShift', 'updateShift', 'resetShift',
      'setEditedShift', 'saveStartTimeToDb', 'getUserInfo'])
  }
}
</script>

<style scoped>

.btn{
  margin: auto 30px;
  -webkit-box-reflect: below 0 -webkit-gradient(linear, right top,
  right bottom, from(transparent), to(rgba(255,255,255,0.4)));
}

.clock {
  font-size: 60px;
  width: 75px;
  height: 10px;
  text-align: center;
}

.sep {
  font-size: 60px;
  width: 20px;
  text-align: center;
}

.clockBox {
  opacity: 0.7;
  padding: 100px 40px;
  border: 6px solid #3396f3;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  margin: 20px;
  box-shadow: 0 3px 10px 3px rgba(51,150,243,.4);
}
</style>
