<template>
  <div class="queuing-container">
    <NavHeader :title="NavHeader.title" :backApp="true"></NavHeader>
    <div class="loan-channel">{{productName}}</div>
    <div class="main">
      <div class="gif-container">
        <img src="@image/wait.gif" alt="">
      </div>
      <p class="title1">实时审核排队中</p>
      <div class="row flex-item flex-justify wait">
        <div class="people row">还有<span style="color: #0A81FB;vertical-align: middle">3</span></div>
        <div class="hairline"></div>
        <div class="time">预计5分钟</div>
      </div>
      <div class="apply-btn">
        进入申请流程
      </div>
    </div>
    <div class="warm-prompt">
      <p class="warm-title1 warm-title">温馨提示:</p>
      <p class="warm-title2 warm-title">实时审核需进行排队</p>
      <p class="warm-title3 warm-title">进入申请流程后请及时填写信息以免资格失效</p>
    </div>
  </div>
</template>

<script>
    import NavHeader from '@/common/components/navHeader/index'  //导入公共的title
    export default {
        name: "queuing",
        data() {
            return {
                NavHeader : {
                    title: '借款申请'
                },
                productName:'推荐至 助粒贷'
            }
        },
//组件
        components: {
            NavHeader,
        },
        methods: {
        }
    }
</script>

<style scoped lang="scss">
  .queuing-container{
    overflow: hidden;
    .loan-channel {
      font-size: 24px;
      color: $color-9;
      width: 100%;
      height: 78px;
      line-height: 78px;
      text-align: center;
    }
    .main{
      width: 100%;
      height: 570px;
      background: white;
      overflow: hidden;
      .gif-container{
        margin: 44px auto 0 auto;
        width: 240px;
        height: 240px;
        background: #999999;
        img{
          display: block;
          width: 100%;
          height: 100%;
          border: none;
        }
      }
      .title1{
        margin-top: 20px;
        text-align: center;
        font-family: PingFang-SC-Heavy;
        font-size: 32px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
      }
      .wait{
        margin-top: 20px;
        .hairline{
          margin-left: 10px;
          margin-right: 10px;
          width: 1px;
          height: 20px;
          background: #999999;
        }
      }
      .apply-btn{
        margin: 40px auto 0 auto;
        width: 480px;
        height: 80px;
        background-color: #0a81fb;
        border-radius: 40px;
        text-align: center;
        line-height: 80px;
        color: #ffffff;
        font-family: PingFang-SC-Medium;
        font-size: 32px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
      }
    }

    .warm-prompt{
      margin-top: 30px;
      padding: 0 32px 0 32px;
      .warm-title{
        font-family: PingFang-SC-Medium;
        font-size: 22px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 38px;
        letter-spacing: 0px;
        color: #333333;
      }
    }

  }
</style>
