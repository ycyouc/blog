import getComponentRootDom from './getComponentRootDom'
import Icon from '@/components/Icon'
import styles from "./showMessage.module.less"
/**
 * 
 * @param {String} content 消息内容
 * @param {String} type 消息类型 info error success warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中，不传则页面正中
 */
export default function (options) {
    const { content, type = "info", duration = 2000, container = document.body, callback } = options
    const div = document.createElement('div')
    const iconDom = getComponentRootDom(Icon, { type })
    div.className = `${styles.message} ${styles[`message-${type}`]}`
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><span>${content}</span>`

    //容器的position是否改过
    if (container) {
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative'
        }
    }

    container.appendChild(div)

    div.clientWidth;    //引发reflow
    div.style.opacity = 1
    div.style.transform = `translate(-50%, -50%)`

    setTimeout(() => {
        div.style.opacity = 0
        div.style.transform = `translate(-50%, -50%) translateY(-25px)`
        div.addEventListener('transitionend', function () {
            div.remove()
            callback && callback()
        }, { once: true })
    }, duration);
}