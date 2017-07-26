import './style.less';
import './data.js';

let oneThing = null;
let content = null;
let priority = null;
let progress = null;
let editFrame = null;

let addBtn = null;
let cancelBtn = null;
let doneBtn = null;
const data = JSON.parse(localStorage.getItem('listData'));

window.onload = function () {
    let oneThingBtn = document.getElementById('one-thing-btn');
    let allBtn = document.getElementById('all-btn');

    addBtn = document.getElementsByClassName('home')[0];
    cancelBtn = document.getElementsByClassName('cancel-btn')[0];
    doneBtn = document.getElementsByClassName('done-btn')[0];

    editFrame = document.getElementById('edit-frame');
    content = document.getElementById('content');
    oneThing = document.getElementsByClassName('one-thing')[0];
    priority = document.getElementsByClassName('priority')[0];
    progress = document.getElementsByClassName('progress')[0];

    oneThingBtn.addEventListener('touchstart', showOneThing, false);
    allBtn.addEventListener('touchstart', showAll, false);
    addBtn.addEventListener('touchstart', showEdit, false);
    showContent();
    eventHandler();
};

function showOneThing(evt) {
    evt.preventDefault();

    addBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'none';
    doneBtn.style.display = 'none';

    content.style.display = 'none';
    priority.style.display = 'none';
    progress.style.display = 'none';

    oneThing.style.display = 'block';
    editFrame.style.display = 'none';

    for (const {priority, progress, content} of data) {
        if (priority === 'first-priority' && progress === 'doing') {
            const tmpHtml = `
                    <div class="list">
                        <div class="doing first-priority"></div>
                        <p>${content}</p>
                    </div>
                `;
            oneThing.innerHTML += tmpHtml;
            return;
        }
    }
}

function showAll(evt) {
    evt.preventDefault();

    addBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'none';
    doneBtn.style.display = 'none';

    content.style.display = 'block';
    priority.style.display = 'flex';
    progress.style.display = 'flex';

    oneThing.style.display = 'none';
    editFrame.style.display = 'none';
}

function showEdit(evt) {
    evt.preventDefault();
    priority.style.display = 'flex';
    progress.style.display = 'flex';

    addBtn.style.display = 'none';
    cancelBtn.style.display = 'inline-block';
    doneBtn.style.display = 'inline-block';

    content.style.display = 'none';
    editFrame.style.display = 'block';

    oneThing.style.display = 'none';

}

function showContent() {
    let node = '';
    for (let i = 0; i < data.length; i++) {
        node += `<div class="list">
                        <div class="${data[i].progress} ${data[i].priority}"></div>
                        <p>${data[i].content}</p>
                    </div>`;
    }
    content.innerHTML = node;
}

function eventHandler() {
    document.querySelectorAll('.sort').forEach(sortItem => {
        sortItem.addEventListener('touchstart', (ev) => {
            const target = ev.target || ev.srcElement;
            const parTarget = target.parentNode;
            if (parTarget.classList.contains('sort-button')) {
                const priority = parTarget.dataset.sort;
                document.querySelector('#content').querySelectorAll('.list').forEach(item => {
                    if (item.querySelector('div').classList.contains(priority)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                })
            }
        });
    })
}
