let $music = $('.music'),
    $oneBox = $('.oneBox'),
    $loadingBox = $('.loadingBox'),
    $current = $loadingBox.find('.current'),
    $msg = $oneBox.find('.msg'),
    $page = $oneBox.find('.page'),
    $twoBox = $('.twoBox'),
    $threeBox = $('.threeBox'),
    $endBox = $('.endBox');
//音乐播放板块
~ function () {
    var index = 2;
    $music.on('click', function (e) {
        var audio = this.getElementsByTagName('audio')[0];
        if (index === 2) {
            index = 1;
            this.style.backgroundImage = 'url("./img/musicoff.png")';
            audio.pause();
        } else {
            index = 2;
            this.style.backgroundImage = "url('./img/musicon.png')";
            audio.play();
        }
    })
}();
//第一页
let oneBoxRender = (function () {
    let done = function () {
        let timer = setTimeout(() => {
            $loadingBox.remove();
            $oneBox.show();
        }, 1500);
        setTimeout(() => {
            $msg.show();
        }, 3500);
        setTimeout(() => {
            $page.show();
        }, 5500);
    }
    return {
        init: function () {
            done()
        }
    }
})()
//loading页
let loadingRender = (function () {
    let imgData = ["img/psb.jpg", "img/wenli.png", "img/gezi.png", "img/leaves.png", "img/musicon.png", "img/musicoff.png", 'img/1.png', 'img/3.png'];
    let n = 0,
        len = imgData.length;

    let run = function (callback) {
        imgData.forEach(item => {
            let tempImg = new Image;
            tempImg.onload = () => {
                tempImg = null;
                $current.css('width', (++n) / len * 100 + '%');
                //加载完成让当前的loading页消失
                if (n / len >= 0.9) {
                    clearTimeout(delayTimer)
                    callback && callback()
                }
            };
            tempImg.src = item;
        })
    }
    //=>设置最长等待时间
    let delayTimer = null;
    let maxDelay = function (callback) {
        delayTimer = setTimeout(() => {
            if (n / len >= 0.85) {
                $current.css('width', '100%');
                callback && callback();
                return
            }
            alert('非常遗憾，您的网络状况不佳，请稍后再试!')
            window.location.href = 'https://liuxiaojiea.github.io/introduction/'
        }, 10000)
    }
    //DONE：完成
    let done = oneBoxRender.init
    return {
        init: function () {
            run(done);
            maxDelay(done);
        }
    }
})()
loadingRender.init();

//第二页
let twoBoxRender = (function () {
    let $inner = $twoBox.find('.inner'),
        $innerImg = $inner.find('img'),
        $innerLi = $inner.find('li'),
        $innerSec = $twoBox.find('.sec'),
        $innerDec = $twoBox.find('.dec');
    return {
        init: function () {
            $oneBox.hide();
            $twoBox.show();
            setTimeout(() => {
                $innerImg.show()
                $innerLi.show()
                $innerDec.show();
                $innerSec.show()
            }, 1000)
        }
    }
})()
//第三页
let threeBoxRender = (function () {
    let $inner = $threeBox.find('.inner'),
        $content=$inner.find('.content');
    return {
        init: function () {
            setTimeout(()=>{
                $inner.show()
                $content.show()
            },1000)
        }
    }
})()
let endBoxRender=(function(){
    return {
        init:function(){

        }
    }
})()
//页面切换
function move(el, callback) {
    let str = 'up';
    el.ontouchstart = function (e) {
        this.x = e.changedTouches[0].pageX;
    }
    el.ontouchend = function (e) {
        let x = e.changedTouches[0].pageX - this.x;
        if(x<=50 && x>=-50)return 
        if (x > 50) {
            str = 'down'
        } else if(x<-50){
            str = 'up'
        }
        callback(str);
    }
}
move($oneBox[0], function (str) {
    if (str == 'up') {
        $oneBox[0].style.display = 'none';
        $twoBox[0].style.display = 'block'
        twoBoxRender.init()
    } else{
        $oneBox[0].style.display = 'none';
        $endBox[0].style.display = 'block'
        endBoxRender.init()
    }
})
move($twoBox[0], function (str) {
    if (str == 'up') {
        $twoBox[0].style.display = 'none';
        $threeBox[0].style.display = 'block';
        threeBoxRender.init()
    } else {
        $twoBox[0].style.display = 'none';
        $oneBox[0].style.display = 'block'
        oneBoxRender.init()
    }
})
move($threeBox[0], function (str) {
    if (str == 'up') {
        $threeBox[0].style.display = 'none';
        $endBox[0].style.display = 'block';
        endBoxRender.init();
    } else {
        $threeBox[0].style.display = 'none';
        $twoBox[0].style.display = 'block';
        twoBoxRender.init()
    }
})
move($endBox[0], function (str) {
    if (str == 'up') {
        $endBox[0].style.display = 'none';
        $oneBox[0].style.display = 'block';
        oneBoxRender.init();
    } else {
        $endBox[0].style.display = 'none';
        $threeBox[0].style.display = 'block';
        threeBoxRender.init()
    }
})