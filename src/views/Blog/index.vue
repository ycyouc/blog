<template>
  <Layout>
    <BlogList></BlogList>
    <template #right>
      <BlogCategory></BlogCategory>
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogList from "./BlogList";
import BlogCategory from "./BlogCategory";
export default {
  components: {
    Layout,
    BlogList,
    BlogCategory,
  },
};
</script>

<style lang="less" scoped>
</style>