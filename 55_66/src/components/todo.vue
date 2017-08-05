<template>
  <div id="home-page">
    <!-- 标题栏 -->
    <div class="title-add">
      <button class="edit cancel-btn">
        Cancel
      </button>
      <p>Title</p>
      <button class="home">Add</button>
      <button class="edit done-btn">Done</button>
    </div>

    <!-- 优先级栏 -->
    <div class="priority sort" v-show="active">
        <div class="priority-itm sort-button" data-sort="first-priority">
            <div class="round first-priority"></div>
            <span>高优</span>
        </div>
        <div class="priority-itm sort-button" data-sort="second-priority">
            <div class="round second-priority"></div>
            <span>中优</span>
        </div>
        <div class="priority-itm sort-button" data-sort="third-priority">
            <div class="round third-priority"></div>
            <span>低优</span>
        </div>
    </div>
    <!-- 进度栏 -->
    <div class="progress sort" v-show="active">
        <div class="progress-itm sort-button" data-sort="doing">
            <div class="doing"></div>
            <span>进行中</span>
        </div>
        <div class="progress-itm sort-button" data-sort="to-do">
            <div class="to-do"></div>
            <span>待办</span>
        </div>
        <div class="progress-itm sort-button" data-sort="done">
            <div class="done"></div>
            <span>已完成</span>
        </div>
    </div>

    <!-- one thing -->
    <div class="one-thing" v-show="!active">
        <p>Now!The One Thing is</p>
    </div>

    <!-- 具体事项 -->
    <div id="content">
      <item :option="item" v-for="(item, index) in renderData" :key="index"></item>
    </div>

    <!-- edit frame -->
    <div id="edit-frame">
        <div class="list">
            <textarea rows="10"></textarea>
        </div>
    </div>
    <footer>
      <div>
        <p id="one-thing-btn" @click="showOneThing">OneThing</p>
      </div>
      <div>
        <p id="all-btn" @click="showAll">All</p>
      </div>
    </footer>
  </div>
</template>

<script>
  import Item from './item'
  import '@/assets/style.less'
  import '@/assets/data'
  export default {
    name: 'todo',
    data () {
      return {
        originalDataArr: JSON.parse(localStorage.getItem('listData')),
        renderData: [],
        active: true
      }
    },
    created () {
      this.showAll()
    },
    methods: {
      showAll () {
        this.active = true
        this.renderData = this.originalDataArr
      },
      showOneThing () {
        this.active = false
	      for (const {priority, progress, content} of this.originalDataArr) {
         if (priority === 'first-priority' && progress === 'doing') {
           const tmpObj = {
             priority,
             progress,
             content
           }
           this.renderData = [tmpObj]
         }
        }
      }
    },
    // 注册组件
    components: {
      Item
    }
  }
</script>

