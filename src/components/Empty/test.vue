<template>
  <div class="container">
    <Empty />
  </div>
</template>

<script>
import Empty from "./";
export default {
    components: {
        Empty
    }
};
</script>

<style lang="less" scoped>
.container {
    width: 1000px;
    height: 500px;
    margin: 0 auto;
    border: 2px solid;
}
</style>