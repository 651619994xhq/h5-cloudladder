<template>
  <div class="ani-box">
    <Loading></Loading>
  </div>
</template>

<script>
  import Loading from '@/common/components/loading/index'
  import {mapMutations} from 'vuex';
    export default {
        name: "index",
        components:{
            Loading
        },
        methods:{
            ...mapMutations(['SET_BACK_APP_URL','CLEAR_BACK_APP_URL','SET_ACCESS_TOKEN','CLEAR_ACCESS_TOKEN','SET_API_GATEWAY','CLEAR_API_GATEWAY']),
            setDefaultParams(){
                let accessToken = this.$route.query.accessToken;
                let apiGateway = this.$route.query.apiGateway;
                let backPage=this.$route.query.backUrl; //返回页面的地址
                this.SET_BACK_APP_URL(backPage?decodeURIComponent(backPage):"");
                this.SET_ACCESS_TOKEN(accessToken||'');
                this.SET_API_GATEWAY(apiGateway||'');
            },
            clearDefaultParams(){
                this.CLEAR_BACK_APP_URL();
                this.CLEAR_ACCESS_TOKEN();
                this.CLEAR_API_GATEWAY();
            },
        },
        created() {
            this.clearDefaultParams();

            this.setDefaultParams();

        },

        destroyed() {

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
