function hasNumber(myString) {
    return /\d/.test(myString);
  }
  
function inputToTimer(input_value, status) {
  
  //format and send input value to timer field
  
      if(hasNumber(input_value)){
        if(input_value.replace(/[^0-9]/g, '') < 10 && input_value.replace(/[^0-9]/g, '') > 0) {
          document.querySelector('.timer span').textContent = "0" + input_value.replace(/[^0-9]/g, '') + ":00";
        } else if(input_value.replace(/[^0-9]/g, '') == 0) {
          document.querySelector('.timer span').textContent = "00:00";
        } else {
          document.querySelector('.timer span').textContent = input_value.replace(/[^0-9]/g, '') + ":00";
        }
      } else {
        document.querySelector('.timer span').textContent = "00:00";
      }
      if (input_value.replace(/[^0-9]/g, '') == 0){
        stopBtn.disabled = true;
        startBtn.disabled = true;
        pauseBtn.disabled = true;
      } else {
        makeActiveBtn(startBtn);
      }
}


// Tracker
let audio = new Audio();
audio.preload = 'auto';
audio.src = './music/timer-bell.mp3';

let status = 0; // 0 - work, 1 - rest
const startBtn = document.querySelector('.start-btn');
const pauseBtn = document.querySelector('.pause-btn');
const stopBtn = document.querySelector('.stop-btn');
let date = new Date("2017-01-26");
let timerElement = document.querySelector('.timer span')
let workTimeElement = document.querySelector('.work_time input')
let breakTimeElement = document.querySelector('.break_time input')
let statusElement = document.querySelector('.status');

document.addEventListener("click", function(event) {
    if(event.target.classList.contains('btn')) {
        startTimer(status, event.target);
    }
});

function startTimer(status, button) {
    if (button == startBtn) {
        document.querySelectorAll('input').forEach(function(field) {
            field.disabled = true;
        })
        makeActiveBtn(pauseBtn);
        makeActiveBtn(stopBtn);
        makeUnactiveBtn(startBtn);
        trackTime(status, button);
        activeTimerStyle();
    }
    if (button == pauseBtn) {
        makeActiveBtn(startBtn);
        makeActiveBtn(stopBtn);
        makeUnactiveBtn(pauseBtn);
        NonActiveTimerStyle();
    }
    if (button == stopBtn) {
        makeUnactiveBtn(stopBtn);
        makeActiveBtn(startBtn);
        makeActiveBtn(pauseBtn);
        NonActiveTimerStyle();
        document.querySelectorAll('input').forEach(function(field) {
            field.disabled = false;
        });
        statusElement.style.display = '';
        inputToTimer(workTimeElement.value);
        //timerElement.textContent = workTimeElement.value + ":00"; 
    }
}

function trackTime(status) {

    document.addEventListener("click", function(event) {
        if(event.target.classList.contains('stop-btn') || event.target.classList.contains('pause-btn')) {
            status = -1;
        }
    });

    if (status == 0) {

        countDown();
        if (time !== "00:00") {
            setTimeout(() => trackTime(status), 1000);
        }
        else {
            status = 1;
            audio.play();
            statusElement.textContent = 'Rest';
            inputToTimer(breakTimeElement.value);
            //timerElement.textContent = breakTimeElement.value + ':00';
        }
    }

    if (status == 1) {

        countDown();
        if (time !== "00:00") {
            console.log(time);
            setTimeout(() => trackTime(status), 1000);
        }
        else {
            status = 0;
            audio.play();
            statusElement.textContent = 'Work';
            timerElement.textContent = workTimeElement.value + ':00';
            trackTime(status);
        }
    }
}

function makeUnactiveBtn(button) {
    // if (button.classList.contains('active')) {
    //     button.classList.remove('active');
    //     button.classList.add('btn');
    // }
    button.disabled = true;
}

function makeActiveBtn(button) {
    // if (!(button.classList.contains('active'))) {
    //     button.classList.remove('btn')
    //     button.classList.add('active');
    // }
    button.disabled = false;
}

function activeTimerStyle(){
  document.querySelector('.timer img').className += "timer_active";
}

function NonActiveTimerStyle(){
  document.querySelector('.timer img').classList.remove("timer_active");
}

function countDown() {
    statusElement.style.display = 'inherit';
    time = timerElement.textContent
    min = parseInt(time.split(':')[0], 10)
    sec = parseInt(time.split(':')[1], 10)
    date.setMinutes(min, sec);
    date.setSeconds(date.getSeconds() - 1);
    time = makeTimeFormat(date.getMinutes()) + ':' + makeTimeFormat(date.getSeconds());
    timerElement.textContent = time;
}

function makeTimeFormat(time) {
    if (time < 10) {
        return '0' + time; 
    }
    else {
        return time;
    }
}