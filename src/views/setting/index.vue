<template>
  <div class="app-container">
    <div class="block">网站信息</div>
    <div class="block2">网站标题</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.siteTitle" :disabled="isDisabled" />
    </div>
    <div class="block2">邮箱</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.mail" :disabled="isDisabled" />
    </div>
    <div class="block2">备案号</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.icp" :disabled="isDisabled" />
    </div>
    <el-divider />
    <div class="block">网站头像信息</div>
    <div style="margin-bottom: 15px">
      <el-image
        v-if="isDisabled"
        style="width: 178px; height: 178px"
        :src="form.fullAvatar"
      />
      <ImgUploader v-else v-model="form.avatar" />
    </div>
    <el-divider />
    <div class="block">网址图标信息</div>
    <div class="block2">网址图标地址</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input
        v-model="form.favicon"
        placeholder="请输入图片地址"
        :disabled="isDisabled"
      />
    </div>
    <div class="block2">网址图标预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        v-if="isDisabled"
        style="width: 178px; height: 178px"
        :src="form.favicon"
      />
      <ImgUploader v-else v-model="form.favicon" />
    </div>
    <el-divider />
    <div class="block">github 信息</div>
    <div class="block2">github 名字</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.githubName" :disabled="isDisabled" />
    </div>
    <div class="block2">github 地址</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.github" :disabled="isDisabled" />
    </div>
    <el-divider />
    <div class="block">QQ 信息</div>
    <div class="block2">QQ 号码</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.qq" :disabled="isDisabled" />
    </div>
    <div class="block2">QQ 二维码图片预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        v-if="isDisabled"
        style="width: 178px; height: 178px"
        :src="form.fullqqQrCode"
      />
      <ImgUploader v-else v-model="form.qqQrCode" />
    </div>
    <el-divider />
    <div class="block">微信信息</div>
    <div class="block2">微信号</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.weixin" :disabled="isDisabled" />
    </div>
    <div class="block2">微信二维码图片预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        v-if="isDisabled"
        style="width: 178px; height: 178px"
        :src="form.fullweixinQrCode"
      />
      <ImgUploader v-else v-model="form.weixinQrCode" />
    </div>
    <el-divider />
    <el-button type="primary" @click="editPanelHandle">{{
      btnContent
    }}</el-button>
  </div>
</template>

<script>
import { getSetting, putSetting } from '@/api/setting'
import { server_URL } from '@/utils/serverURL'
import ImgUploader from '@/components/ImgUploader'
export default {
  components: {
    ImgUploader
  },
  data() {
    return {
      form: {
        avatar: '',
        favicon: '',
        github: '',
        githubName: '',
        icp: '',
        id: '',
        mail: '',
        qq: '',
        qqQrCode: '',
        siteTitle: '',
        weixin: '',
        weixinQrCode: ''
      },
      isDisabled: true,
      btnContent: '进入编辑模式'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getSetting().then(({ data }) => {
        this.form = {
          ...data,
          fullAvatar: server_URL + data.avatar,
          fullqqQrCode: server_URL + data.qqQrCode,
          fullweixinQrCode: server_URL + data.weixinQrCode
        }
      })
    },
    editPanelHandle() {
      if (this.btnContent === '进入编辑模式') {
        this.btnContent = '完成编辑'
        this.isDisabled = !this.isDisabled
      } else {
        let isValid = true
        for (const key in this.form) {
          if (!key) {
            isValid = false
            return
          }
        }
        if (isValid) {
          // 验证通过
          this.btnContent = '进入编辑模式'
          this.isDisabled = !this.isDisabled
          putSetting(this.form).then(() => {
            this.fetchData()
            this.$message.success('修改成功')
          })
        } else {
          // 验证失败
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
  font-size: 20px;
}
.block2 {
  margin: 15px 0;
  font-size: 14px;
}
</style>
