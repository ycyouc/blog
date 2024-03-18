<template>
  <div class="blog-category-container">
    <h2>文章分类</h2>
    <div class="list">
      <RightList :list="list" @select="handleSelect"></RightList>
    </div>
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import RightList from "./components/RightList";
import { getBlogCategory } from "@/api/blog";
export default {
  mixins: [fetchData([])],
  components: {
    RightList,
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    limit() {
      return +this.$route.query.limit || 10;
    },
    list() {
      const total = this.data.reduce((pre, cur) => pre + cur.articleCount, 0);
      const result = [
        { id: -1, name: "全部文章", articleCount: total },
        ...this.data,
      ];
      return result.map((it) => {
        return {
          ...it,
          isSelect: this.categoryId === it.id,
          aside: `${it.articleCount}篇`,
        };
      });
    },
  },
  methods: {
    async getData() {
      return await getBlogCategory();
    },
    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.limit,
      };
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blog-category-container {
  width: 300px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
  .list {
    margin-left: 20px;
    font-size: 14px;
  }
}
</style>