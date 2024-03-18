<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect"></RightList>
  </div>
</template>

<script>
import RightList from "./RightList";
import { debounce } from "@/utils";
export default {
  props: {
    toc: {
      type: Array,
    },
  },
  components: {
    RightList,
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  computed: {
    tocWithSelect() {
      const getTOC = (toc = []) => {
        return toc.map((v) => ({
          ...v,
          isSelect: this.activeAnchor === v.anchor,
          children: getTOC(v.children),
        }));
      };
      return getTOC(this.toc);
    },
    doms() {
      const doms = [];
      const addDoms = (toc) => {
        for (const i of toc) {
          doms.push(document.getElementById(i.anchor));
          if (i.children && i.children.length) {
            addDoms(i.children);
          }
        }
      };
      addDoms(this.toc);
      return doms;
    },
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    setSelect(scrollDom) {
      if(!scrollDom) {
        return
      }
      this.activeAnchor = "";
      const edge = 200;
      const doms = this.doms;
      for (const dom of doms) {
        const top = dom.getBoundingClientRect().top;
        if (top < edge && top >= 0) {
          //标题在规定范围中间
          this.activeAnchor = dom.id;
          return;
        } else if (top > edge) {
          //标题在规定范围下面
          return;
        } else {
          this.activeAnchor = dom.id;
        }
      }
    },
  },
  created() {
    this.setDebounceSelect = debounce(this.setSelect, 50);
    this.$bus.$on("mainScroll", this.setDebounceSelect);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.setDebounceSelect);
  },
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
    margin-bottom: 20px;
  }
}
</style>