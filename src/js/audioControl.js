(function($,root){
    class AudioManager{
        constructor(){
            this.audio = new Audio();
            this.status = 'pause';
        }
        play(){
            this.audio.play();
            this.status = 'play'
        }
        pause(){
            this.audio.pause();
            this.status = 'pause';
        }
        getAudio(src){
            this.audio.src = src;
            this.audio.load();
        }
        playTo(time){
            this.audio.currentTime = time;
        }
    }

    root.audioManager = new AudioManager();

})(Zepto,window.player || (window.player = {}))