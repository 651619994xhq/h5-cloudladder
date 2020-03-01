<template>
  <div class="page-wrapper">
    <NavHeader title="签约失败"/>
    <div class="loan-fail">
      <img src="@image/contract-fail.png" alt="" class="loan-fail-img">
      <p class="loan-fail-title">签约结果</p>
      <p class="loan-fail-hint">抱歉本次签约未成功，已为您推荐新的借款平台可继续前往申请</p>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/common/components/navHeader/index'

export default {
  name: 'auditFail',
  components: {
    NavHeader
  }
}
</script>

<style scoped lang="scss">
  .loan-fail {
    overflow: hidden;

    .loan-fail-img {
      width: 260px;
      height: 220px;
      display: block;
      margin: 76px auto 0 auto;

    }

    .loan-fail-title {
      margin-top: 30px;
      line-height: 33px;
      font-size: 32px;
      text-align: center;
      color: $color-3;
    }

    .loan-fail-hint {
      margin-top: 40px;
      padding: 0 54px 0 54px;
      text-align: center;
      color: $color-6;
      font-size: 28px;
      line-height: 38px;
    }
  }
</style>
