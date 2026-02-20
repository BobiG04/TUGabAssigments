let alarmTime = null;
let isAlarmRinging = false;
let audioCtx = null;
let oscillator = null;

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

    if (alarmTime && !isAlarmRinging) {
        const currentTime = `${hours}:${minutes}`;
        if (currentTime === alarmTime && seconds === '00') {
            triggerAlarm();
        }
    }
}

function setAlarm() {
    const input = document.getElementById('alarmTime').value;
    if (input) {
        alarmTime = input;
        document.getElementById('alarmStatus').textContent = `Alarm set for ${alarmTime}`;
        document.getElementById('alarmStatus').style.color = '#2ecc71';

        // Initialize AudioContext on user interaction to allow playback later
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    } else {
        alert("Please select a time.");
    }
}

function triggerAlarm() {
    isAlarmRinging = true;
    document.getElementById('alarmStatus').textContent = "ALARM RINGING!";
    document.getElementById('alarmStatus').style.color = '#e74c3c';
    document.getElementById('stopAlarmBtn').style.display = 'block';
    document.getElementById('setAlarmBtn').style.display = 'none';

    if (document.getElementById('vibrateCheck').checked && navigator.vibrate) {
        navigator.vibrate([500, 200, 500, 200, 500, 200, 500, 200, 500, 200]);
    }

    playSound();
}

function playSound() {
    const soundType = document.getElementById('alarmSound').value;

    if (soundType === 'spotify') {
        const url = document.getElementById('spotifyUrl').value;
        if (url) {
            window.open(url, '_blank');
        }
        return;
    }

    if (!audioCtx) return;

    oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (soundType === 'beep') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
    } else if (soundType === 'siren') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(500, audioCtx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(1000, audioCtx.currentTime + 0.5);
    } else {
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
    }

    oscillator.start();
}

function stopAlarm() {
    isAlarmRinging = false;
    document.getElementById('alarmStatus').textContent = "";
    document.getElementById('stopAlarmBtn').style.display = 'none';
    document.getElementById('setAlarmBtn').style.display = 'block';

    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
    }

    if (navigator.vibrate) {
        navigator.vibrate(0);
    }
}

setInterval(updateClock, 1000);
updateClock();

document.addEventListener('DOMContentLoaded', () => {
    const soundSelect = document.getElementById('alarmSound');
    const spotifyInput = document.getElementById('spotifyUrl');
    soundSelect.addEventListener('change', () => {
        spotifyInput.style.display = soundSelect.value === 'spotify' ? 'inline-block' : 'none';
    });
});