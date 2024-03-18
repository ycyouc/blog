<template>
  <img
    class="avatar-container"
    :src="fullSrc"
    :style="{ width: size + 'px', height: size + 'px' }"
  />
</template>

<script>
import { server_URL } from '@/utils/serverURL'
export default {
  props: {
    url: {
      type: String,
      required: true,
      default: ''
    },
    size: {
      type: Number,
      default: 150,
    },
  },
  computed: {
    fullSrc() {
      return server_URL + this.url
    }
  }
};
</script>

<style lang="less" scoped>
.avatar-container {
    border-radius: 50%;
    object-fit: cover;
    display: block;
}
</style>
