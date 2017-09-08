<template>
    <div class="flex-column-align pc-100-wh">
        <div class="pc-100-w size-100-h vh-center-align">
            <div class="h-center-align">
                <a href="https://aui.github.io/art-template/docs/syntax.html"
                    target="_blank">Template Usage</a>

                <div class="flex-row-align">
                    <button class="size-100-w size-50-h"
                        @click="generate()">
                        Generate!
                    </button>
                    <div class="size-15-w"></div>
                    <button class="size-100-w size-50-h"
                        @click="copy()">
                        Copy
                    </button>
                    <div class="size-15-w"></div>
                    <button class="size-100-w size-50-h"
                        @click="dragResizeZoneHorizonMode = !dragResizeZoneHorizonMode">
                        Switch Editor Direction
                    </button>
                </div>
            </div>
        </div>

        <div class="pc-100-w flex-remain-space">
            <drag-resize-zone :isHorizon="dragResizeZoneHorizonMode">
                <div slot="zone1"
                    class="pc-100-wh"
                    @mouseover="overTmpl = true"
                    @mouseleave="overTmpl = false">
                    <code-editor class="pc-100-wh"
                        :id="'template'"
                        :content.sync="templateEditorContent"
                        @update:content="onTemplateEditorContentChange">
                    </code-editor>
                    <div class="abs-pos z-idx-1 top-0 right-0 flex-row-align">
                        <i-button shape="circle"
                            icon="ios-copy"
                            v-show="overTmpl"
                            @click="openTemplateSaver = true">
                        </i-button>
                        <i-button shape="circle"
                            icon="more"
                            v-show="overTmpl"
                            @click="openTemplateSelector = true">
                        </i-button>
                    </div>
                </div>

                <div slot="zone2"
                    class="pc-100-wh"
                    @mouseover="overSchema = true"
                    @mouseleave="overSchema = false">
                    <code-editor class="pc-100-wh"
                        :id="'schema'"
                        language="javascript"
                        :content.sync="schemaEditorContent"
                        @update:content="onSchemaEditorContentChange">
                    </code-editor>
                    <div class="abs-pos z-idx-1 top-0 right-0 flex-row-align">
                        <i-button shape="circle"
                            icon="ios-copy"
                            v-show="overSchema"
                            @click="openSchemaSaver = true">
                        </i-button>
                        <i-button shape="circle"
                            icon="more"
                            v-show="overSchema"
                            @click="openSchemaSelector = true">
                        </i-button>
                    </div>
                </div>

                <div slot="zone3"
                    class="pc-100-wh">
                    <code-editor class="pc-100-wh"
                        :id="'result'"
                        :content.sync="resultEditorContent">
                    </code-editor>
                </div>
            </drag-resize-zone>

            <template-saver v-model="openTemplateSaver"
                :name="tmplName"
                :content="templateEditorContent">
            </template-saver>

            <template-selector v-model="openTemplateSelector"
                @on-select="onSelectTemplate">
            </template-selector>

            <schema-saver v-model="openSchemaSaver"
                :name="schemaName"
                :content="schemaEditorContent">
            </schema-saver>

            <schema-selector v-model="openSchemaSelector"
                @on-select="onSelectSchema">
            </schema-selector>
        </div>
    </div>
</template>

<style>
.gap {
    width: 10px;
    background-color: #dddee1;
}
</style>

<script>
import DragResizeZone from './drag-resize-zone'
import CodeEditor from './code-editor.vue'
import TemplateSaver from './template-saver.vue'
import TemplateSelector from './template-selector.vue'
import SchemaSaver from './schema-saver.vue'
import SchemaSelector from './schema-selector.vue'

import store from 'store'
import generator from 'onix-core/generator'
import copyToClipboard from 'util/clipboard.js'

export default {
    name: 'giant',
    components: {
        DragResizeZone,
        CodeEditor,
        TemplateSaver,
        TemplateSelector,
        SchemaSaver,
        SchemaSelector,
    },
    data() {
        return {
            templateEditorContent: '',
            schemaEditorContent: '',
            resultEditorContent: '',
            // template
            overTmpl: false,
            tmplName: '',
            openTemplateSelector: false,
            openTemplateSaver: false,
            // schema
            overSchema: false,
            schemaName: '',
            openSchemaSelector: false,
            openSchemaSaver: false,
            // drag resize zone
            dragResizeZoneHorizonMode: true,
        }
    },
    mounted: function() {
        this.templateEditorContent = store.get('template') || 'Hello {{ name }}!'
        this.schemaEditorContent = store.get('schema') || '{"name": "Luke"}'

        this.generate()
    },
    methods: {
        generate: function() {
            console.log('===== generating! =====')
            var schema, result

            try {
                var schemaObj = JSON.parse(this.schemaEditorContent)
                schema = schemaObj
            } catch (e) {
                console.log('parse schema error: ' + e)
                alert('parse schema error: ' + e)
                return
            }

            result = generator(this.templateEditorContent, schema)

            console.log('template: ', this.templateEditorContent)
            console.log('schema: ', schema)
            console.log('result: ', result)

            this.resultEditorContent = result
        },
        copy: function() {
            copyToClipboard(this.resultEditorContent)
        },
        onSelectTemplate: function(e) {
            this.tmplName = e.name
            this.templateEditorContent = e.content
        },
        onTemplateEditorContentChange: function(e) {
            store.set('template', e)
        },
        onSelectSchema: function(e) {
            this.schemaName = e.name
            this.schemaEditorContent = e.content
        },
        onSchemaEditorContentChange: function(e) {
            store.set('schema', e)
        },
    },
}
</script>