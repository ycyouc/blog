<template>
  <div class="site-aside-container" v-if="data">
    <Avatar :url="data.avatar" />
    <h1 class="title">{{ data.siteTitle }}</h1>
    <Menu />
    <Contact />
    <p class="footer">{{ data.icp }}</p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import Contact from "./Contact";
import Menu from "./Menu";
import { mapState } from "vuex";
export default {
  components: {
    Avatar,
    Contact,
    Menu,
  },
  computed: {
    ...mapState("settings", ["data"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.site-aside-container {
  width: 250px;
  height: 100%;
  box-sizing: border-box;
  background: @dark;
  overflow-x: hidden;
  overflow-y: auto;
}
.avatar-container {
  padding: 20px 0;
  margin: 0 auto;
}
.footer {
  text-align: center;
  font-size: 12px;
}
.title {
  margin: 0;
  font-size: 1.2em;
  color: #fff;
  text-align: center;
}
</style>