import logo from '@/assets/loading.svg'
import styles from './loading.module.less'

// 得到el中loading效果的img元素
function getLoadingImage(el) {
    return el.querySelector("img[data-role=loading]");
}

function createLoadingImg() {
    const img = document.createElement("img");
    img.dataset.role = "loading";
    img.src = logo;
    img.className = styles.loading;
    return img;
}
export default function (el, binding) {
    const curImg = getLoadingImage(el)
    if (binding.value) {
        if (!curImg) {
            const img = createLoadingImg();
            el.appendChild(img);
        }
    } else {
        if (curImg) {
            curImg.remove();
        }
    }
}