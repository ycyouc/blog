<template>
  <div class="image-loader-container">
    <img v-if="!transitionComplete" class="placeholder" :src="placeholder" alt="" />
    <img
      @load="handle"
      :src="fullSrc"
      alt=""
      :style="{ opacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
import { server_URL } from '@/utils/serverURL'
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      isOriginLoaded: false,
      transitionComplete: false,
    };
  },
  computed: {
    opacity() {
      return this.isOriginLoaded ? 1 : 0;
    },
    fullSrc() {
      return server_URL + this.src
    }
  },
  methods: {
    handle() {
      this.isOriginLoaded = true;
      setTimeout(() => {
        this.transitionComplete = true;
      }, this.duration);
      this.$emit("load");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
}
</style>
