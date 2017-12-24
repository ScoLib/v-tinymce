<template>
    <textarea :id="id">{{ currentValue }}</textarea>
</template>

<script>
    // Import TinyMCE
    import TinyMCE from 'tinymce';

    // A theme is also required
    import 'tinymce/themes/modern/theme';

    // Any plugins you want to use has to be imported
    import 'tinymce/plugins/advlist';
    import 'tinymce/plugins/wordcount';
    import 'tinymce/plugins/autolink';
    import 'tinymce/plugins/autosave';
    import 'tinymce/plugins/charmap';
    import 'tinymce/plugins/codesample';
    import 'tinymce/plugins/contextmenu';
    import 'tinymce/plugins/emoticons';
    import 'tinymce/plugins/codesample';
    import 'tinymce/plugins/fullscreen';
    import 'tinymce/plugins/hr';
    import 'tinymce/plugins/imagetools';
    import 'tinymce/plugins/insertdatetime';
    import 'tinymce/plugins/link';
    import 'tinymce/plugins/media';
    import 'tinymce/plugins/noneditable';
    import 'tinymce/plugins/paste';
    import 'tinymce/plugins/print';
    import 'tinymce/plugins/searchreplace';
    import 'tinymce/plugins/tabfocus';
    import 'tinymce/plugins/textpattern';
    import 'tinymce/plugins/visualblocks';
    import 'tinymce/plugins/anchor';
    import 'tinymce/plugins/autoresize';
    import 'tinymce/plugins/bbcode';
    import 'tinymce/plugins/code';
    import 'tinymce/plugins/colorpicker';
    import 'tinymce/plugins/directionality';
    import 'tinymce/plugins/fullpage';
    import 'tinymce/plugins/help';
    import 'tinymce/plugins/image';
    import 'tinymce/plugins/importcss';
    import 'tinymce/plugins/legacyoutput';
    import 'tinymce/plugins/lists';
    import 'tinymce/plugins/nonbreaking';
    import 'tinymce/plugins/pagebreak';
    import 'tinymce/plugins/preview';
    import 'tinymce/plugins/save';
    import 'tinymce/plugins/spellchecker';
    import 'tinymce/plugins/table';
    import 'tinymce/plugins/textcolor';
    import 'tinymce/plugins/toc';
    import 'tinymce/plugins/visualchars';

    import 'tinymce/skins/lightgray/skin.min.css'
    import 'tinymce/skins/lightgray/content.min.css'

    import './langs/zh_CN.js'

    export default {
        name: 'vTinymce',
        props: {
            id: {
                type: String,
                required: true
            },
            value: {
                default: '',
                type: String
            },
            size: {
                default: 'basic',
                type: String
            },
            baseUrl: {
                default: '',
                type: String
            },
            plugins: {
                default: function () {
                    return [
                        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                        'searchreplace wordcount visualblocks visualchars code fullscreen',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'paste textcolor colorpicker textpattern imagetools toc help emoticons hr'
                    ];
                },
                type: Array
            },
            options: {
                default: function () {
                    return {};
                },
                type: Object|Array
            }
        },
        data() {
            return {
                currentValue: this.value,
                editor: null,
                toolbar: {
                    default: function () {
                        return [];
                    },
                    type: Array
                },
            }
        },
        created() {
            if (typeof TinyMCE === "undefined") throw new Error('TinyMCE undefined');
        },
        mounted() {
            this.init();
        },
        beforeDestroy() {
            this.editor.destroy();
        },
        watch: {
            value(val) {
                this.currentValue = val;
            },
            currentValue(val) {
                this.$emit('input', val);
            }
        },
        methods: {
            init() {
                // console.log(this);
                switch (this.size) {
                    case 'simple':
                        this.toolbar = [
                            'formatselect fontselect fontsizeselect | bold italic backcolor forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link table removeformat code'
                        ];
                        break;
                    case 'basic':
                    default:
                        this.toolbar = [
                            'bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect | searchreplace | bullist numlist | outdent indent blockquote | link unlink anchor image | undo redo | forecolor backcolor | subscript superscript | charmap emoticons | ltr rtl | visualchars visualblocks hr nonbreaking pagebreak restoredraft insertdatetime toc | table removeformat code fullscreen preview'
                        ];
                }

                TinyMCE.baseURL = this.baseUrl;

                TinyMCE.init(Object.assign({
                    selector: '#' + this.id,
                    height: 500,
                    skin: false,
                    language: 'zh_CN',
                    menubar: false,
                    // toolbar_items_size: 'small',
                    toolbar: this.toolbar,
                    plugins: this.plugins,
                    relative_urls: false,
                    convert_urls: false,
                    init_instance_callback: (editor) => {
                        this.editor = editor;
                        editor.on('KeyUp', (e) => {
                            this.currentValue = this.editor.getContent();
                        });
                        editor.on('Change', (e) => {
                            if (this.editor.getContent() !== this.currentValue) {
                                this.currentValue = this.editor.getContent();
                            }
                        });
                    }
                }, this.options));
                // console.log(TinyMCE)
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.mce-fullscreen {
        z-index: 1031;
    }
</style>
