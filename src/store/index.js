import Vue from 'vue'
import Vuex from 'vuex'
import banner from './banner'
import settings from './settings'
import about from './about'
import project from './project'
if(!window.Vuex) {
    Vue.use(Vuex)
}

export default new Vuex.Store({
    modules: {
        banner,
        settings,
        about,
        project
    },
    strict: true,
})
