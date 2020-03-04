<template>
  <div class="page-wrapper">
    <nav-header title="借款申请" :backApp="true"/>
    <div class="loan-channel">推荐产品：{{productInfo.name}}</div>
    <div class="loan-panel">
      <h5 class="loan-panel-title">预计最高可借金额</h5>
      <div class="loan-money">
        <span class="loan-yang">￥</span>
        <span>200000</span>
      </div>
    </div>
    <div class="title">补充资料以继续申请</div>
    <div class="components-content">
      <component
        :is="mapComponent(item.componentCode)"
        v-for="(item, index) in componentsList"
        :key="index"
        :info="item"
      />
    </div>
    <button class="submit-btn" @click="submitUserInfoFn">提交申请借款</button>
  </div>
</template>
<script>
  // 请求APP-订单流程-查询 接口
  import NavHeader from '@/common/components/navHeader/index'
  import {
    SelectMyBank,
    PrivateDialog,
    SmsLogin,
    IdCard,
    BankCard,
    SmsVerify
  } from './components'
  import {
    getProduct,
    getOrderProcess,
    getOrderBankCard,
    submitUserInfo
  } from '@utils/service'

  // 处理状态\n 0: 未提交; 1: 提交成功; 2: 验证成功; 3: 验证失败
  // 处理字符串


  export default {
    name: 'loanApplication',
    components: {
      NavHeader,
      PrivateDialog,
      SelectMyBank,
      SmsLogin,
      IdCard,
      BankCard,
      SmsVerify
    },
    data() {
      return {
        productInfo: {
          name: ''
        },
        componentsList: []
      }
    },
    methods: {
      mapComponent(componentCode) {
        const maps = {
          'sms_login': SmsLogin,
          'bankcard': BankCard,
          'idcard': IdCard,
          'sms_verify': SmsVerify
        }
        return maps[componentCode]
      },
      // 获取推荐产品的详情
      async getProductInfoFn() {
        this.$loading({message: '请求中'})
        let [err, data] = await getProduct({})
        if (err !== null) {
          this.$clear()
          this.$toast(err || '系统错误')
          return false
        }
        // 清除loading
        this.$clear()
        // TODO 这里处理正常逻辑
        console.log('data数据', data)
        this.productInfo.name = data.name
      },

      // 查询订单流程
      async getOrderProcessFn() {
        this.$loading({message: '请求中'})
        let [err, data] = await getOrderProcess({})
        if (err !== null) {
          this.$clear()
          this.$toast(err || '系统错误')
          return false
        }
        // 清除loading
        this.$clear()
        // TODO 这里处理正常逻辑
        console.log('查询订单流程', data)
        this.componentsList = data.sort(function (a, b) {
          return a.processSeq - b.processSeq
        });
      },
      // 提交借款申请
      async submitUserInfoFn() {
        const params = {
          orderNo: this.componentsList[0].orderNo
        }
        this.$loading({message: '请求中'})
        let [err, data] = await submitUserInfo(params)
        if (err !== null) {
          this.$clear()
          this.$toast(err || '系统错误')
          return false
        }
        // 清除loading
        this.$clear()
        // TODO 这里处理正常逻辑
        console.log('提交借款申请', data)

        if (data === 1) {
          this.$toast('提交成功')
        } else {
          this.$toast('提交失败')

        }
      }
    },
    created() {
      this.getProductInfoFn()
      this.getOrderProcessFn()
    }
  }
</script>
<style scoped lang="scss">
  .loan-channel {
    font-size: 24px;
    color: $color-9;
    width: 100%;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }

  .loan-panel {
    background-color: #fff;
    padding: 0px 30px;
    .t-right {
      text-align: right;
    }
    .loan-term {
      height: 71px;
      line-height: 71px;

      .ft24 {
        font-size: 24px;
      }

      .co-3 {
        color: #333;
      }
    }

    .loan-panel-title {
      font-size: 28px;
      font-weight: 500;
      color: #333;
      padding-top: 25px;
    }
    .loan-money {
      color: #0a81fb;
      font-size: 72px;
      font-weight: bold;
      margin-top: 36px;
      padding-bottom: 45px;
      .loan-yang {
        font-size: 36px;
        font-weight: bold;
      }
    }
  }

  .title {
    padding: 30px;
  }

  .components-content {
    background-color: #fff;
    border-top: 1px solid #eee;
    margin-bottom: 60px;
  }

  .submit-btn {

    height: 80px;
    background-color: #0A81FB;
    border: none;
    border-radius: 8px;
    color: #fff;
    width: 580px;
    display: block;
    margin: 0 auto;
    font-size: 26px;
  }
</style>
