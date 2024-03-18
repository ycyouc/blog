<template>
  <div class="pager-container">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }">&lt;&lt;</a>
    <a @click="handleClick(current - 1)">&lt;</a>
    <div v-if="totalPage > 1">
      <a
        @click="handleClick(value)"
        :class="{ active: value === current }"
        v-for="(value, i) in numbers"
        :key="i"
        >{{ value }}</a
      >
    </div>
    <a @click="handleClick(current + 1)">&gt;</a>
    <a
      @click="handleClick(totalPage)"
      :class="{ disabled: current === totalPage }"
      >&gt;&gt;</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.limit);
    },
    min() {
      let min = Math.floor(this.current - this.visibleNumber / 2);
      min < 1 && (min = 1);
      return min;
    },
    max() {
      let max = Math.floor(this.mint + this.visibleNumber - 1);
      max > this.totalPage && (max = this.totalPage);
      return max;
    },
    numbers() {
      return new Array(this.visibleNumber).fill(this.min).map((v, i) => v + i);
    },
  },
  methods: {
    handleClick(newPage) {
      newPage < 1 && (newPage = 1);
      newPage > this.max && (newPage = this.totalPage);
      if (newPage === this.current) {
        return;
      }
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.pager-container {
  display: flex;
  justify-content: center;
  & a {
    padding: 0 5px;
    color: @primary;
    cursor: pointer;
    user-select:none;
  }
  & .disabled {
    color: @lightWords;
    cursor: not-allowed;
  }
  & .active {
    color: @words;
    font-weight: bold;
    cursor: text;
  }
}
</style>