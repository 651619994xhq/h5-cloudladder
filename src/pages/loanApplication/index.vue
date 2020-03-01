<template>
  <div>
    <nav-header title="借款申请" :backApp="true"/>
    <div class="loan-channel">
      推荐产品：永道小贷
    </div>
    <div class="loan-panel">
      <h5 class="loan-panel-title">预计最高可借金额</h5>
      <div class="loan-money">
        <span class="loan-yang">￥</span>
        <span>200000</span>
      </div>
    </div>
    <div class="title">补充资料以继续申请</div>
    <component :is="mapComponent"></component>
    <!--login dialog 组件-->
    <verification-dialog :isShow="loginDialogInfo.isShow"/>
    <!--msg check dialog 组件-->
    <verification-dialog :isShow="msgCheckInfo.isShow"/>
    <!--选择银行卡-->
    <SelectMyBnk
      :isShow="myBank.isShow"
      @bankSelectFn="bankSelectFn"
      @bankAddFn="bankAddFn"
      @bankCancelFn="bankCancelFn"
    />
  </div>
</template>
<script>
// 请求APP-订单流程-查询 接口
import NavHeader from '@/common/components/navHeader/index'
import SelectMyBnk from './components/selectMyBank/index'
import VerificationDialog from '@/components/verificationDialog'
import {NoSubmit, SubmitSuccess, CheckSuccess, CheckFailure} from './components'
// 处理状态\n 0: 未提交; 1: 提交成功; 2: 验证成功; 3: 验证失败
const mapsCom = {
  '0': 'NoSubmit',
  '1': 'SubmitSuccess',
  '2': 'CheckSuccess',
  '3': 'CheckFailure'
}
export default {
  name: 'loanApplication',
  components: {
    NavHeader,
    SelectMyBnk,
    VerificationDialog,
    NoSubmit,
    SubmitSuccess,
    CheckSuccess,
    CheckFailure
  },
  data () {
    return {
      loginDialogInfo: {
        isShow: false
      },
      msgCheckInfo: {
        isShow: false
      },
      bankInfo: {
        isShow: true,
        columns: ['工商银行']
      },

      myBank: {
        isShow: false
      }
    }
  },
  computed: {
    mapComponent () {
      return mapsCom[0]
    }
  },
  methods: {
    bankSelectFn () {
      console.log(123)
    },
    bankAddFn () {
      this.myBank.isShow = false
      setTimeout(() => {
        this.$router.push({
          name: 'addBankCard'
        })
      }, 500)
      console.log('新增')
    },
    bankCancelFn () {
      this.myBank.isShow = false
    }
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
  .title{
    padding: 30px;
  }
</style>
