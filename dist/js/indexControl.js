(function($,root){
    class IndexControl{
        constructor(len){
            this.index = 0;
            this.len = len;
        }
        prev(){
            return this.getCurIndex(-1)
        }
        next(){
            return this.getCurIndex(1)
        }
        getCurIndex(val){
            let index = this.index;
            let len = this.len;
            let curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
        setIndex(i){
            this.index = i;
        }
    }

    root.IndexControl = IndexControl;
})(Zepto,window.player || (window.player = {}))