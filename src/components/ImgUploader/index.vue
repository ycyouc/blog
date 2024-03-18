<template>
  <div>
    <div class="uploader-title">{{ title }}</div>
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleImgSuccess"
      :headers="headers"
    >
      <img v-if="value" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { server_URL } from '@/utils/serverURL'
export default {
  props: ['title', 'value'],
  computed: {
    imageUrl() {
      if (this.value.startsWith('http')) {
        return this.value
      }
      return server_URL + this.value
    },
    headers() {
      return { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') }
    }
  },
  methods: {
    handleImgSuccess(resp) {
      if (!resp.code && resp.data) {
        this.$emit('input', resp.data)
      }
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style scoped>
.uploader-title {
  margin: 15px 0;
}
</style>
