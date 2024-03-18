<template>
  <div class="app-container">
    <!-- 项目标题 -->
    <div class="block">项目标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.name" placeholder="项目标题" />
    </div>
    <!-- 项目描述 -->
    <div class="block">项目描述</div>
    <el-input
      v-model="form.description"
      type="textarea"
      rows="6"
      placeholder="请输入项目描述"
    />
    <!-- 项目链接 -->
    <div class="block">项目链接</div>
    <el-input v-model="form.url" placeholder="项目链接" />
    <!-- github地址 -->
    <div class="block">github地址</div>
    <el-input v-model="form.github" placeholder="github地址" />
    <!-- 预览图 -->
    <ImgUploader v-model="form.thumb" title="预览图" />
    <!-- 选择分类 -->
    <div class="block">排序等级</div>
    <el-select v-model="form.order" :placeholder="form.order.toString()">
      <el-option label="1" value="1" />
      <el-option label="2" value="2" />
      <el-option label="3" value="3" />
      <el-option label="4" value="4" />
      <el-option label="5" value="5" />
    </el-select>

    <!-- 发布按钮 -->
    <div style="margin: 15px 0">
      <el-button type="primary" @click="addProjectHandle">发布项目</el-button>
    </div>
  </div>
</template>

<script>
import ImgUploader from '@/components/ImgUploader'
import { addProject } from '@/api/project'
export default {
  components: {
    ImgUploader
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        thumb: '',
        order: 1,
        url: '',
        github: ''
      }
    }
  },
  methods: {
    addProjectHandle() {
      const obj = {
        ...this.form
      }
      obj.description = this.form.description.split(';')
      obj.order = parseInt(this.form.order)
      // 添加项目
      if (obj.name && obj.description && obj.url && obj.github) {
        addProject(obj).then(() => {
          this.$message.success('文章发布成功')
          this.$router.push('/project/projectList')
        })
      } else {
        this.$message.error('请填写所有内容')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
}
</style>
