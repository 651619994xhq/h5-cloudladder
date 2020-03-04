<template>
  <div class="page-wrapper">
    <nav-header title="等待排队"/>
    <div class="page-content">
      <div class="content">
        <div class="loan-channel">推荐至：{{productInfo.name}}</div>
        <div class="desc-content">
          <div class="gif-container">
            <img src="@image/wait.gif" alt="" class="img">
          </div>
          <p class="desc">实时审核需排队，进入排队后请耐心等待...</p>
        </div>
        <button class="queuing-btn" @click="addTaskProcessFn">开始排队</button>
        <div class="warm-prompt">
          <p class="warm-title1 warm-title">温馨提示:</p>
          <p class="warm-title2 warm-title">实时审核需进行排队</p>
          <p class="warm-title3 warm-title">进入申请流程后请及时填写信息以免资格失效</p>
        </div>
        <div class="rec-content">
          <a class="recommend-btn" @click="recommondNextFn">推荐下一款产品</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Loading from '@/common/components/loading/index'
import NavHeader from '@/common/components/navHeader/index'
import {getProduct, addTaskProcess, recommondNext} from '@utils/service'
import {mapMutations} from 'vuex'
export default {
  name: 'applyFlow',
  data () {
    return {
      productInfo: {
        name: ''
      }
    }
  },
  components: {
    NavHeader,
    Loading
  },
  methods: {
    // 获取推荐产品的详情
    async getProductInfoFn () {
      this.$loading({message: '请求中'})
      let [err, data] = await getProduct({})
      if (err !== null) {
        this.$clear()
        this.$toast(err || '系统错误')
        return false
      }
      // 清除loading
      this.$clear()
      // TODO 这里处理正常逻辑
      console.log('data数据', data)
      this.productInfo.name = data.name
    },
    async addTaskProcessFn () {
      this.$loading({message: '请求中'})
      let [err, data] = await addTaskProcess({})
      if (err !== null) {
        this.$clear()
        this.$toast(err || '系统错误')
        return false
      }
      // 清除loading
      this.$clear()

      this.$toast('加入成功')
      // TODO 这里处理正常逻辑
      console.log('data数据', data)
    },
    async recommondNextFn () {
      this.$loading({message: '请求中'})
      let [err, data] = await recommondNext({})
      if (err !== null) {
        this.$clear()
        this.$toast(err || '系统错误')
        return false
      }
      // 清除loading
      this.$clear()
      this.$toast('推荐成功')
      window.location.href = this.$store.state.backAppUrl
      // TODO 这里处理正常逻辑
      console.log('data数据', data)
      console.log('推荐的哈哈哈', this.$store)
    }
  },
  created () {
    this.getProductInfoFn()
  }
}
</script>

<style scoped lang="scss">
  .page-wrapper{
    .page-content{
      .content{
        .loan-channel{
          padding: 30px;
          text-align: center;
        }
        .desc-content{
          background-color: #fff;
          padding: 30px;
          margin-bottom: 40px;
          .gif-container {
            margin: 44px auto 20px;
            width: 240px;
            height: 240px;
            background: #fff;
            .img {
              display: block;
              width: 100%;
              height: 100%;
              border: none;
            }
          }
          .desc{
            text-align: center;
            font-size: 24px;
          }
        }
        .queuing-btn{
          background-color: #0A81FB;
          color: #fff;
          height: 88px;
          border: 0;
          border-radius: 44px;
          width: 400px;
          display: block;
          margin: 0 auto 20px;
          font-size: 28px;
        }
        .warm-prompt{
          padding: 30px;
          margin-bottom: 30px;
          p{
            font-size: 24px;
            color: #666;
          }
        }
        .rec-content{
          text-align: center;
          line-height: 2;
          .recommend-btn{
            text-decoration:underline;
            color: #0A81FB;
            font-size: 28px;
          }
        }
      }

    }
  }
</style>
