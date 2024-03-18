<template>
  <div class="to-top-container" v-show="show" @click="handleClick">Top</div>
</template>

<script>
export default {
  data(){
    return {
      show: false
    }
  },
  created(){
    this.$bus.$on('mainScroll', this.handleScroll) 
  },
  methods: {
    handleScroll(dom){
      if(!dom){
        this.show = false
        return
      }
      this.show = dom.scrollTop >= 500
    },
    handleClick(){
      this.$bus.$emit('setMainScroll', 0)
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.to-top-container {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: @primary;
  z-index: 99;
  position: fixed;
  right: 50px;
  bottom: 50px;
  color: #fff;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
}
</style>