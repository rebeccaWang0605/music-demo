(function($,root){
    class ProgressControl{
        constructor(){
            this.lastPer = 0;
            this.curTime = 0;
        }
        transform(val){
            return `0${val}`.slice(-2);
        }
        formatTime(t){
            t = Math.round(t);
            let min = Math.floor(t / 60);
            let sec = t - min * 60;
            min = this.transform(min);
            sec = this.transform(sec);
            return `${min}:${sec}'`
        }
        renderAllTime(duration){
            this.time = duration;
            let allTime  = this.formatTime(this.time);
            $('.total-time').html(allTime);
        }
        start(){
            cancelAnimationFrame(this.frame);
            let startTime = new Date().getTime();
            const frame = () =>{
                let curTime = new Date().getTime();
                this.percent = this.lastPer + (curTime - startTime) / (this.time * 1000);
                this.updatePage();
                this.frame = requestAnimationFrame(frame);
            }
            frame()
        }
        updatePage(per){
            this.percent = (per !== undefined ? per:this.percent);
            let curTime = this.percent * this.time;
            curTime = this.formatTime(curTime);
            $('.cur-time').html(curTime);
            let percent = `${-100+Math.round(this.percent*100)}%`;
            $('.pro-top').css({
                transform:`translateX(${percent})`
            })   
        }
        skip(per,curTime){
            this.lastPer = per;
            this.curTime = curTime;
            this.updatePage(per);
        }
        stop(){
            cancelAnimationFrame(this.frame);
            this.lastPer = this.percent;
            this.curTime = Math.round(this.lastPer * this.time);
        }

    }

    root.progressControl = new ProgressControl();
   
})(Zepto,window.player || (window.player = {}))