<template>
  <div class="item" @click="clickFn">
    <strong class="note">{{noteText}}</strong>
    <p class="status-bar" :class="cname">
      <span class="status-text">{{statusText}}</span>
      <i class="icon-youjiantou iconfont right-arrow"></i>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'index',
    props: {
      noteText: {
        type: String,
        default() {
          return ''
        }
      },
      statusText: {
        type: String,
        default() {
          return '请选择'
        }
      },
      cname: {
        type: String,
        default() {
          return ''
        }
      }
    },
    methods: {
      clickFn() {
        this.$emit('clickFn')
      }
    }
  }
</script>

<style scoped lang="scss">
  .item {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    align-items: center;
    line-height: 2;
    border-bottom: 1px solid #eee;

    .note {
      font-size: 28px;
      color: #666;
      line-height: 2;
      font-weight: normal;
    }

    .status-bar {
      color: #999;
      .right-arrow {
        align-self: center;
        padding-top: 4px;
      }
    }
  }
</style>
