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
    setTimeout(() => {
      this.jumpRouter()
    }, 500)
  }
}
</script>
