<template>
  <div class="blog-list-container">
    <!-- 表格 -->
    <el-table v-loading="loading" :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <div style="margin-left: 10px">
            {{ limit * (currentPage - 1) + scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文章名称" width="250" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客图预览"
            width="230"
            trigger="hover"
            content=""
          >
            <a
              slot="reference"
              target="_blank"
              href="#"
              @click.prevent="openBlogLink(scope.row)"
              >{{ scope.row.title }}</a
            >
            <el-image
              style="width: 200px; height: 200px"
              :src="scope.row.fullThumb"
              :preview-src-list="srcList"
              fit="contain"
            />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="浏览数" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.scanNumber }}</p>
        </template>
      </el-table-column>
      <el-table-column label="评论量" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.commentNumber }}</p>
        </template>
      </el-table-column>
      <el-table-column label="所属分类" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.category ? scope.row.category.name : '未分类' }}</p>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" align="center">
        <template slot-scope="scope">
          <p>{{ formatDate(scope.row.createDate) }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="1000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBlogListInfo(scope.row)"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="1000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="delOneBlog(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next, total, ->, sizes, jumper"
      :total="count"
      :page-size="limit"
      :page-sizes="[3, 5, 10, 20]"
      :current-page="currentPage"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<script>
import { getBlogs, deleteBlog } from '@/api/blog'
import { formatDate } from '@/utils/tools'
import { server_URL, client_URL } from '@/utils/serverURL'
export default {
  data() {
    return {
      data: [],
      srcList: [],
      form: {},
      loading: false,
      currentPage: 1,
      limit: 5,
      totalPage: 0, // 总页数
      count: 0 // 数据总条数
      // pagerCurrentPage: 1 // 分页栏当前页码
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getBlogs(this.currentPage, this.limit).then(({ data }) => {
        this.loading = false
        this.count = data.total
        for (const item of data.rows) {
          item['fullThumb'] = server_URL + item.thumb
          this.srcList.push(item['fullThumb'])
        }
        this.data = data.rows
        this.totalPage = Math.ceil(this.count / this.limit)
        // 删除文章时可能触发
        if (this.totalPage < this.currentPage) {
          this.totalPage = this.currentPage
          this.fetchData()
        }
      })
    },
    formatDate(timestamp) {
      return formatDate(timestamp)
    },
    openBlogLink(row) {
      window.open(client_URL + `/blog/${row.category.id}`)
    },
    // 修改文章
    editBlogListInfo(row) {
      this.$router.push(`/blog/editBlog/${row.id}`)
    },
    // 确认修改
    confirmEditInfo() {},
    // 删除文章
    delOneBlog(row) {
      this.$confirm(
        '删除该文章会将该文章下的评论一并删除，是否继续？',
        '是否删除此篇文章',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          deleteBlog(row.id).then(() => {
            this.fetchData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    currentChange(page) {
      this.currentPage = page
      this.fetchData()
    },
    sizeChange(size) {
      this.limit = size
      this.fetchData()
    }
  }
}
</script>

<style>
.blog-list-container {
  padding: 20px;
}
</style>
