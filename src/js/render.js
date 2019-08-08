
(function($,root){
        
    const renderImg = (src) =>{
        const oImg = new Image();
        oImg.src = src;
        oImg.onload = () =>{
            $('.img-box img').attr('src',src);
            root.blurImg(oImg,$('body'))
        }
        
    }

    const renderInfo = (song,singer,album) =>{
        let str = `<p class="song-name">${song}</p>
                    <p class="singer">${singer}</p>
                    <p class="album">${album}</p>`;
        $('.song-info').html(str);
    }

    const renderIsLike = (isLike) =>{
        if(isLike){
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }
    
    // $('.cur-time').html(0);
    // $('.total-time').html(data.duration);
    
    const renderPage = (data) =>{
        renderImg(data.image);
        renderInfo(data.song,data.singer,data.album);
        renderIsLike(data.isLike)
    }

    root.renderPage = renderPage;
})(Zepto, window.player || (window.player = {}))