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
        @click="handleButtonClick(startClock)"
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
        start: '',
        end: '',
        duration: '',
      },
      clock: {
        seconds: 0,
        minutes: 0,
        hours: 0
      },
      secondsFormat: '00',
      minutesFormat: '00',
      hoursFormat: '00',
      colon: ":",
      started: false
    }
  },
  computed: mapState('shifts', ['shifts', 'editedShift', 'userInfo']),
  created() {
    this.getUserInfo()
      .then(() => {
        if (this.userInfo.startTime != null) {
          this.started = true;
          this.item.start = this.userInfo.startTime
          let duration = Math.floor((new Date().getTime() - this.userInfo.startTime) / 1000);
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
      this.item.start = time.getTime();
      this.saveStartTime(time.getTime());
      this.showClock();
    },
    stopTime() {
      this.started = false;
      this.item.end = new Date().getTime();
      this.item.duration = this.item.end - this.item.start;
      this.insertShift(utills.makeShiftFromClock(this.item,this.userInfo.wage,this.userInfo.overtimeSettings));
      this.item = {};
      this.saveStartTime(null);
      this.clearDisplay();
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
    ...mapActions('shifts', ['insertShift', 'saveStartTime', 'getUserInfo','handleButtonClick'])
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
