<template>
    <Modal :value="value"
        @input="onModalValue"
        title="Template Saver"
        @on-ok="onSave">
        <i-form>
            <FormItem label="Name">
                <i-input v-model="tmplName"
                    autofocus>
                </i-input>
            </FormItem>
        </i-form>
    </Modal>
</template>

<script>
import templatesModel from '@/model/templates.model.js'

export default {
    name: 'template-saver',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            tmplName: this.name,
        }
    },
    methods: {
        onModalValue: function(e) {
            this.$emit('input', e)
        },
        onSave: function() {
            templatesModel.setTemplate(this.tmplName ? this.tmplName : 'unnamed', this.content)
        },
    },
}
</script>
