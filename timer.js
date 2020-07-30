function setInputFilter(textbox, inputFilter) {
    textbox.forEach(function(input) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        input.addEventListener(event, function() {
            if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
            this.value = "";
            }
        });
        });
    });
}

setInputFilter(document.querySelectorAll("input"), function(value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});


// Tracker

let status = 0; // 0 - work, 1 - rest
const startBtn = document.querySelector('.start-btn');
const pauseBtn = document.querySelector('.pause-btn');
const stopBtn = document.querySelector('.stop-btn');
let date = new Date("2017-01-26");

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
        document.querySelector('.status').style.display = '';
        document.querySelector('.timer span').textContent = document.querySelector('.work_time input').value + ":00"; //!!!!!вызывать функцию для передачи значения из инпута в таймер

    }
    
}


function trackTime(status) {
    document.addEventListener("click", function(event) {
        if(event.target.classList.contains('stop-btn') || event.target.classList.contains('pause-btn')) {
            status = -1;
        }
    });

    if (status == 0) {
        document.querySelector('.status').style.display = 'inherit';
        time = document.querySelector('.timer span').textContent
        min = parseInt(time.split(':')[0], 10)
        sec = parseInt(time.split(':')[1], 10)
        date.setMinutes(min, sec);
        date.setSeconds(date.getSeconds() - 1);
        time = date.getMinutes() + ':' + date.getSeconds();
        document.querySelector('.timer span').textContent = time;

        if (time !== "0:0") {
            setTimeout(() => trackTime(status), 1000);
        }
        else {
            status = 1;
            trackTime(status);
        }

    }
    if (status == 1) {
        document.querySelector('.status').textContent = 'Rest';
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