<template>
  <div class="identityAuthentication">
    <NavHeader :title="title" :selfBack="true" @backPage="backPage"></NavHeader>
    <input ref="changeInput" type="file" accept="image/*"  @change="changeImage"
           v-show="isShowImageInput"/>
    <div class="header-box col flex-item-start flex-justify-start">
      <div class="title">
        请上传身份证
      </div>
      <div class="main-box row flex-item flex-justify">
        <div class="item col flex-item flex-justify-start" @click="handleClickPhoto('front')">
          <div class="item-top" v-if="!identityInfo.idFrontBase64">
            <img src="@image/idCard/idCardFront.png" alt="">
          </div>
          <div class="item-top" v-else>
            <img :src="identityInfo.idFrontBase64" alt="">
          </div>
          <div class="item-bottom">
            点击上传人面像
          </div>
        </div>
        <div class="item col flex-item flex-justify-start"  @click="handleClickPhoto('back')">
          <div class="item-top" v-if="!identityInfo.idBackBase64">
            <img src="@image/idCard/idCardBack.png" alt="">
          </div>
          <div class="item-top" v-else>
            <img :src="identityInfo.idBackBase64" alt="">
          </div>
          <div class="item-bottom">
            点击上传人国徽面
          </div>
        </div>
      </div>

    </div>
    <div>
      <div class="error-hint-box col flex-item-start flex-justify-start">
        <div class="hint-title">
          错误提示
        </div>
        <div class="hint-container row flex-item flex-justify">
          <div class="hint-item col flex-item flex-justify-start">
            <div class="hint-top">
              <img src="@image/idCard/id_suc.png" alt="">
            </div>
            <div class="hint-bottom">
              标准
            </div>
          </div>

          <div class="hint-item col flex-item flex-justify-start">
            <div class="hint-top">
              <img src="@image/idCard/id_error1.png" alt="">
            </div>
            <div class="hint-bottom">
              边框缺失
            </div>
          </div>

          <div class="hint-item col flex-item flex-justify-start">
            <div class="hint-top">
              <img src="@image/idCard/id_error2.png" alt="">
            </div>
            <div class="hint-bottom">
              照片模糊
            </div>
          </div>

          <div class="hint-item col flex-item flex-justify-start">
            <div class="hint-top">
              <img src="@image/idCard/id_error3.png" alt="">
            </div>
            <div class="hint-bottom">
              闪光强烈
            </div>
          </div>

        </div>
      </div>
    <div class="submit" @click="handleSubmitEvent">
      确认提交
    </div>
    </div>

  </div>
</template>

<script>
    import NavHeader from '@/common/components/navHeader/index'  //导入公共的title
    const isIos = navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-IOS') > 0;
    const isAndroid = navigator.userAgent.toUpperCase().indexOf('X-CROSS-AGENT-ANDROID') > 0;
    export default {
        name: "identityAuthentication",
        data() {
            return {
                title: '身份认证',
                isShowImageInput:false,
                currentPhotoType:'', //当前选中
                identityInfo: {
                    idFrontBase64: '',   //身份份证正面
                    idBackBase64: '', // 身份证反面
                },
            }
        },
        created() {
        },
        components: {NavHeader},
        methods: {
            //文件改变
            changeImage(event) {
                let file = event.target.files[0];
                if (!file) {
                    return;
                };
                let fileSize=(file.size/1024/1024).toFixed(2);
                if(fileSize>20){
                    this.$toast(`文件过大,请重新上传`);
                    return;
                };
                this.$loading({
                    message:'上传中'
                });
                let that=this;
                let reader =new FileReader();
                reader.readAsDataURL(file);//转化二进制流，异步方法
                reader.onload =function(){
                    that.$clear();
                    if(that.currentPhotoType=='front'){
                        that.identityInfo.idFrontBase64=this.result;
                        return;
                    }
                    if(that.currentPhotoType=='back'){
                        that.identityInfo.idBackBase64=this.result;
                        return;
                    }
                }
            },
            handleClickPhoto(type){
                this.currentPhotoType=type;
                if(isAndroid){
                    this.$refs.changeInput.click();
                    return
                };
                if(isIos){
                    this.$refs.changeInput.dispatchEvent(new Event('click')) ;
                    return;
                };
                this.$refs.changeInput.click();
            },
            backPage(){this.$emit('onBackPage');},
            //提交
            async handleSubmitEvent() {

                if(!this.identityInfo.idFrontBase64){
                    this.$toast('请上传身份证正面照片');
                    return
                }
                if(!this.identityInfo.idBackBase64){
                    this.$toast('请上传身份证反面照片');
                    return
                }
                let userInfo = {
                    idFront:this.identityInfo.idFrontBase64,//身份证正面照
                    idBack:this.identityInfo.idBackBase64,//身份证反面照
                };
                this.$emit('onGetIdCardInfo',userInfo);
            }
        }
    }
</script>

<style scoped lang="scss">
  .header-box {
    width: 100%;
    height: 336px;
    background: $white;
    margin-top: 25px;

    .title {
      margin-top: 30px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: $color-3;
      padding-left: 30px;
    }
  }

  .main-box {
    margin-top: 24px;
    width: 100%;

    .item {
      width: 275px;
      height: 220px;

      &:first-of-type {
        margin-right: 12px;
      }

      .item-top {
        width: 275px;
        height: 168px;
        overflow: hidden;

        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }

      .item-bottom {
        margin-top: 16px;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: $color-6;
      }
    }
  }

  .error-hint-box {
    margin-top: 20px;
    width: 100%;
    height: 280px;
    background: $white;

    .hint-title {
      margin-top: 30px;
      padding-left: 30px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: $color-3;
    }

    .hint-container {
      margin-top: 30px;
      width: 100%;
      height: 160px;

      .hint-item {
        width: 125px;
        height: 160px;
        margin-right: 19px;

        &:last-of-type {
          margin-right: 0;
        }

        .hint-top {
          width: 125px;
          height: 107px;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        .hint-bottom {
          margin-top: 11px;
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: $color-6;
        }
      }

    }
  }

  .submit {
    margin-top: 30px;
    margin-left: 30px;
    width: 580px;
    height: 80px;
    line-height: 80px;
    background: #0A81FB;
    border-radius: 40px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 500;
    color: $white;
    text-align: center;
    margin-bottom: 50px;
  }
  .idcardinfo{
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    padding-top: 20px;
  }
  .loan-equipment {
    padding: 0 20px 0 30px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 20px;

    .equipment-term {
      height: 86px;
      line-height: 86px;
      font-size: 26px;
      color: #333;
      border-bottom: 1px solid #eeeeee;
      position: relative;

      .t-right {
        text-align: right;
      }

      &
      :last-child {
        border-bottom: none;
      }

    }
  }
  p{
    display: block;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #ed6a0c;
  }
  .class-isShow{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .picker-bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .select-picker {
    position: fixed !important;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  input{
    text-align: right;
  }
</style>
