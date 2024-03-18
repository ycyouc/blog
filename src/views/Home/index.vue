<template>
  <div
    class="home-container"
    ref="homeContainer"
    @wheel="handleWheel"
    v-loading="loading"
  >
    <ul
      class="carousel-container"
      :style="{ marginTop }"
      @transitionend="handleTransitionend"
    >
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <div class="icon icon-up" v-show="index >= 1" @click="switchTo(index - 1)">
      <Icon type="arrowUp"></Icon>
    </div>
    <div
      class="icon icon-down"
      v-show="index < data.length - 1"
      @click="switchTo(index + 1)"
    >
      <Icon type="arrowDown"></Icon>
    </div>
    <ul class="indicator">
      <li
        :class="{ active: index === i }"
        v-for="(item, i) in data"
        :key="item.id"
        @click="switchTo(i)"
      ></li>
    </ul>
  </div>
</template>

<script>
import CarouselItem from "./CarouselItem";
import Icon from "@/components/Icon";
import { mapState } from "vuex";

export default {
  components: {
    CarouselItem,
    Icon,
  },
  data() {
    return {
      index: 0,
      containerHeight: 0,
      isChanging: false, //是否正在切换中
    };
  },
  created() {
    this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.containerHeight = this.$refs.homeContainer.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["data", "loading"]),
  },
  methods: {
    switchTo(i) {
      this.index = i;
    },
    //滚轮事件
    handleWheel(e) {
      if (this.isChanging) {
        return;
      }
      if (e.deltaY > 99 && this.index < this.data.length - 1) {
        this.isChanging = true;
        this.index++;
      } else if (e.deltaY < -99 && this.index > 0) {
        this.isChanging = true;
        this.index--;
      }
    },
    //过渡动画结束
    handleTransitionend() {
      this.isChanging = false;
    },
    //窗口尺寸变化
    handleResize() {
      this.containerHeight = this.$refs.homeContainer.clientHeight;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
.carousel-container {
  width: 100%;
  height: 100%;
  transition: 500ms;

  li {
    width: 100%;
    height: 100%;
  }
}

.icon {
  font-size: 30px;
  color: @gray;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  cursor: pointer;
  @gap: 25px;
  &.icon-up {
    top: @gap;
    animation: jump-up 2s infinite;
  }
  &.icon-down {
    top: auto;
    bottom: @gap;
    animation: jump-down 2s infinite;
  }
  @jump: 5px;
  @keyframes jump-up {
    0% {
      transform: translateY(@jump);
    }
    50% {
      transform: translateY(-@jump);
    }
    100% {
      transform: translateY(@jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translateY(-@jump);
    }
    50% {
      transform: translateY(@jump);
    }
    100% {
      transform: translateY(-@jump);
    }
  }
}
.indicator {
  position: absolute;
  left: auto;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-bottom: 10px;
    background: @words;
    box-sizing: border-box;
    cursor: pointer;
    &.active {
      background: #fff;
    }
  }
}
</style>