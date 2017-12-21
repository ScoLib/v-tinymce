import tinymce from './tinymce.vue'

function plugin(Vue) {
    if (plugin.installed) return
    Vue.component('tinymce', tinymce)
}

export default plugin