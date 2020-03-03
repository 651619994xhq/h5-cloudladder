<template>
  <div class="content">
    <div class="item" @click="clickFn">
      <strong class="note">银行卡</strong>
      <p class="status-bar">
        <span class="status-text">{{statusText}}</span>
        <i class="icon-youjiantou iconfont right-arrow"></i>
      </p>
    </div>
    <!--银行卡dialog-->
    <select-my-bank
      :isShow="isShow"
      :bankList="bankList"
      @bankCancelFn="bankCancelFn"
      @bankSelectFn="bankSelectFn"
      @bankAddFn="bankAddFn"
    />
  </div>
</template>

<script>
import SelectMyBank from '../selectMyBank'
import {getOrderBankCard} from '@utils/service'

export default {
  name: 'index',
  data() {
    return {
      isShow: false,
      bankList: []
    }
  },
  computed: {
    statusText() {
      const stateArr = ['请选择', '提交成功', '验证成功', '验证失败']
      return stateArr[this.info.state]
    }
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    SelectMyBank
  },
  methods: {
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
      this.bankList = data
      console.log('获取用户绑定银行卡', data)
    },
    // 显示bankPoupp
    clickFn() {
      this.isShow = true
    },
    // bankPopup取消
    bankCancelFn() {
      this.isShow = false
    },
    // bankSelectFn选择银行卡
    bankSelectFn(index) {
      this.isShow = false
      setTimeout(() => {
        this.$router.push({
          name: 'addBankCard',
          query: {
            orderNo: this.info.orderNo,
            bankCode: this.bankList[index].bankCode,
            bankName: this.bankList[index].bankName
          }
        })
      }, 300)
    },
    bankAddFn() {
      this.isShow = false
      setTimeout(() => {
        this.$router.push({
          name: 'addBankCard',
          query: {
            orderNo: this.info.orderNo
          }
        })
      }, 300)
    }
  },
  mounted() {
    this.getOrderBankCardFn(this.info.orderNo)
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
      .right-arrow {
        align-self: center;
        padding-top: 4px;
      }
    }
  }
</style>
