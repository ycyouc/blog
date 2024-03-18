<template>
  <div class="message-area-container">
    <MessageForm v-on="$listeners"></MessageForm>
    <h3>
      {{ title }}
      <span>{{ subTitle }}</span>
    </h3>
    <MessageList :list="list"></MessageList>
    <div class="loading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
export default {
  components: {
    MessageForm,
    MessageList,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.loading {
  position: relative;
  height: 100px;
}
</style>