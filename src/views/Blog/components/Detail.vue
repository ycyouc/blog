<template>
  <Layout>
    <div v-loading="isLoading" class="blog-detail" ref="blogDetail">
      <BlogDetail :blog="data" v-if="data"></BlogDetail>
      <BlogComment v-if="!isLoading"></BlogComment>
    </div>
    <template #right>
      <div v-loading="isLoading" class="blog-toc">
        <BlogTOC :toc="data.toc" v-if="data"></BlogTOC>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogTOC from "./BlogTOC";
import BlogDetail from "./BlogDetail";
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import BlogComment from "./BlogComment";
import { getSingleBlog } from "@/api/blog";
import { titleController } from "@/utils";

export default {
  components: {
    Layout,
    BlogTOC,
    BlogDetail,
    BlogComment,
  },
  mixins: [fetchData(null), mainScroll("blogDetail")],

  methods: {
    async getData() {
      const resp = await getSingleBlog();
      if (!resp) {
        this.$router.push("/404");
        return;
      }
      titleController.setRouterTitle(resp.title);
      return resp;
    },
  },
  updated() {
    let hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style lang="less" scoped>
.blog-detail {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.blog-toc {
  width: 300px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>