<template>
  <div class="page-wrapper">
    <nav-header title="提交成功"/>
    <div class="loan-success">
      <img src="@image/chenggong.png" alt="" class="loan-success-img">
      <p class="loan-success-title">提交成功</p>
      <p class="loan-success-hint">您的借款申请已成功，请稍后查看审核结果</p>
    </div>
  </div>
</template>
<script>
import NavHeader from '@/common/components/navHeader/index'
export default {
  name: 'index',
  components: {
    NavHeader
  }
}
</script>

<style scoped lang="scss">
  .loan-success{
    overflow: hidden;
    .loan-success-img{
      width: 145px;
      height: 183px;
      display: block;
      margin: 76px auto 0 auto;

    }
    .loan-success-title{
      margin-top: 30px;
      line-height: 33px;
      font-size: 32px;
      text-align: center;
      color: $color-3;

    }
    .loan-success-hint{
      margin-top: 40px;
      padding: 0 54px 0 54px;
      text-align: center;
      color: $color-6;
      font-size: 28px;
      line-height: 38px;
    }
  }
</style>
