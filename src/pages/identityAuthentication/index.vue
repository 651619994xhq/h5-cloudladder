<template>
  <div class="identityAuthentication">
    <NavHeader :title="title" :selfBack="true" @backPage="backPage"></NavHeader>
    <input ref="changeInput" type="file" accept="image/*" @change="changeImage"
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
        <div class="item col flex-item flex-justify-start" @click="handleClickPhoto('back')">
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
    <div class="error-hint-box col flex-item-start flex-justify-start">
      <div class="hint-title">
        请上传本人手持身份证照片
      </div>
      <div class="hint-container row flex-item flex-justify">
        <div class="hint-item col flex-item flex-justify-start" @click="handleClickPhoto('hand')">
          <div class="hint-top" v-if="!identityInfo.idHandBase64">
            <img src="" alt="">
          </div>
          <div class="hint-top" v-else>
            <img :src="identityInfo.idHandBase64" alt="">
          </div>
          <div class="hint-bottom">
            点击上传照片
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="idcardinfo">补充身份证信息</div>
      <div>
        <ul class="loan-equipment">
          <li class="flex equipment-term">
            <div class="flex-grow">身份证有效期开始时间</div>
            <div class="t-right" @click="handleTime('startTime')">
              <span style="margin-right: 5px">{{start||'请选择'}}</span>
              <i class="icon-youjiantou iconfont left-icon"></i>
            </div>
          </li>
          <li class="flex equipment-term">
            <div class="flex-grow">身份证有效期结束时间</div>
            <div class="t-right" @click="handleTime('endTime')">
              <span style="margin-right: 5px">{{end||'请选择'}}</span>
              <i class="icon-youjiantou iconfont left-icon"></i>
            </div>
          </li>
          <li class="flex equipment-term">
            <div class="flex-grow">身份证住址</div>
            <div class="t-right">
              <input type="text" v-model="idAddress" placeholder="请填写"/>
            </div>
          </li>
          <li class="flex equipment-term">
            <div class="flex-grow">身份证发证机关</div>
            <div class="t-right">
              <input type="text" v-model="mechanism" placeholder="请填写"/>
            </div>
          </li>
        </ul>
      </div>
      <p>*如实填写身份证信息以免影响结果</p>
    </div>
    <div class="submit" @click="handleSubmitEvent">
      确认提交
    </div>

    <div class="class-isShow" v-if="showPicker">
      <div class="picker-bg"></div>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        class="select-picker"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="cancel"
        @confirm="onConfirm"
        :visible="showPicker"
        :visible-item-count="3"
        :item-height="60"
      />
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
        isShowImageInput: false,
        currentPhotoType: '', //当前选中
        identityInfo: {
          idFrontBase64: '',   //身份份证正面
          idBackBase64: '', // 身份证反面
          idHandBase64: '', //手持身份证
        },
        minDate: '',//最小时间
        maxDate: '',//最大时间
        currentDate: new Date(),//时间
        startDate: '',//开始时间
        start: '',
        endDate: '',//结束时间
        end: '',
        showPicker: false,//时间选择弹窗
        idAddress: '', // 地址
        mechanism: '',//机关
        handCardImage: '',
        identityTime: '',
      }
    },
    created() {
      this.initTimePickerData();
    },
    components: {NavHeader},
    methods: {
      //文件改变
      changeImage(event) {
        let file = event.target.files[0];
        if (!file) {
          return;
        }
        ;
        let fileSize = (file.size / 1024 / 1024).toFixed(2);
        if (fileSize > 20) {
          this.$toast(`文件过大,请重新上传`);
          return;
        }
        ;
        this.$loading({
          message: '上传中'
        });
        let that = this;
        let reader = new FileReader();
        reader.readAsDataURL(file);//转化二进制流，异步方法
        reader.onload = function () {
          that.$clear();
          if (that.currentPhotoType == 'front') {
            that.identityInfo.idFrontBase64 = this.result;
            return;
          }
          if (that.currentPhotoType == 'back') {
            that.identityInfo.idBackBase64 = this.result;
            return;
          }
          if (that.currentPhotoType == 'hand') {
            that.identityInfo.idHandBase64 = this.result;
            return;
          }
        }
      },
      handleClickPhoto(type) {
        this.currentPhotoType = type;
        if (isAndroid) {
          this.$refs.changeInput.click();
          return
        }
        ;
        if (isIos) {
          this.$refs.changeInput.dispatchEvent(new Event('click'));
          return;
        }
        ;
        this.$refs.changeInput.click();
      },
      backPage() {
        this.$emit('onBackPage');
      },
      handleTime(action) {
        if (!this.identityInfo.idFrontBase64) {
          this.$toast('请上传身份证正面照片');
          return
        }
        if (!this.identityInfo.idBackBase64) {
          this.$toast('请上传身份证反面照片');
          return
        }
        if (!this.identityInfo.idHandBase64) {
          this.$toast('请上传手持身份证照片');
          return
        }
        this.pickerAction = action;
        if (action = 'startTime') {
          this.showPicker = true
          return
        }
        if (action = 'endTime') {
          this.showPicker = true
          return
        }
      },
      //初始化 时间选择器
      initTimePickerData() {
        let date = new Date();
        let lastDate = date.getFullYear() - 20;
        let nextDate = date.getFullYear() + 20;
        this.minDate = new Date(`${lastDate}-01-01`);
        this.maxDate = new Date(`${nextDate}-12-31`);
      },
      //关闭时间选择器
      cancel(value, index) {
        this.showPicker = false
      },
      //确认时间
      onConfirm(value, index) {
        if (this.pickerAction == 'startTime') {
          let date = new Date(value);
          let Y = date.getFullYear();
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          let D = date.getDate();
          this.startDate = Y + M + D;
          console.log(this.startDate)
          this.start = Y + '-' + M + '-' + D
          this.showPicker = false
          return
        }
        if (this.pickerAction == 'endTime') {
          let date = new Date(value);
          let Y = date.getFullYear();
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          let D = date.getDate();
          this.endDate = Y + M + D;
          console.log(this.endDate)
          this.end = Y + '-' + M + '-' + D
          this.showPicker = false
          return
        }
      },
      //提交
      async handleSubmitEvent() {

        if (!this.identityInfo.idFrontBase64) {
          this.$toast('请上传身份证正面照片');
          return
        }
        if (!this.identityInfo.idBackBase64) {
          this.$toast('请上传身份证反面照片');
          return
        }
        if (!this.identityInfo.idHandBase64) {
          this.$toast('请上传手持身份证照片');
          return
        }
        if (!this.startDate) {
          this.$toast('请选择身份证有效期起始时间');
          return
        }
        if (!this.endDate) {
          this.$toast('请选择身份证有效期结束时间');
          return
        }
        if (!this.idAddress) {
          this.$toast('请填写身份证地址');
          return
        }
        if (!this.mechanism) {
          this.$toast('请填写身份证发证机关');
          return;
        }
        this.identityTime = this.startDate + "-" + this.endDate;
        let userInfo = {
          idAddress: this.idAddress,//身份证地址
          mechanism: this.mechanism,//身份证发证机关
          identityTime: this.identityTime,//身份证起止时间
          idFront: this.identityInfo.idFrontBase64,//身份证正面照
          idBack: this.identityInfo.idBackBase64,//身份证反面照
          idHandBase64: this.identityInfo.idHandBase64//手持身份证照片
        };
        this.$emit('onGetIdCardInfo', userInfo);
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
    height: 350px;
    background: $white;

    .hint-title {
      margin-top: 30px;
      padding-left: 30px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 500;
      color: $color-3;
    }

    .hint-container {
      margin-top: 20px;
      width: 100%;
      height: 400px;

      .hint-item {
        width: 250px;
        height: 230px;
        margin-right: 19px;

        &:last-of-type {
          margin-right: 0;
        }

        .hint-top {
          width: 300px;
          height: 300px;
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
          width: 200px;
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

  .idcardinfo {
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

  p {
    display: block;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #ed6a0c;
  }

  .class-isShow {
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

  input {
    text-align: right;
  }
</style>
