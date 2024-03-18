<template>
  <div class="about-container" v-loading="loading || scripLoaded">
    <iframe
      class="about-content"
      :src="src"
      frameborder="0"
      @load="scripLoaded=false"
    ></iframe>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {
      scripLoaded: true
    }
  },
  created(){
    this.$store.dispatch('about/fetchAbout')
  },
  computed:{
    ...mapState('about',{
      src: 'data',
      loading: 'loading'
    })
  }
};
</script>

<style lang="less" scoped>
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .about-content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: block;
  }
}
</style>