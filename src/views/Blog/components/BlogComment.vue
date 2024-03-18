<template>
  <div class="blog-comment-container" id="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      @submit="handleSubmit"
      :isListLoading="isLoading"
    ></MessageArea>
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import { getComments, postComment } from "@/api/blog";

export default {
  mixins: [fetchData({ total: "0", rows: [] })],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async getData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    handleScroll(dom) {
      //正在加载中
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100;
      const desc = Math.abs(
        dom.clientHeight + dom.scrollTop - dom.scrollHeight
      );
      if (desc <= range) {
        this.fetchMore();
      }
    },
    async fetchMore() {
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const res = await this.getData();
      this.data.total = res.total;
      this.data.rows = this.data.rows.concat(res.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      const result = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      this.data.rows.unshift(result);
      this.data.total++;
      callback("评论成功");
    },
  },
};
</script>

<style lang="less" scoped>
.blog-comment-container {
  margin: 30px 0;
}
</style>