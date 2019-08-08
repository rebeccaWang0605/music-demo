const root = window.player;
let nowIndex = 0;
let len;
let dataList;
const audio = root.audioManager;
const pro = root.progressControl;
let index; 
let timer;

const rotate = (deg) =>{
    clearInterval(timer);
    timer = setInterval(() =>{
        deg += 2;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            transform:`rotateZ(${deg}deg)`,
            transition:'all 1s linear'
        })
    },200)
}

const selectPlay = (index) =>{
    $('.play-item').removeClass('active').eq(index).addClass('active');
}

const bindEvent = () =>{
    $('body').on('play:change',(e,i,s) =>{
        audio.getAudio(dataList[i].audio);
        $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            transform:`rotateZ(0deg)`,
            transition:'none'
        })
        if(audio.status === 'play' || s === 'skip'){ 
            audio.play();
            pro.start();
            rotate(0);
        }
        root.renderPage(dataList[i]);
        pro.renderAllTime(dataList[i].duration);
        pro.skip(0,0);
        selectPlay(i);
    })
    $('.prev').on('click',() =>{
        nowIndex = index.prev();
        $('body').trigger('play:change',nowIndex);
    });
    $('.next').on('click',() =>{
        nowIndex = index.next();
        $('body').trigger('play:change',nowIndex);
    })
    $('.play').on('click',() =>{
        audio.getAudio(dataList[nowIndex].audio);
        if(audio.status === 'pause'){   
            audio.play();
            pro.start();
            audio.playTo(pro.curTime);
            let deg = parseInt($('.img-box').attr('data-deg'));
            rotate(deg);
            selectPlay(nowIndex);
        }else if(audio.status === 'play'){
            audio.pause();
            pro.stop();
            clearInterval(timer);
            $('.play-item').removeClass('active')
        }
        $('.play').toggleClass('playing')
    })

    const proLeft = $('.pro-bottom').offset().left;
    const width = $('.pro-bottom').width();

    $('.slider').on('touchstart',e =>{
        if(audio.status === 'play'){
            pro.stop();
        }
    }).on('touchmove',e =>{
        let { clientX} = e.changedTouches[0];
        let per = (clientX - proLeft) /width;
        if(per >= 0 && per <= 1){
            let curTime =  Math.round(per * pro.time);
            pro.skip(per,curTime)
            audio.playTo(curTime);
        } 
    }).on('touchend', e =>{
        if(audio.status === 'play'){
            pro.start();
        }
    })

    $(audio.audio).on('ended', () =>{
        $('.next').trigger('click')
    })

    $('.list').on('click',() => {
        $('.play-list-container').addClass('show');
        $('.list').addClass('play-list');
    })

    $('.play-list-close').on('click', () =>{
        $('.play-list-container').removeClass('show');
        $('.list').removeClass('play-list');
    })

    $('.play-list-content').on('click','li',function(e){
        let i = $(this).index();
        index.setIndex(i);
        $('body').trigger('play:change',[i,'skip']);
        $('.play').addClass('playing')  
    })
}


const renderPlayList = (data) =>{
    let oLi = '';
    data.forEach((ele,index) =>{
    oLi += `<li class="play-item line">
                ${ele.song}-<span>${ele.singer}</span>
            </li>`
    })
    $('.play-list-content').html(oLi);
}


const getData = (url) =>{
    $.ajax({
        url:url,
        success:(res) => {
            len = res.length;
            dataList = res;
            root.renderPage( dataList[nowIndex]);
            pro.renderAllTime( dataList[nowIndex].duration);
            index = new root.IndexControl(len);
            renderPlayList(dataList);
            bindEvent();
        },
        fail:(err) => {
            console.log(err)
        }
    })
}


getData('http://localhost:8888/dist/mock/data.json');