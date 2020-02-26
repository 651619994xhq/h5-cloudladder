<template>
  <van-popup round="true" :style="{borderRadius:'10px'}" :value="isShow" @input="handleInput" :close-on-click-overlay="false" class="popup-box">
    <div class="verification-pop">
      <div class="close-btn flex flex-item flex-justify" @click="handleCloseEvent">
        <i class="icon-guanbi iconfont close-img"></i>
      </div>
      <div class="mobile-box row flex-justify-between flex-item">
        <div class="mobile-text">
          验证手机
        </div>
        <div class="mobile">
          186****4016
        </div>
      </div>
      <div class="code-box row flex-justify-between flex-item">
        <div class="code-title">
          验证码
        </div>
        <input type="number" placeholder="请输入验证码">
        <div class="get-code-btn">
           <div class="code-btn" v-if="!isGetCode" @click="handleGetCodeEvent">
             获取验证码
           </div>
          <div class="dis-code" v-else>
            60s
          </div>
        </div>

      </div>

    </div>
  </van-popup>
</template>

<script>
    export default {
        name: "verificationDialog",
        props: {
            isShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                isGetCode:false
            }
        },
        created() {

        },
        methods: {
            handleCancelEvent(){
                this.$emit('cancelEvent')
            },
            handleSureEvent(){
                window.location.href = 'tel://010-87777985';
                // this.$emit('sureEvent');

            },
            handleCloseEvent(){
                this.$emit('closeEvent')
            },
            handleInput(value){
                this.$emit('closeEvent')
            },
            handleGetCodeEvent(){
                this.isGetCode=true;
            }

        },
    }
</script>

<style scoped lang="scss">
  .verification-pop{
    width: 520px;
    height: 340px;
    position: relative;
    overflow: hidden;
    .close-btn{
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;
      height: 60px;
      .close-img{
        display: block;
        width: 30px;
        height: 30px;
      }
    }
    .mobile-box{
      width: 480px;
      height: 80px;
      margin: 60px auto 0 auto;
      font-size: 28px;
    }
    .code-box{
      width: 480px;
      height: 80px;
      font-size: 28px;
      margin: 0 auto;
      .code-title{

      }
      input{

        width: 180px;
      }
      .get-code-btn{
        width: 160px;
        height: 50px;
        .code-btn{
          width: 160px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border: 1px solid #0A81FB;
          border-radius: 10px;
          color: #0A81FB;
        }
        .dis-code{
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

</style>
