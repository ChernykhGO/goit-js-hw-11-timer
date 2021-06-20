'use strict';
// // готовые формулы, где `time` - разница
// // между `targetDate` и текущей датой.
// /*
//  * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
//  * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
//  */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

// /*
//  * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
//  * остатка % и делим его на количество миллисекунд в одном часе
//  * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
//  */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

// /*
//  * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
//  * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
//  */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

// /*
//  * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
//  * миллисекунд в одной секунде (1000)
//  */
// const secs = Math.floor((time % (1000 * 60)) / 1000);


class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate; 
    this.countTime = 0;
    this.timeInterval = null;
    this.refs = {
      daysField:  document.querySelector(`${selector} [data-value="days"]`),
      hoursField: document.querySelector(`${selector} [data-value="hours"]`),
      minsField:  document.querySelector(`${selector} [data-value="mins"]`),
      secsField:  document.querySelector(`${selector} [data-value="secs"]`),
    }
  }

  start() {
    const targetDate = this.targetDate.getTime();

    this.timeInterval = setInterval(() => {
      const currentTime = Date.now();
      this.countTime = targetDate - currentTime;
      const { days, hours, mins, secs } = this.getTimeComponents(this.countTime);
      this.createTextContentForTimer({ days, hours, mins, secs });
    }, 1000);
  }

  end() {
    if (this.countTime <= 0) {
      clearInterval(this.timeInterval);
    }
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  createTextContentForTimer({ days, hours, mins, secs }) {
    this.refs.daysField.textContent = days;
    this.refs.hoursField.textContent = hours;
    this.refs.minsField.textContent = mins;
    this.refs.secsField.textContent = secs;
  }
}
const countdownTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("October 20, 2021"),
});

countdownTimer.start();

























// class CountdownTimer {
//   constructor(setting) {
//     this.setting = setting;
//     this.period = 0;
//     this.timer = null;
//   }
//   start() {
//     this.period = Date.now() - setting.targetDate;
//     this.timer = setInterval(() => {
//       this.period = this.period - 1000;
//       this.updateInterface(this.period);
//     }, 1000);
//   }

//   checkForEnd(time) {
//     if (Math.floor(time / 1000) <= 0) {
//       clearInterval(this.timer);
//     }
//   }

//   updateInterface(time) {
//     this.checkForEnd(time);

//     const timerRef = document.querySelector(this.setting.selector);
//     const refs = {
//       days: timerRef.querySelector('.value[data-value="days"]'),
//       hours: timerRef.querySelector('.value[data-value="hours"]'),
//       mins: timerRef.querySelector('.value[data-value="mins"]'),
//       secs: timerRef.querySelector('.value[data-value="secs"]'),
//     };
    
//     const days = Math.floor(time / (1000 * 60 * 60 * 24));

//     const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

//     const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

//     const secs = Math.floor((time % (1000 * 60)) / 1000);
//     refs.days.textContent = this.pad(days);
//     refs.hours.textContent = this.pad(hours);
//     refs.mins.textContent = this.pad(mins);
//     refs.secs.textContent = this.pad(secs);
//   }

//   pad(value) {
//     return String(value).padStart(2, "0");
//   }
// }

// const setting = {
//   selector: "#timer-1",
//   targetDate: new Date("Jul 17, 2019"),
// };
// const countDownTimer = new CountdownTimer(setting);

// countDownTimer.start();