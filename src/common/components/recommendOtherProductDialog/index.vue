<template>
  <van-popup round="true" :style="{borderRadius:'10px'}" :value="isShow" @input="handleInput" :close-on-click-overlay="false" class="popup-box">
    <div class="product-pop">
      <div class="title">温馨提示</div>
      <div class="content">对当前申请产品不满意或遇到问题时可选择推荐下一款产品</div>
      <div class="row flex-item flex-justify-between control-btn">
        <div class="cancel-btn" @click="handleCancelEvent">取消</div>
        <div class="sure-btn" @click="handleConfirmEvent">推荐下一款产品</div>
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

            }
        },
        created() {

        },
        destroyed(){
        },
        methods: {
            handleCancelEvent(){
                this.$emit('cancelEvent')
            },
            handleCloseEvent(){
                this.$emit('closeEvent')
            },
            handleInput(value){
                this.$emit('closeEvent')
            },
            handleConfirmEvent(){
                this.$emit('confirmEvent')
            }

        },
    }
</script>

<style scoped lang="scss">
  .product-pop{
    width: 520px;
    height: 340px;
    background: #ffffff;
    overflow: hidden;
    .title{
      font-size: 30px;
      font-weight: bold;
      text-align: center;
      color: #333333;
      margin-top: 60px;
    }
    .content{
      margin-top: 40px;
      padding: 0 30px;
      font-size: 24px;
      color: #333333;
      line-height: 30px;
    }
    .control-btn{
      margin-top: 40px;
      height: 80px;
      padding: 0 30px;
      font-size: 26px;
      font-weight: bold;
    }
    .cancel-btn{
      color: $primary;
      width: 180px;
      height: 80px;
      line-height: 80px;
      border-radius: 80px;
      border: 1px solid $primary;
      text-align: center;
    }
    .sure-btn{
      background: $primary;
      width: 240px;
      height: 81px;
      line-height: 81px;
      border-radius: 81px;
      text-align: center;
      color: white;
    }
  }


</style>
