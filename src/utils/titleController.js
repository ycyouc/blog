
let routerTitle = '', storeTitle = ''
function setTitle() {
    if (!routerTitle && !storeTitle) {
        document.title = 'loading...'
    } else if (routerTitle && !storeTitle) {
        document.title = routerTitle
    } else if (!routerTitle && storeTitle) {
        document.title = storeTitle
    } else {
        document.title = `${routerTitle}-${storeTitle}`
    }
}

export default {
    setRouterTitle(title) {
        routerTitle = title
        setTitle()
    },
    setStoreTitle(title) {
        storeTitle = title
        setTitle()
    }
}