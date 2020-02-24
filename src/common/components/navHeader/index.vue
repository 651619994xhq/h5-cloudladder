<template>
  <!-- 头部标题子组件 -->
  <div class="header">
    <header class="header-title-wrapper" :class="hasLine ? 'has-line' : ''">
      <i class="back-icon icon-fanhui iconfont" @click="back" v-if="showBackIcon"></i>
      <h4 class="header-title">{{mainTitle}}</h4>
    </header>
  </div>
</template>
<script>
    export default {
        name: 'mainTitle',
        // 组件
        components: {

        },
        props: {
            mainTitle: {
                type: String,
                default: '标题'
            },
            noLine: {
                type: Boolean,
                default: false
            },
            showBackIcon: {
                type: Boolean,
                default: true
            },
            rightBtnText: {
                type: String,
                default: ''
            },
            hasLine: {
                type: Boolean,
                default: false
            },
            selfBack: {
                // 是否自定义返回时间
                type: Boolean,
                default: false
            },
            backApp:{
                type:Boolean,
                default:false
            },
            showCallPerson:{
                type:Boolean,
                default:false
            },


        },
        data() {
            return {

            }
        },
        methods: {
            back () {
                if(this.backApp){
                    //跳到订单页
                    // if(!Local.getBackPage()){
                    //     this.$toast('back page is null');
                    //     return;
                    // };
                    // window.location=Local.getBackPage();
                    // return;
                };
                if (this.selfBack) {
                    // this.$emit('backPage')
                } else {
                    this.$router.go(-1)
                }
            },

        }
    }
</script>
<style scoped lang="scss">
  .header{
    width: 100%;
    height: 130px;
  }
  .header-title-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 130px;
    z-index: 1;
    background-color: $white;
    box-sizing: border-box;
    padding-top: 40px;
    &.has-line:after{
      content:'';
      position:absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      background-color: $color-e;
      width: 100%;
    }
    .back-icon{
      position: absolute;
      left: 10px;
      bottom:20px;
      font-size:50px;
      width: 50px;
      height: 50px;
      &:after{
        position: absolute;
        content: '';
        left: -10px;
        top:-10px;
        right:-10px;
        bottom: -10px;
      }
    }
    .right-btn{
      position: absolute;
      right:25px;
      bottom: 20px;
      height: 50px;
      line-height: 50px;
      font-size: 32px;
      color: $color-6;
    }
    .header-title{
      line-height: 90px;
      text-align: center;
      font-size: 34px;
      font-weight: normal;
      color:$color-6;
      box-sizing: border-box;
      padding: 0 70px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .call-person-container{
      position: absolute;
      top: 0;
      right: 0;
      width: 130px;
      height: 130px;
      overflow: hidden;
      img{
        display: block;
        width: 48px;
        height: 48px;
        margin-top: 60px;
        margin-left: 60px;
      }
    }
  }
  .call-btn-container{
    margin-top: 40px;
    .hairlines{
      border: 1px solid #333;
    }
    .common-btn{
      width: 200px;
      height: 80px;
      line-height: 80px;
      border-radius: 80px;
      text-align: center;
      color: #fff;
      font-size: 24px;
    }
    .cancel-btn{
      color: #333
    }
    .sure-btn{
      background: $primary;
      width: 260px;
      height: 82px;
      line-height: 82px;
    }
  }

  .phone-number{
    text-align: center;
    font-size: 32px;
    line-height: 32px;
  }


</style>
