<template>
  <van-popup :value="isShow" @input="handleInput" :close-on-click-overlay="false" position="bottom">
    <div class="tool-bar col flex-item flex-justify-start">
      <div class="row flex-item flex-justify-between control">
        <div class="left-btn control-btn" @click="onCancel">取消</div>
        <div class="right-btn control-btn" @click="onConfirm">确定</div>
      </div>
      <div class="change-bank" @click="handleChangeBankEvent">
        +更换银行卡
      </div>
    </div>
    <van-picker
      :columns="columns"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script>
    export default {
        name: "bankPicker",
        props:{
            isShow: {
                type:Boolean,
                default:false
            },
            columns:{
                type:Array,
                default: []
            }
        },
        data() {
            return {
                value: '',

            }
        },
        methods: {
            onConfirm(value) {
                this.value = value;
                this.$emit('onConfirm',value);
            },
            handleInput(){

            },
            onCancel(){
                this.$emit('onCancel');
            },
            handleChangeBankEvent(){
                this.$emit('onChangeBank')
            }
        }
    }
</script>

<style scoped lang="scss">
  .control{
    width: 100%;
    height: 60px;
    font-size: 26px;
    .control-btn{
      color: #1989fa;
      width: 200px;
      height: 100%;
      line-height: 60px;
    }
    .left-btn{
      padding-left: 28px;
    }
    .right-btn{
      padding-right: 28px;
      text-align: right;
    }

    .change-bank{
      width: 100%;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 26px;
    }

  }

</style>
