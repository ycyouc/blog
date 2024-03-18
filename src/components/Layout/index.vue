<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.layout-container {
  display: flex;
  height: 100%;
  width: 100%;
  .main {
    flex: 1;
    overflow: hidden;
  }
  .left,
  .right {
    flex: 0;
  }
}
</style>