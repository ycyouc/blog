<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table v-loading="loading" :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <div style="margin-left: 10px">
            {{ limit * (currentPage - 1) + scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 60px"
            :src="scope.row.fullAvatar"
            fit="contain"
          />
        </template>
      </el-table-column>
      <el-table-column label="昵称" width="150" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.nickname }}</p>
        </template>
      </el-table-column>
      <el-table-column label="评论文章" width="250" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.blog.title }}</p>
        </template>
      </el-table-column>
      <el-table-column label="评论内容" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.content }}</p>
        </template>
      </el-table-column>
      <el-table-column label="评论日期" width="200" align="center">
        <template slot-scope="scope">
          <p>{{ formatDate(scope.row.createDate) }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
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
              @click="delOneComment(scope.row)"
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
      :current-page.sync="pagerCurrentPage"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<script>
import { server_URL } from '@/utils/serverURL'
import { getComment, delComment } from '@/api/comment'
import { formatDate } from '@/utils/tools'
export default {
  data() {
    return {
      data: [],
      loading: false,
      currentPage: 1,
      limit: 10,
      totalPage: 0, // 总页数
      count: 0, // 数据总条数
      pagerCurrentPage: 1 // 分页栏当前页码
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getComment(this.currentPage, this.limit).then(({ data }) => {
        this.loading = false
        this.data = data.rows
        this.count = data.total
        this.data.forEach((i) => {
          i.fullAvatar = server_URL + i.avatar
        })
      })
    },
    formatDate,
    delOneComment(row) {
      this.$confirm('确认是否删除该评论', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delComment(row.id).then(() => {
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
      this.currentPage = 1
      this.pagerCurrentPage = 1 // 重新回到第一页
      this.limit = size
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
