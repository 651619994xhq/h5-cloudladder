<template>
  <ul class="content">
    <li class="item">
      <strong class="note">银行卡验证</strong>
      <p class="status-bar" @click="selectBankFn">
        <span class="status-text">请选择</span>
        <i class="icon-youjiantou iconfont right-arrow"></i>
      </p>
    </li>
    <li class="item">
      <strong class="note">身份信息验证</strong>
      <p class="status-bar" @click="authApply">
        <span class="status-text">请选择</span>
        <i class="icon-youjiantou iconfont right-arrow"></i>
      </p>
    </li>
    <li class="item">
      <strong class="note">申请验证</strong>
      <p class="status-bar">
        <span class="status-text">请选择</span>
        <i class="icon-youjiantou iconfont right-arrow"></i>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'index',
  methods: {
    selectBankFn() {
      console.log(this.$parent)
      this.$parent.myBank.isShow = true
    },
    authApply() {
      this.$router.push({
        name: 'identityAuthentication'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .content {
    background-color: #fff;
    border-top: 1px solid #eee;

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
  }
</style>
