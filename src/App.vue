<template>
  <div id="app">
    <transition :name="transitionName">
        <router-view v-keep-scroll-position class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      transitionName: 'slide-right'// 默认动态路由变化为slide-right
    }
  },
  watch: {
    '$route' (to, from) {
      // 监听路由变化时的状态为前进还是后退
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
.child-view{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all .6s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: 0;
}
/*切换页面时的滑动效果*/
.views {
  position: absolute;
  width: 100%;
  transition: all .8s ease;
  top: 0;
}
.slide-left-enter-active {
  transition: all .3s ease;
}
.slide-left-leave-active {
  transition: all .4s ease;
}
.slide-left-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all .3s ease;
}
.slide-right-leave-active {
  transition: all .4s ease;
}
.slide-right-enter {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

</style>
