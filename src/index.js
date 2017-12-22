import tinymce from './tinymce.vue'

function plugin(Vue) {
    if (plugin.installed) return
    Vue.component('vTinymce', tinymce)
}

export default plugin