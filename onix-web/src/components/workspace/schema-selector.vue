<template>
    <Modal class-name="v-center-align"
        title="Schema Selector"
        width="80"
        :styles="{top: '0px'}"
        :value="value"
        @input="onModalValue"
        @on-ok="onSelect">
        <div class="pc-100-w vh-70-h">
            <i-select v-model="schemaName"
                filterable>
                <Option v-for="e in schemasModel.schemas"
                    :value="e.name"
                    :key="e.name">
                    {{ e.name }}
                </Option>
            </i-select>
            <div class="pc-100-wh">
                <code-editor :id="'schema-selector'"
                    :content="schemaContent">
                </code-editor>
            </div>
        </div>
    </Modal>
</template>

<script>
import CodeEditor from '@/components/code-editor/code-editor.vue'
import schemasModel from '@/model/schemas.model.js'

export default {
    name: 'schema-selector',
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
            schemasModel: schemasModel,
            schemaName: '',
            schemaContent: '',
        }
    },
    watch: {
        schemaName: function(val) {
            this.schemaContent = this.schemasModel.getSchema(val)
        },
    },
    methods: {
        onModalValue: function(e) {
            this.$emit('input', e)
        },
        onSelect: function() {
            this.$emit('on-select', { name: this.schemaName, content: this.schemaContent })
        },
    },
}
</script>
