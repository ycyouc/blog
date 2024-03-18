<template>
  <div
    class="blog-list-container"
    v-loading="isLoading"
    ref="blogListContainer"
  >
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <router-link
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
            ><img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </router-link>
        </div>
        <div class="main">
          <router-link
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
            ><h2>{{ item.title }}</h2>
          </router-link>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论：{{ item.commentNumber }}</span>
            <router-link
              :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category.id,
                },
              }"
              >{{ item.category.name }}</router-link
            >
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading"></Empty>
    <!-- 分页放到这里 -->
    <Pagination
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="changePage"
    ></Pagination>
  </div>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import { getBlog } from "@/api/blog";
import { formatDate } from "@/utils";
import Pagination from "@/components/Pagination";
import Empty from "@/components/Empty";

export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("blogListContainer")],
  data() {
    return {};
  },
  components: {
    Pagination,
    Empty,
  },
  computed: {
    routeInfo() {
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      const categoryId = +this.$route.params.categoryId || -1;
      return {
        page,
        limit,
        categoryId,
      };
    },
  },
  methods: {
    formatDate,
    async getData() {
      return await getBlog();
    },
    changePage(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      // /blog/page=1&limit=10      /blog/cate/3/page=1&limit=10
      if (this.routeInfo.categoryId === -1) {
        //没有分类
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    async $route(newVal) {
      this.isLoading = true;
      this.$refs.blogListContainer.scrollTop = 0;
      this.data = await getBlog(
        newVal.query.page,
        newVal.query.limit,
        newVal.params.categoryId
      );
      this.isLoading = false;
    },
  },
};
</script>


<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
