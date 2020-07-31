// Tracker

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
        makeActiveBtn(startBtn);
        makeUnactiveBtn(pauseBtn);
        trackTime(status, button);
    }
    if (button == pauseBtn) {
        makeActiveBtn(pauseBtn);
        makeUnactiveBtn(startBtn);
    }
    if (button == stopBtn) {
        makeUnactiveBtn(pauseBtn);
        makeUnactiveBtn(startBtn);
        document.querySelectorAll('input').forEach(function(field) {
            field.disabled = false;
        });
        statusElement.style.display = '';
        timerElement.textContent = workTimeElement.value + ":00"; //!!!!!вызывать функцию для передачи значения из инпута в таймер

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
        if (time !== "0:0") {
            console.log('1');
            setTimeout(() => trackTime(status), 1000);
        }
        else {
            status = 1;
            statusElement.textContent = 'Rest';
            timerElement.textContent = breakTimeElement.value + ':00';
        }

    }

    if (status == 1) {

        countDown();
        if (time !== "0:0") {
            console.log(time);
            setTimeout(() => trackTime(status), 1000);
        }
        else {
            status = 0;
            statusElement.textContent = 'Work';
            timerElement.textContent = workTimeElement.value + ':00';
            trackTime(status);
        }
    }
}

function makeUnactiveBtn(button) {
    if (button.classList.contains('active')) {
        button.classList.remove('active');
        button.classList.add('btn');
    }
}

function makeActiveBtn(button) {
    if (!(button.classList.contains('active'))) {
        button.classList.remove('btn')
        button.classList.add('active');
    }
}

function countDown() {
    statusElement.style.display = 'inherit';
    time = timerElement.textContent
    min = parseInt(time.split(':')[0], 10)
    sec = parseInt(time.split(':')[1], 10)
    date.setMinutes(min, sec);
    date.setSeconds(date.getSeconds() - 1);
    time = date.getMinutes() + ':' + date.getSeconds();
    timerElement.textContent = time;
}