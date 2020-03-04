<template>
  <div class="item" @click="clickFn">
    <strong class="note">身份认证</strong>
    <p class="status-bar" :class="classMap">
      <span class="status-text">{{statusText}}</span>
      <i class="icon-youjiantou iconfont right-arrow"></i>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'index',
    props: {
      info: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    computed: {
      statusText() {
        const stateArr = ['请选择', '提交成功', '验证成功', '验证失败']
        return stateArr[this.info.state]
      },
      classMap () {
        const classArr = ['', 'green', 'green', 'red']
        return classArr[this.info.state]
      }
    },
    methods: {
      clickFn() {
        this.$router.push({
          name: 'identityAuthentication'
        })
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
      &.green{
        color: limegreen;
      }
      &.red{
        color: red;
      }
      .right-arrow {
        align-self: center;
        padding-top: 4px;
      }
    }
  }
</style>
