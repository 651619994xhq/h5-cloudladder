<template>
  <div class="page-wrapper">
    <nav-header title="签约成功"/>
    <div class="spa-wrapper">
      <main class="content">
        <div class="flex flex-item flex-justify">
          <p>
            <img src="@image/hook.png" alt/>
          </p>
          <div class="pass">
            <p class="pass-title">恭喜 额度申请通过</p>
            <p class="pass-text">请继续操作体现</p>
          </div>
        </div>
        <div class="board">
          <p class="lab-text">可用额度</p>
          <h3 class="board-title">
            <sub class="prefix">&yen;</sub>
            5999
          </h3>
          <div class="button-wrapper">
            <button class="button" type="button" @click="handleClick">打开民生易贷app</button>
          </div>
          <p class="step-bar flex flex-item flex-justify">
            <span class="inner">提现步骤</span>
          </p>
          <p class="des-text">进入民生易贷app，以当前的手机号继续登录操作</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import NavHeader from '@/common/components/navHeader/index'
export default {
  name: 'index',
  components: {
    NavHeader
  },
  methods: {
    handleClick () {
    }
  }
}
</script>

<style scoped lang="scss">
  .content {
    padding-top: 36px;
    padding-left: 30px;
    right: 30px;
    box-sizing: border-box;

    .pass {
      margin-left: 20px;

      &-title {
        font-size: 32px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }

      &-text {
        margin-top: 10px;
        font-size: 24px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 38px;
      }
    }

    .board {
      margin-top: 50px;
      width: 580px;
      padding-bottom: 58px;
      /*height:520px;*/
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 3px 12px 0px rgba(133, 133, 133, 0.11);
      border-radius: 16px;
      overflow: hidden;

      .lab-text {
        margin-top: 58px;
        text-align: center;
        font-size: 28px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
      }

      &-title {
        text-align: center;
        margin-top: 40px;
        font-size: 72px;
        font-family: PingFang-SC-Heavy;
        font-weight: bold;
        color: rgba(10, 129, 251, 1);

        .prefix {
          vertical-align: baseline;
          margin-right: 0.5em;
          font-size: 36px;
          font-family: PingFang-SC-Heavy;
          font-weight: 800;
          color: rgba(10, 129, 251, 1);
        }
      }

      .step-bar {
        margin-top: 64px;

        &:after,
        &:before {
          content: "";
          display: block;
          width: 80px;
          height: 1px;
          background: rgba(125, 125, 125, 1);
        }

        .inner {
          margin-left: 20px;
          margin-right: 20px;
          font-size: 26px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
      }

      .des-text {
        text-align: center;
        margin-top: 35px;
        font-size: 24px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
    }
  }

  .button-wrapper {
    text-align: center;
    margin-top: 52px;

    .button {
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      background-image: none;
      border: 1px solid transparent;
      width: 480px;
      line-height: 80px;
      height: 80px;
      background: rgba(10, 129, 251, 1);
      border-radius: 40px;
      font-size: 32px;
      font-family: PingFang-SC-Medium;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);

      &:focus {
        outline: none;
      }
    }
  }
</style>
