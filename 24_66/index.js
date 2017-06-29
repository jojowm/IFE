// var data = [
//     {
//         "country": "中国",
//         "cities": ["北京", "上海", "广州"]
//     },
//     {
//         "country": "美国",
//         "cities": ["洛杉矶", "纽约", "旧金山"]
//     },
//     {
//         "country": "英国",
//         "cities": ["伦敦", "利物浦", "曼彻斯特"]
//     }
// ];

window.onload = function() {
    carousel();
    tabSwitch();
    selectCountry()
    // menuDrop();
    // buildCountrySelect();
    // countrySelectClick();
}


// 轮播图 淡入淡出
function carousel() {
    var aImg = document.getElementsByClassName('banner-2-pic')[0].getElementsByTagName('img');
    var index = 0;

    setInterval(turnImg, 2000);

    function fadeIn(e) {
        e.className = "bg fadeIn";
    }

    function fadeOut(e) {
        e.className = "bg";
    }

    function turnImg() {
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
function tabSwitch() {
    var oTab = document.getElementsByClassName('tab')[0];
    var aTabItm = document.getElementsByClassName('tab-itm');
    var aTabContent = document.getElementsByClassName('tab-content');

    oTab.addEventListener('click', switchContent, false);

    function switchContent(e) {
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


// 下拉菜单联动
// function menuDrop () {
//     var aInput = document.getElementsByClassName('inputBtn');
//     var oMenu = document.getElementsByClassName('input-menu');
//     var aMenu= Array.from(oMenu);
//     var menuIndex;

//     Array.from(aInput).forEach(function(element) {
//         element.addEventListener('click', showMenu, false);
//     });

//     // 下拉菜单
//     function showMenu (e) {
//         e = e || window.event;
//         var targetElement = e.target || e.srcElement;
//         menuIndex = targetElement.getAttribute('data-input');
//         aMenu[menuIndex].style.display = 'block';
//     }

//     // 收起菜单
//     document.onclick = function (e) {
//         e = e || window.event;
//         var targetElement = e.target || e.srcElement;

//         if (!hasClass(targetElement.parentNode, 'dropBtn')) {
//             aMenu[0].style.display = 'none';
//             aMenu[1].style.display = 'none';
//         }

//     }
// }

// function buildCountrySelect () {
//     var countryMenu = document.getElementsByClassName('country-menu')[0];
//     for (var i = 0; i < data.length; i++) {
//         var countryLi = document.createElement('li');
//         countryLi.innerText = data[i].country;
//         countryLi.className = 'country-itm';
//         countryMenu.appendChild(countryLi);
//     }
// }

// function countrySelectClick () {
//     var countryMenu = document.getElementsByClassName('country-menu')[0];
//     countryMenu.addEventListener('click', buildCityMenu, false);
//     function buildCityMenu (e) {
//         // 1. 设置选中的国家
//         e = e || window.event;
//         var targetElement = e.target || e.srcElement;
//         var country = targetElement.innerText;
//         document.getElementById('countryInput').value = country;
//         document.getElementById('cityInput').value = '';
//         // 2. 根据选中的国家，设置此国的城市下拉框
//         var cities;
//         for (var i = 0; i < data.length; i++) {
//             var thisData = data[i];
//             if (thisData.country === country) {
//                 cities = thisData.cities;
//             }
//         }
//         var cityMenu = document.getElementsByClassName('city-menu')[0];
//         var cityNodes = document.getElementsByClassName('city-itm');
//         if (cityNodes.length > 0) {
//             for (var k = 0, l = cityNodes.length; k < l; k++) {
//                 cityMenu.removeChild(document.getElementsByClassName('city-itm')[0]);
//             }
//         }

//         for (var j = 0; j < cities.length; j++) {
//             var cityLi = document.createElement('li');
//             cityLi.innerText = cities[j];
//             cityLi.className = 'city-itm';
//             cityMenu.appendChild(cityLi);
//         }
//         cityMenu.addEventListener('click', setCityValue, false);
//         function setCityValue (e) {
//             e = e || window.event;
//             var targetElement = e.target || e.srcElement;
//             var city = targetElement.innerText;
//             document.getElementById('cityInput').value = city;
//         }
//     }
// }

// function hasClass (ele, cls) {
//     cls = cls || '';
//     if (cls.replace(/\s/g, '').length == 0) {
//         return false;
//     } else {
//         return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
//     }

// }

var dataSelect = [
    {'中国': ['北京', '上海', '广州']},
    {'美国': ['洛杉矶', '纽约', '旧金山']},
    {'英国': ['伦敦', '利物浦', '曼彻斯特']}
    ];

function selectCountry () {
    // 点击input 下拉国家菜单--选中国家--把国家放入input---收起国家菜单---下拉city菜单
    var countryInput = document.getElementById('country-input');
    var countryMenu = document.getElementById('country-menu');
    var cityMenu = document.getElementById('city-menu');

    // 点击国家input，弹出下拉框
    countryInput.onclick = function () {
        countryMenu.className = 'input-menu';
    }

    // 检测被点击的国家
    countryMenu.addEventListener('click', fillInput, false);

    function fillInput (e) {
         e = e || window.event;
         var targetElement = e.target || e.srcElement;
         // 填写选中的国家
         countryInput.value = targetElement.innerText;
         // 收起国家菜单
         countryMenu.className = 'input-hide';
         // 打开city菜单
         cityMenu.className =  'input-menu';

         for (var i = 0; i < dataSelect.length; i++) {
            // 对象的key引用
            if (targetElement.innerText === dataSelect[i]) {

            }
         }
     }


}