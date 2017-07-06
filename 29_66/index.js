window.onload = function() {
    buildSidebar();
    buildTable();
    scrollPage();
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
    JSON.parse(JSON.stringify(data))

    var sideList = document.getElementById('sidebar-list');
    // 生成一级导航内容
    for (var i = 0; i < data.length; i++) {
        var node = document.createElement('li');
        node.innerHTML = data[i].title + '<ul class="level-2 level-2-hide" data-index="' + i + '">' + '</ul>';
        node.className = 'sidebar-item';
        sideList.appendChild(node);
    }
    // 生成二级导航内容
    for (var t = 0; t < data.length; t++) {
        var ulElement = document.getElementsByClassName('level-2')[t];
        var index = ulElement.getAttribute('data-index');

        for (var j = 0; j < data[index].children.length; j++) {
            var secondLi = document.createElement('li');
            secondLi.innerText = data[index].children[j].title;
            secondLi.className = 'level-2-itm';
            ulElement.appendChild(secondLi);
        }
    }



    // 点击一级导航，展开二级，再点击时收起,并计算sidebar展开收起时的高度
    sideList.addEventListener('click', function() {
        showMore();
        setTotalHeight();
    }, false);

    function showMore(e) {
        var e = e || window.event;
        var eTarget = e.target || e.srcElement;
        var ul = eTarget.getElementsByClassName('level-2')[0];

        if (!ul) return;
        if (hasClass(ul, 'level-2-hide')) {
            ul.className = 'level-2';
        } else {
            ul.className = 'level-2 level-2-hide';
        }
    }

    // 当二级菜单展开和收起时，重新计算sidebar高度
    function setTotalHeight() {
        var ulHeight = parseInt(window.getComputedStyle(sideList).height, 10);
        var innerSidebar = document.getElementById('sidebar-inner');
        var outerSidebar = document.getElementById('sidebar-outer');

        var windowHeight = window.innerHeight;
        var sideTop = outerSidebar.getBoundingClientRect().top;
        var sideHeight = windowHeight - sideTop;

        if (ulHeight >= sideHeight) {
            outerSidebar.style.height = sideHeight + 'px';
            innerSidebar.style.height = sideHeight + 'px';
        } else {
            outerSidebar.style.height = ulHeight + 'px';
            innerSidebar.style.height = ulHeight + 'px';
        }
    }

}

function buildTable() {
    // 获取table中的数据
    var tableValue = document.getElementById('table-value');
    for (var n = 0; n < tableData.length; n++) {
        var trNode = document.createElement('tr');
        trNode.className = 'table-row';
        tableValue.appendChild(trNode);
        for (var m = 0; m < 4; m++) {
            var tdNode = document.createElement('td');
            if (m === 0) {
                tdNode.innerText = tableData[n].name;
            } else if (m === 1) {
                tdNode.innerText = tableData[n].content;
            } else if (m === 2) {
                tdNode.innerText = tableData[n].value;
            } else {
                tdNode.innerHTML = '<button class="btn editBtn">编辑</button><button class="btn delBtn">删除</button>'
            }
            trNode.appendChild(tdNode);
        }
    }
    // 设置遮罩高度
    var maskHeight = document.body.scrollHeight;
    var mask = document.getElementById('mask');
    mask.style.height = maskHeight + 'px';

    // 给编辑btn加点击事件
    var aEditBtn = Array.from(document.getElementsByClassName('editBtn'));
    for (var k = 0; k < aEditBtn.length; k++) {
        aEditBtn[k].addEventListener('click', popEdit, false);
    }

    function popEdit(e) {
        mask.className = 'maskShow';

        // 使得遮罩下面页面不滚动
        var body = document.getElementsByTagName('body')[0];
        if (mask) {
            body.style.overflow = 'hidden';
        }



        // 弹出编辑框
        var editWindow = document.getElementById('editWindow');
        editWindow.style.display = 'flex';

        // 编辑框的placeholder
        var e = e || window.event;
        var eTarget = e.target || e.srcElement;
        var editName = document.getElementById('edit-name');
        var editContent = document.getElementById('edit-content');
        var editValue = document.getElementById('edit-value');

        var trNode = eTarget.parentNode.parentNode;
        editName.placeholder = trNode.childNodes[0].innerText;
        editContent.placeholder = trNode.childNodes[1].innerText;
        editValue.placeholder = trNode.childNodes[2].innerText;

        // 按下编辑框的确认按钮
        var editConfirm = Array.from(document.getElementsByClassName('edit-confirm'));
        for (var v = 0; v < editConfirm.length; v++) {
            editConfirm[v].onclick = function() {
                // 点击确认按钮时，改变表格中的值
                trNode.childNodes[0].innerText = editName.value;
                trNode.childNodes[1].innerText = editContent.value;
                trNode.childNodes[2].innerText = editValue.value;
                // 收起弹框和遮罩
                editWindow.style.display = 'none';
                mask.className = 'maskHide';
                body.style.overflow = 'auto';
            }
        }
        // 按下编辑框的取消按钮
        var cancel = Array.from(document.getElementsByClassName('cancel'));
        for (var c = 0; c < cancel.length; c++) {
            cancel[c].onclick = function() {
                // 收起弹框和遮罩
                editWindow.style.display = 'none';
                mask.className = 'maskHide';
                body.style.overflow = 'auto';
            }
        }
    }


    // 给删除btn加点击事件
    var aDeleteBtn = Array.from(document.getElementsByClassName('delBtn'));
    for (var s = 0; s < aDeleteBtn.length; s++) {
        aDeleteBtn[s].addEventListener('click', popDel, false);
    }

    function popDel(e) {
        mask.className = 'maskShow';

        // 使得遮罩下面页面不滚动
        var body = document.getElementsByTagName('body')[0];
        if (mask) {
            body.style.overflow = 'hidden';
        }

        // 弹出删除框
        var delWindow = document.getElementById('deleteWindow');
        delWindow.style.display = 'flex';

        // 删除框的删除内容del-fill
        var e = e || window.event;
        var eTarget = e.target || e.srcElement;
        var delFill = document.getElementById('del-fill');

        var trNode = eTarget.parentNode.parentNode;
        delFill.innerText = trNode.childNodes[0].innerText;

        // 按下确认删除按钮
        var delConfirm = Array.from(document.getElementsByClassName('del-confirm'));
        for (var v = 0; v < delConfirm.length; v++) {
            delConfirm[v].onclick = function() {
                // 点击确认按钮时，删除该行
                trNode.parentNode.removeChild(trNode);
                // 收起弹框和遮罩
                delWindow.style.display = 'none';
                mask.className = 'maskHide';
                body.style.overflow = 'auto';
            }
        }
        // 按下编辑框的取消按钮
        var cancel = Array.from(document.getElementsByClassName('cancel'));
        for (var c = 0; c < cancel.length; c++) {
            cancel[c].onclick = function() {
                // 收起弹框和遮罩
                delWindow.style.display = 'none';
                mask.className = 'maskHide';
                body.style.overflow = 'auto';
            }
        }



    }

}



function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
