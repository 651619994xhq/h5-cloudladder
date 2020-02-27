<template>
  <div class="ani-box">
    <Loading></Loading>
  </div>
</template>

<script>
  import Loading from '@/common/components/loading/index'
    export default {
        name: "index",
        components:{
            Loading
        }
    }
</script>

<style scoped lang="scss">
  .ani-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

</style>
