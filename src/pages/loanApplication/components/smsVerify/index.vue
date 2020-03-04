<template>
  <div class="content">

    <div class="item" @click="clickFn">
      <strong class="note">短信认证</strong>
      <p class="status-bar">
        <span class="status-text">{{statusText}}</span>
        <i class="icon-youjiantou iconfont right-arrow"></i>
      </p>
    </div>
    <private-dialog
      :isShow="isShow"
      :orderNo="info.orderNo"
      :componentCode="info.componentCode"
      @closeEvent="closeEvent"
    />
  </div>

</template>

<script>
  import PrivateDialog from '../privateDialog'
  export default {
    name: 'index',
    components: {
      PrivateDialog
    },
    data() {
      return {
        isShow: false
      }
    },
    props: {
      info: {
        type: Object,
        default() {
          return {
            block: 1,
            componentCode: '',
            componentValue: '',
            createTime: '',
            id: '',
            nodeCode: '',
            orderNo: '',
            processSeq: '',
            processType: '',
            productCode: '',
            reformSign: '',
            state: '',
            submitTime: null,
            taskNo: '',
            updateTime: ''
          }
        }
      }
    },
    computed: {
      statusText() {
        const stateArr = ['请选择', '提交成功', '验证成功', '验证失败']
        return stateArr[this.info.state]
      },
      mobile(){

        console.log(66666666666666, this.info.componentValue)
        console.log('mobile mobile mobile mobile ', JSON.parse(this.info.componentValue).mobile)
        return JSON.parse(this.info.componentValue).mobile
      }
    },
    methods: {
      clickFn() {
        this.isShow = true
      },
      closeEvent() {
        this.isShow = false
      }
    },

    mounted(){
      console.log('短信短信', this.info)
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
