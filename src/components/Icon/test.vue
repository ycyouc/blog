<template>
  <div>
    <div class="test-container">
      <div class="item" v-for="(k, i) in types" :key="i">
        <Icon :type="k" />
        <label>{{ k }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import Icon, { types } from "./";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      types,
    };
  },
};
</script>

<style lang="less" scoped>
.test-container {
  display: flex;
  justify-content: center;
  margin: 30px auto;
  width: 580px;
  flex-wrap: wrap;
}
.item {
  margin: 1em;
  text-align: center;
}
.icon-container {
  display: block;
}
</style>