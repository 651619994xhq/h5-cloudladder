<template>
  <van-popup round="true" :style="{borderRadius:'10px'}" :value="isShow" @input="handleInput"
             :close-on-click-overlay="false" class="popup-box">
    <div class="verification-pop">
      <div class="close-btn flex flex-item flex-justify" @click="handleCloseEvent">
        <i class="icon-guanbi iconfont close-img"></i>
      </div>
      <div class="mobile-box row flex-justify-between flex-item">
        <div class="mobile-text">
          验证手机
        </div>
        <div class="mobile">
          <input type="input" v-model="$parent.mobile" placeholder="请输入手机号" readonly/>
        </div>
      </div>
      <div class="code-box row flex-justify-between flex-item">
        <div class="code-title">
          验证码
        </div>
        <input type="number" v-model="validCode" placeholder="请输入验证码">
        <div class="get-code-btn">
          <div class="code-btn" v-if="!isGetCode" @click="handleGetCodeEvent">
            获取验证码
          </div>
          <div class="dis-code" v-else>
            {{count}}s
          </div>
        </div>
      </div>
      <div class="submit-verification" @click="handleSubmitEvent">
        提交验证
      </div>
    </div>
  </van-popup>
</template>

<script>
  import {addBankCard} from '@utils/service'

  export default {
    name: 'index',
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      componentCode: {
        type: String,
        default() {
          return ''
        }
      },
      orderNo: {
        type: String,
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        isGetCode: false,
        count: 60,
        timer: null,
        validCode: ''
      }
    },
    destroyed() {
      this.clearTimer();
    },

    mounted(){
      console.log(9999, this.$parent.mobile)
    },
    methods: {
      handleCancelEvent() {
        this.clearTimer();
        this.$emit('cancelEvent')
      },
      handleCloseEvent() {
        this.clearTimer();
        this.$emit('closeEvent')
      },
      handleInput(value) {
        this.clearTimer();
        this.$emit('closeEvent')
      },
      // 获取验证码
      async handleGetCodeEvent() {
        var jsonParams = {
          mobile: this.mobile
        }
        jsonParams = JSON.stringify(jsonParams)
        const params = {
          componentCode: this.componentCode,
          orderNo: this.orderNo,
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
        this.startTimer(() => {
          this.isGetCode = false;
        })
      },
      // 开始定时器
      startTimer(cb) {
        this.isGetCode = true
        this.timer = setInterval(() => {
          this.count -= 1;
          if (this.count == 0) {
            this.clearTimer();
            cb && cb();
          }
        }, 1000)
      },
      // 清理定时器
      clearTimer() {
        if (this.timer) {
          clearInterval(this.timer);
        }
        ;
        this.count = 60;
      },
      async handleSubmitEvent() {
        this.$toast('正在提交中');
        var jsonParams = {
          mobile: this.$parent.mobile,
          validCode: this.validCode
        }
        jsonParams = JSON.stringify(jsonParams)
        const params = {
          componentCode: this.componentCode,
          orderNo: this.orderNo,
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
        this.startTimer(() => {
          this.isGetCode = false;
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .verification-pop {
    width: 540px;
    height: 380px;
    position: relative;
    overflow: hidden;

    .close-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;
      height: 60px;

      .close-img {
        display: block;
        width: 30px;
        height: 30px;
      }
    }

    .mobile-box {
      width: 480px;
      height: 80px;
      margin: 60px auto 0 auto;
      font-size: 28px;
    }

    .code-box {
      width: 480px;
      height: 80px;
      font-size: 28px;
      margin: 0 auto;
      .code-title {
      }
      input {
        width: 180px;
      }

      .get-code-btn {
        width: 160px;
        height: 50px;
        .code-btn {
          width: 160px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border: 1px solid #0A81FB;
          border-radius: 10px;
          color: #0A81FB;
        }
        .dis-code {
          width: 160px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border: 1px solid #666666;
          border-radius: 10px;
          color: #666666;
        }
      }
    }
  }

  .submit-verification {
    margin: 30px auto;
    width: 400px;
    height: 80px;
    line-height: 80px;
    background-color: #0a81fb;
    border-radius: 40px;
    text-align: center;
    color: #ffffff;
    font-family: PingFang-SC-Medium;
    font-size: 32px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
  }
</style>
