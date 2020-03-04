<template>
  <div class="content">
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
    methods: {
      checkIsLogin() {
        console.log(123456789, this.info)
        this.isShow = this.info.state === 0 || this.info.state === 3
      },
      closeEvent() {
        this.isShow = false
      }
    },

    mounted() {

      this.checkIsLogin()


    }
  }
</script>

<style scoped lang="scss">

</style>
