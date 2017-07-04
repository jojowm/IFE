window.onload = function() {
    setHeight();
    scrollPage();
    buildSidebar();
}

// 设定sidebar的高度
function setHeight() {
    var outerSidebar = document.getElementById('sidebar-outer');
    var innerSidebar = document.getElementById('sidebar-inner');
    var windowHeight = window.innerHeight;
    var sideTop = outerSidebar.offsetTop;
    var sideHeight = windowHeight - sideTop;

    outerSidebar.style.height = sideHeight + 'px';
    innerSidebar.style.height = sideHeight + 'px';
}


function scrollPage() {
    var thead = document.getElementById('table-head');
    var atd = document.getElementsByClassName('table-row')[0].getElementsByTagName('td');
    var ath = document.getElementsByClassName('head-row')[0].getElementsByTagName('th');

    document.addEventListener('scroll', function() {
        fixThead();
        resetHerght()
    }, false);

    // 页面滚动时，固定thead
    function fixThead() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 350) {
            thead.className = 'fix-head';
            var tdArray = Array.from(atd);
            var thArray = Array.from(ath);

            for (var i = 0; i < tdArray.length; i++) {
                thArray[i].style.width = window.getComputedStyle(tdArray[i]).width
                tdArray[i].style.width = thArray[i].style.width + 'px';
            }
            thead.style.width = '726px';
        } else {
            thead.className = '';
        }
    }
    // 页面滚动时，计算sidebar在视口中的高度
    function resetHerght() {
        var outerSidebar = document.getElementById('sidebar-outer');
        var innerSidebar = document.getElementById('sidebar-inner');
        var sidebarList = document.getElementById('sidebar-list');

        var windowHeight = window.innerHeight;
        var sideTop = outerSidebar.getBoundingClientRect().top;

        var sideHeight = windowHeight - sideTop;
        var ulHeight = parseInt(window.getComputedStyle(sidebarList).height, 10);

        if (ulHeight >= sideHeight) {
            outerSidebar.style.height = sideHeight + 'px';
            innerSidebar.style.height = sideHeight + 'px';
        } else {
            outerSidebar.style.height = ulHeight + 'px';
            innerSidebar.style.height = ulHeight + 'px';
        }

    }

}

// 给ul添加一级导航的li标签及内容
function buildSidebar() {
    // 点击一级导航，展开二级，再点击时收起
    var sideList = document.getElementById('sidebar-list');
    sideList.addEventListener('click', showMore, false);

    function showMore(e) {
        var e = e || window.event;
        var eTarget = e.target || e.srcElement;
        var ul = eTarget.getElementsByClassName('level-2')[0];
        if (hasClass(ul, 'level-2-hide')) {
            ul.className = 'level-2';
        } else {
            ul.className = 'level-2 level-2-hide';
        }
    }

}


function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
