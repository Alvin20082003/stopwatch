class Stopwatch {
    constructor(display) {
        this.time = 0; // Time in milliseconds
        this.offset = 0;
        this.interval = null;
        this.display = display;
        this.isOn = false;
    }

    start() {
        if (!this.isOn) {
            this.interval = setInterval(() => this.update(), 10);
            this.offset = Date.now();
            this.isOn = true;
        }
    }

    stop() {
        if (this.isOn) {
            clearInterval(this.interval);
            this.isOn = false;
        }
    }

    reset() {
        this.time = 0;
        this.update();
        document.querySelector('.lap-box').innerHTML = ''; 
    }

    lap() {
        const lapBox = document.querySelector('.lap-box');
        const lapTime = document.createElement('li');
        lapTime.textContent = `${this.formatTime('minutes')}:${this.formatTime('seconds')}.${this.formatTime('milliseconds')}`;
        lapBox.appendChild(lapTime);
    }

    update() {
        if (this.isOn) this.time += this.delta();
        this.display.querySelector('.minutes').textContent = this.formatTime('minutes');
        this.display.querySelector('.seconds').textContent = this.formatTime('seconds');
        this.display.querySelector('.milliseconds').textContent = this.formatTime('milliseconds');
    }

    delta() {
        const now = Date.now();
        const timePassed = now - this.offset;
        this.offset = now;
        return timePassed;
    }

    formatTime(unit) {
        const minutes = Math.floor(this.time / 60000);
        const seconds = Math.floor((this.time % 60000) / 1000);
        const milliseconds = this.time % 1000;

        return unit === 'minutes'
            ? String(minutes).padStart(2, '0')
            : unit === 'seconds'
            ? String(seconds).padStart(2, '0')
            : String(Math.floor(milliseconds / 10)).padStart(2, '0'); // Convert milliseconds to tenths of a second
    }
}

const timerDisplay = document.querySelector('.timer');
const watch = new Stopwatch(timerDisplay);

document.querySelector('.toggle').addEventListener('click', function() {
    watch.isOn ? watch.stop() : watch.start();
    this.textContent = watch.isOn ? 'Stop' : 'Start';
});

document.querySelector('.reset').addEventListener('click', function() {
    watch.reset();
    document.querySelector('.toggle').textContent = 'Start';
});

document.querySelector('.lap').addEventListener('click', function() {
    if (watch.isOn) watch.lap();
});
