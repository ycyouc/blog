<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table v-loading="loading" :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <div style="margin-left: 10px">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="250" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="项目描述" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.description }}</p>
        </template>
      </el-table-column>
      <el-table-column label="预览图" align="center" width="250">
        <template slot-scope="scope">
          <el-image
            style="width: 150px"
            :src="scope.row.fullThumb"
            :preview-src-list="srcList"
            fit="contain"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="github"
            placement="top"
            :hide-after="1000"
          >
            <el-button
              type="primary"
              icon="iconfont icon-github"
              class="github"
              circle
              size="mini"
              @click="goToGithub(scope.row.github)"
            />
          </el-tooltip>
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
              @click="editProjectInfo(scope.row)"
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
    <!-- 编辑项目信息弹框 -->
    <el-dialog
      title="请编辑信息"
      :visible.sync="dialogFormVisible"
      top="10vh"
      width="90%"
    >
      <el-form :model="form">
        <el-form-item label="项目标题">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="项目描述（每一项描述用英文分号分隔）">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="github地址">
          <el-input v-model="form.github" />
        </el-form-item>
        <el-form-item label="缩略图">
          <ImgUploader v-model="form.thumb" />
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
import { getProject, editProject, delProject } from '@/api/project'
import { server_URL } from '@/utils/serverURL'
import ImgUploader from '@/components/ImgUploader'
export default {
  components: {
    ImgUploader
  },
  data() {
    return {
      data: [],
      loading: false,
      srcList: [],
      form: {
        name: '',
        description: '',
        thumb: '',
        order: 1,
        url: '',
        github: ''
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getProject().then(({ data }) => {
        this.loading = false
        data.forEach((i) => {
          i.description = i.description.join(';')
          i.fullThumb = server_URL + i.thumb
          this.srcList.push(i.fullThumb)
        })
        this.data = data
      })
    },
    // 跳转到github
    goToGithub(url) {
      window.open(url)
    },
    // 编辑项目信息
    editProjectInfo(row) {
      this.form = { ...row }
      this.dialogFormVisible = true
    },
    // 确认编辑项目信息
    confirmEditInfo() {
      const obj = { ...this.form }
      obj.description = this.form.description.split(';')
      obj.order = parseInt(this.form.order)
      editProject({ id: obj.id, data: obj }).then(() => {
        this.dialogFormVisible = false
        this.fetchData()
        this.$message.success('数据修改成功')
      })
    },
    // 删除项目
    delOneBlog(row) {
      this.$confirm('确认是否删除该项目', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delProject(row.id).then(() => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.github {
  background-color: rgb(163, 163, 163);
  border: 1px solid rgb(163, 163, 163);
}
</style>
