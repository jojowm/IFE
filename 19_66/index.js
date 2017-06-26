window.onload = function() {
    carousel();
    tabSwitch()


}


// 轮播图 淡入淡出
function carousel () {
    var aImg = document.getElementsByClassName('banner-2-pic')[0].getElementsByTagName('img');
    var index = 0;

    setInterval(turnImg, 2000);

    function fadeIn (e) {
        e.className = "bg fadeIn";
    }

    function fadeOut (e) {
        e.className = "bg";
    }

    function turnImg () {
        if (index == aImg.length - 1) {
            fadeOut(aImg[index]);
            index = 0;
            fadeIn(aImg[index]);
        } else {
            fadeOut(aImg[index]);
            index++;
            fadeIn(aImg[index]);
        }
    }
}

// tab切换
function tabSwitch () {
    var oTab = document.getElementsByClassName('tab')[0];
    var aTabItm = document.getElementsByClassName('tab-itm');
    var aTabContent = document.getElementsByClassName('tab-content');

    oTab.addEventListener('click', switchContent, false);

    function switchContent (e) {
        Array.from(aTabItm).forEach(function(element) {
            element.className = 'tab-itm';
        });
        Array.from(aTabContent).forEach(function(element) {
            element.className = 'tab-content';
        });

        e = e || window.event;
        var targetElement = e.target || e.srcElement;
        targetElement.className = 'tab-itm active';


        var index = targetElement.getAttribute('data-index');
        var targetContent = document.getElementById('tab-content-' + index);
        targetContent.className = 'tab-content active';
    }
}
