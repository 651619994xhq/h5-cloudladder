<template>
  <div class="page-wrapper">
    <nav-header title="借款申请"/>
    <div class="page-content">
      <Loading/>
    </div>
  </div>
</template>

<script>
  import Loading from '@/common/components/loading/index'
  import NavHeader from '@/common/components/navHeader/index'
  import {getTaskProcess} from '@utils/service'
  import {mapMutations} from 'vuex'

  export default {
    name: 'applyFlow',
    data() {
      return {
        status: 3
      }
    },
    components: {
      NavHeader,
      Loading
    },
    methods: {
      ...mapMutations(['SET_BACK_APP_URL', 'CLEAR_BACK_APP_URL', 'SET_ACCESS_TOKEN', 'CLEAR_ACCESS_TOKEN', 'SET_API_GATEWAY', 'CLEAR_API_GATEWAY']),
      setDefaultParams() {
        let accessToken = this.$route.query.accessToken
        let apiGateway = this.$route.query.apiGateway
        let backPage = this.$route.query.backUrl
        this.SET_BACK_APP_URL(backPage ? decodeURIComponent(backPage) : '')
        this.SET_ACCESS_TOKEN(accessToken || '')
        this.SET_API_GATEWAY(apiGateway || '')
      },
      clearDefaultParams() {
        this.CLEAR_BACK_APP_URL()
        this.CLEAR_ACCESS_TOKEN()
        this.CLEAR_API_GATEWAY()
      },
      // 队列查询获取状态
      async getTaskProcessFn() {
        this.$loading({message: '请求中'})
        let [err, data] = await getTaskProcess({})
        if (err !== null) {
          this.$clear()
          this.$toast(err || '系统错误')
          return false
        }
        // 清除loading
        this.$clear()
        // TODO 这里处理正常逻辑
        console.log('data数据', data)
        this.jumpRouter(data.state)
        // this.jumpRouter(3)
      },
      jumpRouter(state) {
        const routersMap = {
          '1': 'unQueuing',
          '2': 'queuing',
          '3': 'loanApplication',
          '4': 'submitSuccess',
          '5': 'auditSuccess',
          '6': 'auditFail',
          '7': 'cash'
        }
        this.$router.push({
          name: routersMap[state]
        })
      }
    },
    created() {
      this.clearDefaultParams()
      this.setDefaultParams()
      this.getTaskProcessFn()
    }
  }
</script>
