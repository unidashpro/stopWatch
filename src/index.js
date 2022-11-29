import { hourSpot, minuteSpot, secondSpot, millisecondSpot, resetBtn, startBtn, stopBtn, lapBtn, resultSpot, clearBtn } from './variables.js';
let timeout;
let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;
let counter = 1;

startBtn.addEventListener('click', () => {
    clearTimeout(timeout);
    lapBtn.disabled = false;
    startTime(millisecond, millisecondSpot);
});

stopBtn.addEventListener('click', () => {
    clearTimeout(timeout);
});

resetBtn.addEventListener('click', () => {
    clearTimeout(timeout);
    resetTime();
    resetResults();
    lapBtn.disabled = true;
});

lapBtn.addEventListener('click', () => {
    showLap();
    resetTime();
});

clearBtn.addEventListener('click', () => {
    resetResults();
});

function startTime() {
    showTime();
    timeout = setTimeout(() => {
        startTime();
    }, 7);
}

function resetTime() {
    hour = minute = second = millisecond = 0;
    hourSpot.innerText = minuteSpot.innerText = secondSpot.innerText = millisecondSpot.innerText = '00';
}

function formatTime(measure, place) {
    let space = measure <= 9 ? '0' : '';
    return `${space}${measure}`;
}

function showTime() {
    millisecond++;
    millisecondSpot.textContent = formatTime(millisecond, millisecondSpot);
    secondSpot.textContent = formatTime(second, secondSpot);
    minuteSpot.textContent = formatTime(minute, minuteSpot);
    hourSpot.textContent = formatTime(hour, hourSpot);
    if (millisecond >= 99) {
        millisecond = 0;
        second++;
    }
    if (second > 59) {
        second = 0;
        minute++;
    }
    if (minute >= 59) {
        minute = 0;
        hour++;
    }
}

function showLap() {
    const lapScore = document.createElement('div');
    lapScore.classList.add('result');
    lapScore.textContent =
        `Lap ${counter}: ` + formatTime(hour, hourSpot) + ':' + formatTime(minute, minuteSpot) + ':' + formatTime(second, secondSpot) + ':' + formatTime(millisecond, millisecondSpot);
    resultSpot.append(lapScore);
    counter++;
}

function resetResults() {
    resultSpot.innerHTML = '';
    counter = 1;
}
