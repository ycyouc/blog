<template>
  <div class="test-container">
    <Layout>
      <template v-slot:left>
        <div class="left">left</div>
      </template>
      <template v-slot>
        <div class="main">mainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmainmain</div>
      </template>
      <template v-slot:right>
        <div class="right">right</div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./";
export default {
  components: {
    Layout,
  },
};
</script>

<style lang="less" scoped>
.test-container {
  width: 80%;
  height: 600px;
  border: 2px solid;
  margin: 0 auto;
  white-space: nowrap;
  .left {
    width: 200px;
    height: 100%;
    background: orange;
  }
  .main {
    width: 100%;
    height: 100%;
    background: yellow;
  }
  .right {
    width: 150px;
    height: 100%;
    background: lightblue;
  }
}
</style>