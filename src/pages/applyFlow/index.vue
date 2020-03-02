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
import {getTaskProcess} from '@utils/service';

export default {
  name: 'applyFlow',
  data () {
    return {
      status: 3
    }
  },
  components: {
    NavHeader,
    Loading
  },
  methods: {
    // 队列查询获取状态
    async getTaskProcessFn () {
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
    },
    jumpRouter () {
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
        name: routersMap[this.status]
      })
    }
  },
  created () {
    this.getTaskProcessFn()
    setTimeout(() => {
      // this.jumpRouter()
    }, 500)
  }
}
</script>
