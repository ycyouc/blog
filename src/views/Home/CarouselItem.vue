<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="getMousePosition"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" ref="img" :style="imgPosition">
      <ImageLoader
        @load="showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      ></ImageLoader>
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  components: {
    ImageLoader,
  },
  props: ["carousel"],
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, //容器大小
      innerSize: null, //图片大小
      mouseX: 0,
      mouseY: 0,
    };
  },
  mounted() {
    //宽度从0设为auto无法产生动画效果
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSize);
  },
  beforeDestroy(){
    window.removeEventListener("resize", this.setSize)
  },
  computed: {
    imgPosition() {
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      const extraWidth = this.innerSize.width - this.containerSize.width;
      const extraHeight = this.innerSize.height - this.containerSize.height;
      const left = (-this.mouseX / this.innerSize.width) * extraWidth;
      const top = (-this.mouseY / this.innerSize.height) * extraHeight;
      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  methods: {
    showWords() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;

      this.$refs.title.clientWidth; //reflow
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;

      this.$refs.desc.clientWidth; //reflow
      this.$refs.desc.style.transition = "2s 1s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.img.clientWidth,
        height: this.$refs.img.clientHeight,
      };
    },
    getMousePosition(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.x;
      this.mouseY = e.clientY - rect.y;
    },
    handleMouseLeave(){
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.carousel-img {
  width: 110%;
  height: 110%;
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.2s;
}
.title,
.desc {
  position: absolute;
  left: 30px;
  letter-spacing: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
  opacity: 0;
}
.title {
  top: calc(50% - 40px);
  font-size: 2em;
}
.desc {
  top: calc(50% + 20px);
  font-size: 1.2em;
  color: lighten(@gray, 20%);
}
</style>