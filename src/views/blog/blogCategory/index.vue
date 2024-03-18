<template>
  <div class="app-container">
    <!-- 输入框 -->
    <div style="margin-top: 15px">
      <el-input v-model="input" placeholder="请输入内容" class="blog-add-input">
        <el-select slot="prepend" v-model="select" placeholder="请选择">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="4" value="4" />
          <el-option label="5" value="5" />
        </el-select>
      </el-input>
      <el-button
        type="primary"
        style="margin-left: 10px"
        @click="addBlogTypeHandle"
        >添加</el-button
      >
    </div>
    <!-- 列表 -->
    <el-table v-loading="loading" :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <div style="margin-left: 10px">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="博客类别" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="文章数量" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.articleCount }}</p>
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
              @click="editBlogTypeHandle(scope.row)"
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
              @click="delBlogTypeHandle(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog
      title="请编辑该分类信息"
      :visible.sync="dialogFormVisible"
      top="10vh"
      width="500px"
    >
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" :placeholder="form.order.toString()">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
            <el-option label="5" value="5" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType,
  addBlogType,
  editBlogType,
  delBlogType,
  getOneBlogType
} from '@/api/blogType'
export default {
  data() {
    return {
      data: [],
      loading: false,
      input: '',
      select: '1',
      form: { name: '', order: '' },
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getBlogType().then((res) => {
        this.loading = false
        this.data = res.data
      })
    },
    // 添加文章分类
    addBlogTypeHandle() {
      if (!this.input.trim()) {
        this.$message({
          type: 'error',
          message: '分类名称不能为空'
        })
        return
      }
      addBlogType({ name: this.input, order: this.select }).then(() => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: '类别添加成功'
        })
      })
    },
    // 编辑文章分类
    editBlogTypeHandle({ id }) {
      getOneBlogType(id).then((res) => {
        this.form = { ...res.data }
        this.dialogFormVisible = true
      })
    },
    // 删除文章分类
    delBlogTypeHandle({ id }) {
      this.$confirm(
        '删除该分类后，该分类下的所有文章将变为未分类，是否继续？',
        '是否删除该文章分类',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          delBlogType(id).then(() => {
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
    // 确认修改文章分类
    confirmEditInfo() {
      editBlogType({ id: this.form.id, data: this.form }).then((res) => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: '更新分类信息成功'
        })
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-add-input {
  width: 400px;
  margin-bottom: 20px;
}
</style>
