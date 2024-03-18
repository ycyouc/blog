<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
const classMap = {
  home: "icon-zhuye",
  success: "icon-zhengquequeding",
  error: "icon-cuowu",
  close: "icon-guanbi",
  warn: "icon-jinggao",
  info: "icon-xinxi",
  blog: "icon-blog1",
  code: "icon-icon_code",
  about: "icon-set_about_hov",
  weixin: "icon-weixin",
  mail: "icon-email",
  github: "icon-github-fill",
  qq: "icon-QQ-circle-fill",
  arrowUp: "icon-xiangshang",
  arrowDown: "icon-xiangxia",
  empty: "icon-empty",
  chat: "icon-liuyan",
};
export const types = Object.keys(classMap)
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    fontClass: function() {
        return classMap[this.type]
    }
  }
};
</script>

<style scoped>
@import "//at.alicdn.com/t/c/font_4349992_t62ryox046f.css";
.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>