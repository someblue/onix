<template>
    <Modal class-name="v-center-align"
        title="Template Selector"
        width="80"
        :styles="{top: '0px'}"
        :value="value"
        @input="onModalValue"
        @on-ok="onSelect">
        <div class="pc-100-w vh-70-h">
            <i-select v-model="tmplName"
                filterable>
                <Option v-for="e in templatesModel.templates"
                    :value="e.name"
                    :key="e.name">
                    {{ e.name }}
                </Option>
            </i-select>
            <div class="pc-100-wh">
                <code-editor :id="'template-selector'"
                    :content="tmplContent">
                </code-editor>
            </div>
        </div>
    </Modal>
</template>

<script>
import CodeEditor from '@/components/code-editor/code-editor.vue'
import templatesModel from '@/model/templates.model.js'

export default {
    name: 'template-selector',
    components: {
        CodeEditor,
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            templatesModel: templatesModel,
            tmplName: '',
            tmplContent: '',
        }
    },
    watch: {
        tmplName: function(val) {
            this.tmplContent = this.templatesModel.getTemplate(val)
        },
    },
    methods: {
        onModalValue: function(e) {
            this.$emit('input', e)
        },
        onSelect: function() {
            this.$emit('on-select', { name: this.tmplName, content: this.tmplContent })
        },
    },
}
</script>
