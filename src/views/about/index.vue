<template>
  <div class="app-container">
    <div class="block">关于我</div>
    <el-input v-model="url" placeholder="请输入内容" :disabled="isDisabled" />
    <el-button type="primary" style="margin-top: 15px" @click="clickHandle">{{
      btnContent
    }}</el-button>
  </div>
</template>

<script>
import { getAbout, postAbout } from '@/api/about'
export default {
  data() {
    return {
      url: '',
      isDisabled: true,
      btnContent: '编辑'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getAbout().then(({ data }) => {
        this.loading = true
        this.url = data
      })
    },
    clickHandle() {
      if (this.btnContent === '编辑') {
        // 需要编辑内容
        this.isDisabled = !this.isDisabled
        this.btnContent = '完成'
      } else {
        // 内容编辑已完成，更新内容并发请求更新地址
        if (this.url) {
          this.isDisabled = !this.isDisabled
          this.btnContent = '编辑'
          postAbout({ url: this.url }).then(() => {
            this.$message.success('修改成功')
          })
        } else {
          this.$message({
            message: '输入框不能为空',
            type: 'warning'
          })
        }
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
