<template>
  <div class="project-container" ref="projectContainer" v-loading="loading">
    <div class="project-item" v-for="item in data" :key="item.id">
      <a
        :href="
          item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`
        "
        class="thumb"
        :target="item.url ? '_blank' : '_self'"
      >
        <img v-lazy="item.thumb" :alt="item.name" />
      </a>
      <div class="info">
        <a
          :href="
            item.url ? item.url : `javascript:alert('该项目无法通过外网访问')`
          "
          :target="item.url ? '_blank' : '_self'"
        >
          <h2 class="title">
            {{ item.name }}
          </h2>
        </a>

        <a v-if="item.github" :href="item.github" class="github" target="_blank"
          >github</a
        >
        <p class="desc" v-for="(desc, i) in item.description" :key="i">
          {{ desc }}
        </p>
      </div>
    </div>
    <Empty v-if="data.length === 0 && !loading"></Empty>
  </div>
</template>

<script>
import { mapState } from "vuex";
import mainScroll from "@/mixins/mainScroll";
import Empty from "@/components/Empty";
export default {
  mixins: [mainScroll("projectContainer")],
  created() {
    this.$store.dispatch("project/fetchProject");
  },
  components: {
    Empty,
  },
  computed: {
    ...mapState("project", ["data", "loading"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.project-container {
  height: 100%;
  padding: 20px;
  overflow: auto;
  position: relative;
  scroll-behavior: smooth;
  .project-item {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    &:hover {
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2),
        -2px -2px 2px 1px rgba(0, 0, 0, 0.2);
      transform: scale(1.01) translate(3px, -3px);
    }
    .thumb {
      width: 200px;
      min-height: 150px;
      margin: 0 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        object-fit: cover;
      }
    }
    .info {
      flex: 1;
      h2 {
        margin: 0px;
      }
      .github {
        color: @primary;
        font-size: 14px;
      }
    }
  }
}
</style>