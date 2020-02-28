<template>
  <div class="ani-box">
    <Loading></Loading>
  </div>
</template>

<script>
import Loading from "@/common/components/loading/index";
import { getTaskProcess } from "@utils/service";
import { mapMutations } from "vuex";
export default {
  name: "index",
  components: {
    Loading
  },
  methods: {
    ...mapMutations([
      "SET_BACK_APP_URL",
      "CLEAR_BACK_APP_URL",
      "SET_ACCESS_TOKEN",
      "CLEAR_ACCESS_TOKEN",
      "SET_API_GATEWAY",
      "CLEAR_API_GATEWAY"
    ]),
    setDefaultParams() {
      let accessToken = this.$route.query.accessToken;
      let apiGateway = this.$route.query.apiGateway;
      let backPage = this.$route.query.backUrl; //返回页面的地址
      this.SET_BACK_APP_URL(backPage ? decodeURIComponent(backPage) : "");
      this.SET_ACCESS_TOKEN(accessToken || "");
      this.SET_API_GATEWAY(apiGateway || "");
    },
    clearDefaultParams() {
      this.CLEAR_BACK_APP_URL();
      this.CLEAR_ACCESS_TOKEN();
      this.CLEAR_API_GATEWAY();
    },
    /**
     * ajax 请求试例
     * @returns {Promise<void>}
     */
    async testPost() {
      this.$loading({ message: "请求中" }); //loaing
      let [err, data] = await getTaskProcess({});
      if (err !== null) {
        this.$clear();
        this.$toast(err || "系统错误");
        return;
      }
      this.$clear(); //清除loading
      //TODO 这里处理正常逻辑
      let state = data.state;
      this.jumpPageWithResState(state);
    }
  },
  created() {
    this.clearDefaultParams();

    this.setDefaultParams();
  },
  methods: {
    //失败页面
    redirectErrorPage() {
      this.$router.replace({
        path: "/error"
      });
    },
    //跳转页面根据返回的状态
    jumpPageWithResState(state) {
      if (state == 1 || state == 2) {
        this.$router.replace({
          path: "/queuing"
        });
        return;
      }
      if (state == 3) {
        this.$router.replace({
          path: "/loan-application"
        });
        return;
      }
      if (state == 4) {
        this.$router.replace({
          path: "/submit-success"
        });
        return;
      }
      if (state == 5) {
        this.$router.replace({
          path: "/audit-success"
        });
        return;
      }
      if (state == 6) {
        this.$router.replace({
          path: "/audit-fail"
        });
        return;
      }
      this.redirectErrorPage();
    }
  },

  destroyed() {}
};
</script>

<style scoped lang="scss">
.ani-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
