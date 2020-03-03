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
      ></component>


    </div>
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
    getOrderBankCard
  } from '@utils/service'

  // 处理状态\n 0: 未提交; 1: 提交成功; 2: 验证成功; 3: 验证失败
  // 处理字符串
  function parseString(str) {
    var str01 = str.replace('{', '')
    str01 = str01.replace('}', '')
    var arr = str01.split(',')
    var obj = {}
    arr.forEach((item, index) => {
      var shortArr = item.split(':')
      var key = shortArr[0].replace("'", '').replace("'", '')
      var value = shortArr[1].replace("'", '').replace("'", '').trim()
      obj[key] = value
    })
    return obj
  }

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
        this.componentsList = data
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
  }
</style>
