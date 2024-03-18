import { getSettings } from '@/api/settings'
import { titleController } from '@/utils'
export default {
    namespaced: true,
    state: {
        loading: true,
        data: []
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setData(state, payload) {
            state.data = payload
        }
    },
    actions: {
        async fetchSettings(ctx) {
            ctx.commit('setLoading', true)
            const resp = await getSettings()
            ctx.commit('setData', resp)
            ctx.commit('setLoading', false)
            titleController.setStoreTitle(resp.siteTitle)
            if(resp.favicon) {
                let link = document.querySelector('link[rel="shortcut icon"]')
                if(link) {
                    return
                }
                link = document.createElement("link")
                link.rel = 'shortcut icon'
                link.href = resp.favicon
                link.type = 'images/x-icon'
                document.querySelector('head').appendChild(link)
            }
        }
    }
}