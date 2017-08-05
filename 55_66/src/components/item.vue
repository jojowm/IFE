<template>
  <div class="list">
    <div
      :class="[option.progress, option.priority]"
    ></div>
    <p>{{ option.content }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Item',
    props: {
      option: Object
    }
  }
</script>
