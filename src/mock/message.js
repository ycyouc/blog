import Mock from 'mockjs'
import qs from 'querystring'

Mock.mock(/^\/api\/message(\?.+)?$/, 'get', function (options) {
    const params = qs.parse(options.url)
    return Mock.mock({
        code: 0,
        msg: "",
        data: {
            total: 52, //总数
            [`rows|${params.limit}`]: [ // 当前页列表数据
                {
                    id: "@guid",
                    nickname: "@cname",
                    content: "@cparagraph(1, 10)",
                    createDate: Date.now(),
                    blog: {
                        'id|0-10': 0,
                        title: "@ctitle(5,50)"
                    },
                    "avatar|1": [
                        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
                        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
                        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
                        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
                    ],
                }
            ]
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    })
})

//提交评论
Mock.mock('/api/message', 'post', {
    code: 0,
    msg: "",
    data: {
        id: "@guid",
        nickname: "@cname",
        content: "@cparagraph(1, 10)",
        createDate: Date.now(),
        "avatar|1": [
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
        ],
    },
})