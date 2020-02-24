<template>
  <div class="no-data text-center">
    <NavHeader :mainTitle="NavHeader.title" :selfBack="true"></NavHeader>
    {{title}}
  </div>
</template>

<script type="text/ecmascript-6">
    import NavHeader from '@/common/components/navHeader/index'  //导入公共的title
    export default {
        props: {
            title: {
                type: String,
                default: 'Opos！数据有点异常请返回重试~'
            },
        },
        data(){
            return {
                NavHeader:{
                    title:'提示'
                }
            }
        },
        components:{
            NavHeader
        },
        methods:{
        }
    }
</script>

<style scoped lang="scss">
  .no-data {
    font-size: 24px;
    padding-top: 100px
  }
</style>
