import Mock from 'mockjs'

Mock.mock('/api/setting', 'get', {
    "code": 0, // 错误码
    "msg": "", // 错误消息
    "data": {
        avatar: "http://mdrs.yuanjin.tech/img/20201031141350.jpg",
        siteTitle: "我的个人空间",
        github: "https://github.com/ycyouc",
        qq: "782644594",
        qqQrCode: "https://cgying-blog-1317783295.cos.ap-shanghai.myqcloud.com/asset/IMG_4520.JPG",
        weixin: "ktsh_022",
        weixinQrCode: "https://cgying-blog-1317783295.cos.ap-shanghai.myqcloud.com/asset/IMG_4519.JPG",
        mail: "cgying99@qq.com",
        icp: "黑ICP备17001719号",
        githubName: "ycyouc",
        favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f",
    }
})