<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      :title="`留言板`"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      @submit="handleSubmit"
      :isListLoading="isLoading"
    ></MessageArea>
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import { getMessage, postMessage } from "@/api/message";
import MessageArea from "@/components/MessageArea";
export default {
  mixins: [fetchData({ total: "0", rows: [] }), mainScroll('messageContainer')],
  components: {
    MessageArea,
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async getData() {
      return await getMessage(this.page, this.limit);
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
      const result = await postMessage({
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
.message-container {
  width: 100%;
  height: 100%;
  padding: 25px 0;
  box-sizing: border-box;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>