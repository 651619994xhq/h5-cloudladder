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
      <item-check noteText="银行卡验证"
                  @clickFn="showBankPopup"
                  :statusText="statusComputed[componentsInfo01.state]"/>
      <item-check noteText="身份信息验证"
                  @clickFn="authApply"
                  :statusText="statusComputed[componentsInfo02.state]"/>
      <item-check noteText="申请验证"
                  @clickFn="showBankPopup"
                  :statusText="statusComputed[componentsInfo03.state]"/>
    </div>

    <!--login dialog 组件-->
    <private-dialog
      :isShow="loginDialogInfo.isShow"
      :mobile="loginDialogInfo.mobile"
      :componentCode="loginDialogInfo.componentCode"
      @closeEvent="closeLoginDialog"
    />
    <!--msg check dialog 组件-->
    <private-dialog :isShow="msgCheckInfo.isShow"/>
    <!--选择银行卡-->
    <select-my-bank
      :isShow="myBank.isShow"
      :bankList="myBank.bankList"
      @bankSelectFn="bankSelectFn"
      @bankAddFn="bankAddFn"
      @bankCancelFn="bankCancelFn"/>
  </div>
</template>
<script>
  // 请求APP-订单流程-查询 接口
  import NavHeader from '@/common/components/navHeader/index'
  import {SelectMyBank, ItemCheck, PrivateDialog} from './components'
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
  const statusTextMap = {
    '0': '请选择',
    '1': '审核中',
    '2': '审核成功',
    '3': '审核失败'
  }
  export default {
    name: 'loanApplication',
    components: {
      NavHeader,
      PrivateDialog,
      SelectMyBank,
      ItemCheck
    },
    data() {
      return {
        componentsInfo00: {},
        componentsInfo01: {},
        componentsInfo02: {},
        componentsInfo03: {},
        productInfo: {
          name: ''
        },
        loginDialogInfo: {
          isShow: false,
          mobile: ''
        },
        msgCheckInfo: {
          isShow: false
        },
        bankInfo: {
          isShow: true,
          columns: ['工商银行']
        },
        myBank: {
          isShow: false,
          bankList: []
        }
      }
    },
    methods: {
      statusComputed(status) {
        return statusTextMap[status]
      },
      // 显示银行的dialog
      showBankPopup() {
        this.myBank.isShow = true
      },

      // 选择银行
      bankSelectFn() {
        console.log(123)
      },
      // 添加银行
      bankAddFn() {
        this.myBank.isShow = false
        setTimeout(() => {
          this.$router.push({
            name: 'addBankCard',
            query: {
              orderNo: this.componentsInfo01.orderNo
            }
          })
        }, 500)
        console.log('新增')
      },
      // 身份证验证
      authApply() {
        this.$router.push({
          name: 'identityAuthentication'
        })
      },
      // 银行取消
      bankCancelFn() {
        this.myBank.isShow = false
      },

      /***
       * login
       */
      closeLoginDialog() {
        this.loginDialogInfo.isShow = false
      },


      // 显示短信验证的dialog
      showMsgDialog() {
        this.msgCheckInfo.isShow = true
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
      // 判断是否登录
      checkIsLogin(state) {
        this.loginDialogInfo.isShow = state === 0 || state === 3
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
        this.componentsInfo00 = data[0]
        this.componentsInfo01 = data[1]
        this.componentsInfo02 = data[2]
        this.componentsInfo03 = data[3]
        this.loginDialogInfo.mobile = parseString(JSON.parse(data[0].componentValue)).mobile
        this.loginDialogInfo.componentCode = data[0].componentCode


        console.log(this.loginDialogInfo.mobile)
        console.log('hahhahahhahahhah烦烦烦', parseString(JSON.parse(data[0].componentValue)))



        this.checkIsLogin(data[0].state)


        this.getOrderBankCardFn(data[1].orderNo)
      },
      // 获取用户绑定银行卡
      async getOrderBankCardFn(orderNo) {
        this.$loading({message: '请求中'})
        let [err, data] = await getOrderBankCard({orderNo: orderNo})
        if (err !== null) {
          this.$clear()
          this.$toast(err || '系统错误')
          return false
        }
        // 清除loading
        this.$clear()
        this.myBank.bankList = data
        console.log('获取用户绑定银行卡', data)
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
