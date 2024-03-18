import "nprogress/nprogress.css"
import NotFound from "@/views/NotFound"
import { start, done, configure } from "nprogress"

configure({
    trickleSpeed: 20,
    showSpinner: false,
})

function delay(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, duration)
    })
}

function getPageComponent(pageCompResolver) {
    return async () => {
        start()
        if (process.env.NODE_ENV === 'development') {
            delay(2000)
        }
        const comp = await pageCompResolver()
        done()
        return comp
    }
}

export default [
    {
        name: 'Home', path: '/', component: getPageComponent(() => import('@/views/Home')),
        meta: {
            title: '首页'
        }
    },
    {
        name: 'Blog', path: '/blog', component: getPageComponent(() => import('@/views/Blog')),
        meta: {
            title: '文章'
        }
    },
    {
        name: 'CategoryBlog', path: '/blog/cate/:categoryId', component: getPageComponent(() => import('@/views/Blog')),
        meta: {
            title: '文章'
        }
    },
    {
        name: 'BlogDetail', path: '/blog/:id', component: getPageComponent(() => import('@/views/Blog/components/Detail')),
        meta: {
            title: '文章详情'
        }
    },
    {
        name: 'About', path: '/about', component: getPageComponent(() => import('@/views/About')),
        meta: {
            title: '关于我'
        }
    },
    {
        name: 'Project', path: '/project', component: getPageComponent(() => import('@/views/Project')),
        meta: {
            title: '项目&效果'
        }
    },
    {
        name: 'Message', path: '/message', component: getPageComponent(() => import('@/views/Message')),
        meta: {
            title: '留言板'
        }
    },
    {
        name: 'NotFound', path: '*', component: NotFound
    }
]
