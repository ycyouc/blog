<template>
  <div class="menu-container">
    <div class="menu-info">
      <router-link
        :to="{ name: item.name }"
        :exact="item.exact"
        class="menu-item"
        v-for="item in menuItems"
        :key="item.link"
      >
        <div class="icon">
          <Icon :type="item.type" />
        </div>
        <span class="content">{{ item.content }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      menuItems: [
        {
          type: "home",
          content: "首页",
          name: "Home",
          exact: true,
        },
        {
          type: "blog",
          content: "文章",
          name: "Blog",
          exact: false, //激活状态是否要精确匹配
        },
        {
          type: "about",
          content: "关于我",
          name: "About",
          exact: true,
        },
        {
          type: "code",
          content: "项目&效果",
          name: "Project",
          exact: true,
        },
        {
          type: "chat",
          content: "留言板",
          name: "Message",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/global.less";
@import "~@/styles/mixin.less";

.menu-container {
  padding: 24px 0;
  color: @gray;
  .menu-info {
    .menu-item {
      padding: 5px 50px;
      font-size: 30px;
      line-height: 30px;
      list-style: none;
      font-size: 14px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
      .content {
        margin-left: 8px;
      }
    }
  }
}
.router-link-active {
  background: darken(@words, 2%);
  .menu-item {
    color: #fff;
  }
}
</style>