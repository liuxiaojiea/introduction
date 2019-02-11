let $music = $('.music'),
    $oneBox = $('.oneBox'),
    $loadingBox = $('.loadingBox'),
    $current = $loadingBox.find('.current'),
    $msg = $oneBox.find('.msg'),
    $page = $oneBox.find('.page'),
    $twoBox = $('.twoBox');
//音乐播放板块
~ function () {
    var index = 2;
    $music.on('click', function (e) {
        var audio = this.getElementsByTagName('audio')[0];
        console.log(index)
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

//loading加第一页
let loadingRender = (function () {
    let imgData = ["img/psb.jpg", "img/wenli.png", "img/gezi.png", "img/leaves.png", "img/musicon.png", "img/musicoff.png"];

    let n = 0,
        len = imgData.length;

    let run = function (callback) {
        imgData.forEach(item => {
            let tempImg = new Image;
            tempImg.onload = () => {
                tempImg = null;
                $current.css('width', (++n) / len * 100 + '%');
                //加载完成让当前的loading页消失
                if (n/len >= 0.9) {
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
            }, 1000)
            setTimeout(() => {
                $innerLi.show()
            }, 3000)
            setTimeout(() => {
                $innerDec.show();
                $innerSec.show()
            }, 5000)
        }
    }
})()
$oneBox.on('click', function () {
    twoBoxRender.init();
})
//第三页
let threeBoxRender = (function () {

    return {
        init: function () {

        }
    }
})()
$twoBox.on('click', function () {
    threeBoxRender.init();
})