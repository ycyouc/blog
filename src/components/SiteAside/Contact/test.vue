<template>
  <div class="container">
    <Contact src="https://cgying-blog-1317783295.cos.ap-shanghai.myqcloud.com/asset/IMG_4519.JPG" link="tencent://message/?Menu=yes&uin=782644594&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45"/>
  </div>
</template>

<script>
import Contact from './'
export default {
    components: {
        Contact
    }
};
</script>

<style lang="less" scoped>
body {
  margin: 0;
  padding: 0;
}
.container{
    width: 400px;
    height: 600px;
    background: #000;
    margin: 100px auto;
}
</style>