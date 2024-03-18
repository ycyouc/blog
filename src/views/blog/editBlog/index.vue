<template>
  <div class="app-container">
    <!-- 文章标题 -->
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px">
      <!--input输入-->
      <el-input v-model="form.title" placeholder="请输入文章标题" />
    </div>
    <!-- 文章编辑 -->
    <div class="block">文章编辑</div>
    <editor
      ref="toastuiEditor"
      :initialValue="form.htmlContent"
      height="600px"
      :options="editorOptions"
    />
    <!-- 文章描述 -->
    <div class="block">文章描述</div>
    <el-input
      v-model="form.description"
      type="textarea"
      rows="6"
      placeholder="请输入文章描述"
    />
    <!-- 文章头图 -->
    <ImgUploader v-model="form.thumb" title="文章头图" />
    <!-- 选择分类 -->
    <div class="block">选择分类</div>
    <el-select
      v-model="form.select"
      placeholder="请选择文章分类"
      @change="changeHandle"
    >
      <el-option
        v-for="type in blogType"
        :key="type.id"
        :label="type.name"
        :value="type.id"
      />
    </el-select>

    <!-- 发布按钮 -->
    <div style="margin: 15px 0">
      <el-button type="primary" @click="editBlogHandle">确认修改</el-button>
    </div>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
import ImgUploader from '@/components/ImgUploader'
import { getBlogType } from '@/api/blogType'
import { getOneBlog, editBlog } from '@/api/blog'
export default {
  components: {
    editor: Editor,
    ImgUploader
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        thumb: '',
        select: ''
      },
      blogType: [],
      editorOptions: {
        language: 'zh-CN',
      }
    }
  },
  created() {
    getBlogType().then((res) => {
      this.blogType = res.data
    })
    getOneBlog(this.$route.params.id).then(({ data }) => {
      console.log(data)
      this.form = data
      this.form.select = data.category === null ? '' : data.categoryId //**注意该id */
      this.$refs.toastuiEditor.invoke('setHTML', data.htmlContent)
    })
  },
  methods: {
    editBlogHandle() {
      const html = this.$refs.toastuiEditor.invoke('getHTML')
      const markdown = this.$refs.toastuiEditor.invoke('getMarkdown')
      const obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown
      }

      // 发布文章
      if (obj.title && obj.description && obj.htmlContent && obj.categoryId) {
        editBlog({ id: this.form.id, data: obj }).then(() => {
          this.$message.success('文章修改成功')
          this.$router.push('/blog/blogList')
        })
      } else {
        this.$message.error('请填写所有内容')
      }
    },
    // 强制更新
    changeHandle() {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
}
</style>
