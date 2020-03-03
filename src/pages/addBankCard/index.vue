<template>
  <div class="page-wrapper">
    <nav-header title="添加银行卡" :backApp="true"/>
    <div class="page-content">
      <ul class="input-panel">
        <li class="item">
          <span class="note">支持银行卡</span>
          <span class="add-btn" v-if="!$route.query.bankName" @click="showPickerFn">{{bankInfo.bankName}}</span>
          <span class="add-btn" v-if="$route.query.bankName">{{$route.query.bankName}}</span>
        </li>
        <li class="input-item-list">
          <span class="note">银行卡号</span>
          <div class="input-bar">
            <input placeholder="请输入银行卡号" type="input" maxlength="20" class="input" v-model="bankInfo.bankcardNo"/>
          </div>
        </li>
        <li class="input-item-list">
          <span class="note">预留手机号</span>
          <div class="input-bar">
            <input placeholder="请输入预留手机号" type="input" maxlength="11" class="input" v-model="bankInfo.mobile"/>
          </div>
        </li>
      </ul>
      <button class="confirm-btn" @click="submit">确定</button>
    </div>
    <bank-picker
      :isShow="bankInfo.isShowPicker"
      :columns="bankInfo.columnsBankList"
      @onConfirm="onConfirm"
      @onCancel="onCancel"
    />
  </div>
</template>
<script>
  import NavHeader from '@/common/components/navHeader/index'
  import BankPicker from '@/components/bankPicker/index'
  import {getOrderBankList, addBankCard} from '@utils/service'

  export default {
    name: 'index',
    data() {
      return {
        bankInfo: {
          bankName: '请选择',
          bankcardNo: '',
          bankCode: '',
          mobile: '',
          columnsBankList: [],
          bankList: [],
          isShowPicker: false
        }
      }
    },
    components: {
      NavHeader,
      BankPicker
    },
    methods: {
      async getOrderBankCardFn(orderNo) {
        this.$loading({message: '请求中'})
        let [err, data] = await getOrderBankList({orderNo: orderNo})
        if (err !== null) {
          this.$clear()
          this.$toast(err || '系统错误')
          return false
        }
        // 清除loading
        this.$clear()
        this.bankInfo.bankList = data
        data.forEach((item, index) => {
          this.bankInfo.columnsBankList.push(item.bankName)
        })
        console.log('获取用户绑定银行卡', data)
      },
      showPickerFn() {
        this.bankInfo.isShowPicker = true
      },
      // 点击确定
      onConfirm(index) {
        this.bankInfo.bankName = this.bankInfo.bankList[index].bankName
        this.bankInfo.bankCode = this.bankInfo.bankList[index].bankCode
        this.bankInfo.isShowPicker = false
        console.log('value:', this.bankInfo.bankList[index])
      },
      // 点击取消
      onCancel() {
        this.bankInfo.isShowPicker = false
      },
      // 点击提交
      async submit(orderNo) {
        var jsonParams = {
          bankcardNo: this.bankInfo.bankcardNo,
          mobile: this.bankInfo.mobile,
          bankCode: this.$route.query.bankCode || this.bankInfo.bankCode
        }
        jsonParams = JSON.stringify(jsonParams)
        const params = {
          componentCode: 'bankcard',
          orderNo: this.$route.query.orderNo,
          jsonParams
        }
        this.$loading({message: '请求中'})
        let [err, data] = await addBankCard(params)
        if (err !== null) {
          this.$clear()
          this.$toast(err || '系统错误')
          return false
        }
        // 清除loading
        this.$clear()
        console.log('获取用户绑定银行卡', data)
      }
    },
    created() {
      this.getOrderBankCardFn(this.$route.query.orderNo)
    }
  }
</script>
<style scoped lang="scss">
  .page-wrapper {
    .page-content {
      padding-top: 20px;
      .input-panel {
        background-color: #fff;
        margin-bottom: 60px;
        .item {
          padding: 30px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #eee;
          align-items: center;
          .note {
            color: #333333;
            font-size: 26px;
            line-height: 2;
            width: 140px;
          }
          .add-btn {
            line-height: 2;
            color: #999;
          }
        }
        .input-item-list {
          display: flex;
          padding: 30px;
          border-bottom: 1px solid #eee;
          align-items: center;
          .note {
            color: #333333;
            font-size: 26px;
            line-height: 2;
            margin-right: 20px;
            width: 140px;
          }
          .input-bar {
            flex: 1;
            .input {
              display: block;
              width: 100%;
              box-sizing: border-box;
              padding: 5px;
              height: 50px;
              color: #666;
            }
          }
        }
      }
      .confirm-btn {
        display: block;
        background-color: #0A81FB;
        border: none;
        width: 600px;
        margin: 0 auto;
        height: 88px;
        color: #fff;
        font-size: 28px;
        border-radius: 8px;
      }
    }
  }
</style>
