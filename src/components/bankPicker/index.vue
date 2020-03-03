<template>
  <van-popup :value="isShow" :close-on-click-overlay="false" position="bottom">
    <van-picker
      show-toolbar
      :columns="columns"
      @cancel="onCancel"
      @confirm="onConfirm"/>
  </van-popup>
</template>

<script>
export default {
  name: 'bankPicker',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    onConfirm (value, index) {
      this.$emit('onConfirm', index)
    },
    onCancel () {
      this.$emit('onCancel')
    }
  }
}
</script>
