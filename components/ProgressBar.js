class ProgressBar {
    constructor(type, progressDom){
        this.type = type;
        this.progress = 0;
        this.progressDom = progressDom;
    }
    setTime(type, time){
        let seconds = time / 1000;
        switch (type) {
            case 'pomodore':
                this.progress = 100 - seconds / 15;
                this.progressDom.style.background = `conic-gradient(#5C81D9 ${this.progress * 3.6}deg, #d9d9d9 0deg)`;
            break;
            case 'long':
                this.progress = 100 - seconds / 18;
                this.progressDom.style.background = `conic-gradient(green ${this.progress * 3.6}deg, #d9d9d9 0deg)`;
            break;
            case 'short':
                this.progress = 100 - seconds / 3;
                this.progressDom.style.background = `conic-gradient(green ${this.progress * 3.6}deg, #d9d9d9 0deg)`;
            break;
            default:
            break;
        }
    }
}