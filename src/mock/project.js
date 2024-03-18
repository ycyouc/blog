import Mock from 'mockjs'

Mock.mock('/api/project', 'get', {
    code: 0,
    msg: "",
    'data|5-10': [
        {
            id: '@guid',
            name: "@ctitle(1,10)",
            'url|1': ["https://www.baidu.com", null],
            'github|1': ["https://www.baidu.com", null],
            'description|1-4': ["@cparagraph(1,5)"],
            thumb: "@image(300x250, @color, #fff, @natural)",
            'order|+1': 1
        },
    ]
})