<template>
  <div class="app-container">
    <el-table :data="data" style="width: 100%" border>
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          <div style="margin-left: 10px">{{ scope.$index + 1 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="150" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.title }}</p>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <p>{{ scope.row.description }}</p>
        </template>
      </el-table-column>
      <el-table-column label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.midImgBase"
            fit="fill"
          />
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.bigImgBase"
            fit="fill"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBannerInfo(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="10vh">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <ImgUploader v-model="form.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页大图">
              <ImgUploader v-model="form.bigImg" /> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanners, setBanner } from '@/api/banner'
import { server_URL } from '@/utils/serverURL'
import ImgUploader from '@/components/ImgUploader'
export default {
  components: {
    ImgUploader
  },
  data() {
    return {
      data: [],
      dialogFormVisible: false,
      form: {
        title: '',
        id: '',
        description: '',
        midImg: '',
        bigImg: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getBanners().then((res) => {
        const result = res.data
        for (const item of result) {
          item['midImgBase'] = server_URL + item.midImg
          item['bigImgBase'] = server_URL + item.bigImg
        }
        this.data = result
      })
    },
    editBannerInfo(row) {
      this.form = { ...row }
      this.dialogFormVisible = true
    },
    confirmEditInfo() {
      const newData = [...this.data]
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].id === this.form.id) {
          newData[i] = this.form
        }
      }
      setBanner(newData).then((res) => {
        this.dialogFormVisible = false
        this.$message.success('修改成功')
        this.fetchData()
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
