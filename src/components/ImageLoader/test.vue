<template>
  <div class="container">
    <ImageLoader :src="src"
    :placeholder="placeholder" @load="handle" :duration="5000"/>
  </div>
</template>

<script>
import ImageLoader from "./";
export default {
    components: {
        ImageLoader
    },
    data() {
        return {
            src:"https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304",
            placeholder:"https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
        }
    },
    methods:{
        handle(){
            console.log(123)
        }
    }
};
</script>

<style lang="less" scoped>
.container {
    width: 1200px;
    height: 700px;
    margin: 0 auto;
}
</style>