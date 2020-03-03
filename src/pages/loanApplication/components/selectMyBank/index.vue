<template>
  <van-popup
    v-model="isShow"
    :close-on-click-overlay="false"
    position="bottom">
    <div class="popup-content">
      <h5 class="popup-title">选择银行卡</h5>
      <div class="btn-contents">
        <button class="cancel-btn" @click="bankCancelFn">取消</button>
        <button class="add-btn" @click="bankAddFn">添加</button>
      </div>
      <ul class="bank-content">
        <li class="list-item"
            v-for="(item, index) in bankList"
            :key="index"
            :class="index===currentIndex ? 'active' : ''"
            @click="bankSelectFn(index)">{{item.bankName}}</li>
      </ul>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default () {
        return false
      }
    },
    bankList: {
      type: Array,
      default () {
        return []
      }
    }
  },

  methods: {
    bankSelectFn (index) {
      this.currentIndex = index
      this.$emit('bankSelectFn')
    },
    // 取消
    bankCancelFn () {
      this.$emit('bankCancelFn')
    },
    // 新增
    bankAddFn () {
      this.$emit('bankAddFn')
    }
  }
}
</script>

<style scoped lang="scss">

  .popup-content{
    padding: 30px;
    .popup-title{
      text-align: center;
      font-size: 28px;
      margin-bottom: 20px;
    }
    .btn-contents{
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .cancel-btn{
        background-color: #f6f6f6;
        border: 1px solid #eee;
        padding: 10px 25px;
        border-radius: 4px;
      }
      .add-btn{
        background-color: #0a81fb;
        border: 1px solid #0a81fb;
        color: #fff;
        padding: 10px 25px;
        border-radius: 4px;
      }
    }

    .bank-content{
      .list-item{
        padding: 20px;
        border: 1px solid #eee;
        margin-bottom: 20px;
        color: #666;
        border-radius: 4px;
        &.active{
          border:1px solid #0a81fb;
          background-color: #0a81fb;
          color: #fff;
        }
      }
    }
  }

</style>
