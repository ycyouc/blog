<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期:{{ formatDate(blog.createDate) }}</span>
      <span>浏览:{{ blog.scanNumber }}</span>
      <span><a href="#blog-comment-container">评论:{{ blog.commentNumber }}</a></span>
      <span
        ><router-link :to="{
          name: 'CategoryBlog',
          params: {
            categoryId: blog.category.id
          }
        }">{{ blog.category.name }}</router-link></span
      >
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import formatDate from "@/utils/formatDate";
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";
export default {
  props: ["blog"],
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";


.aside {
  color: @gray;
  margin-bottom: 30px;
  font-size: 12px;
  span,a {
    margin-right: 15px;
  }
  
}
.markdown-body {
  margin: 2em 0;
}
</style>