import eventBus from '@/eventBus'
import { debounce } from "@/utils"
import defaultGIF from '@/assets/default.gif'

let imglist = []

function setSingleImg(img) {
    //是否已经处理过了
    img.dom.src = defaultGIF
    //是否在可视范围内
    const rect = img.dom.getBoundingClientRect()
    const height = rect.height || 150
    const clientHeight = document.documentElement.clientHeight
    if (rect.top >= -height && rect.top <= clientHeight) {
        //在视口范围内
        // console.log('在视口范围内', img.dom)
        const tempImg = new Image()
        tempImg.onload = function () {
            img.dom.src = img.src
        }
        tempImg.src = img.src
        imglist = imglist.filter(v => v !== img)
    }
}

function setImages() {
    //在指定范围内，懒加载图片
    for (const img of imglist) {
        //处理单张图片
        setSingleImg(img)
    }

}

function handleScroll() {
    setImages()
}

eventBus.$on('mainScroll', debounce(handleScroll, 50))

export default {
    inserted(el, binding) {
        const img = {
            dom: el,
            src: binding.value
        }
        imglist.push(img)
        //立刻处理它
        setSingleImg(img)
    },
    unbind(el) {
        imglist = imglist.filter(v => v.dom !== el)
    }
}