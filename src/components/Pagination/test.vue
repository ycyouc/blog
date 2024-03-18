<template>
  <div>
    <Pagination :current="current" :total="total" @pageChange="changePage" />
  </div>
</template>

<script>
import Pagination from "./"

export default {
  name: "App",
  components: {
    Pagination
  },
  data(){
    return {
      current: 1,
      total: 102,
    }
  },
  methods: {
    changePage(newPage){
      this.current = newPage
    }
  }
};
</script>

<style lang="less" scoped>

</style>
