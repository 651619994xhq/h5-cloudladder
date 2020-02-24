<template>
  <div id="app">
    <transition :name="transitionName">
<!--      <keep-alive >-->
        <router-view v-keep-scroll-position class="child-view"></router-view>
<!--        <router-view v-keep-scroll-position class="child-view" v-if="$route.meta.keepAlive"></router-view>-->
<!--        <router-view v-keep-scroll-position  class="child-view" v-if="!$route.meta.keepAlive" :key="'time'+new Date().getTime()"></router-view>-->
<!--      </keep-alive>-->
<!--    <router-view v-if="isRouterAlive" class="child-view"></router-view>-->
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
     return {
       isRouterAlive:true
     }
  },
  computed: {
    transitionName() {
      return this.$store.state.transitionName
    },
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(()=>{
        this.isRouterAlive=true;
      });
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
