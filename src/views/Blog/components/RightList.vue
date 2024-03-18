<template>
  <div class="right-list-container">
    <ul>
      <li v-for="(item, i) in list" :key="i" @click="handleClick(item)">
        <span :class="{ active: item.isSelect }">{{ item.name }}</span>
        <span
          v-if="item.aside"
          class="aside"
          :class="{ active: item.isSelect }"
          >{{ item.aside }}</span
        >
        <RightList :list="item.children" @select="handleClick"></RightList>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RightList",
  props: {
    //{name:'', isSelect:true, children:[{}]}
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      if (!item.isSelect) {
        this.$emit("select", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.right-list-container {
  color: @words;
  font-weight: normal;
  .right-list-container {
    margin-left: 1em;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      min-height: 35px;
      line-height: 35px;
      cursor: pointer;
      .active {
        color: @danger;
        font-weight: bold;
      }
      &:hover {
        color: @primary;
      }
    }
  }
}
.aside {
  font-size: 12px;
  margin-left: 1em;
  color: @gray;
}
</style>