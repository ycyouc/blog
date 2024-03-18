<template>
    <div class="container">
        <Menu />
    </div>
</template>

<script>
import Menu from './'
    export default {
        components: {
            Menu
        }
    }
</script>

<style lang="less" scoped>
@import "~@/styles/global.less";
@import "~@/styles/var.less";
.container{
    width: 400px;
    height: 600px;
    background: @dark;
    margin: 50px auto;
}
</style>