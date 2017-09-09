<template>
    <o-layout>
        <o-layout-header slot="header" title="Onix">
            <div slot="center" class="flex-row-align">
                <ButtonGroup>
                    <i-button type="ghost" class="ghost-btn-font" @click="generate()">
                        Generate!
                    </i-button>
                    <i-button type="ghost" class="ghost-btn-font" @click="copy()">
                        Copy
                    </i-button>
                    <i-button type="ghost" class="ghost-btn-font"
                        @click="dragResizeZoneHorizonMode = !dragResizeZoneHorizonMode">
                        SwitchEditor
                    </i-button>
                </ButtonGroup>
            </div>
            <div slot="right" class="flex-row-align">
                <a href="https://aui.github.io/art-template/docs/syntax.html"
                    target="_blank">TemplateUsage</a>
            </div>
        </o-layout-header>

        <div class="pc-100-wh" slot="body">
            <drag-resize-zone :isHorizon="dragResizeZoneHorizonMode">
                <div slot="zone1"
                    class="pc-100-wh"
                    @mouseover="overTmpl = true"
                    @mouseleave="overTmpl = false">
                    <code-editor class="pc-100-wh"
                        :id="'template'"
                        :content.sync="templateEditorContent"
                        @update:content="onTemplateEditorContentChange">
                        <code-editor-header slot="header" title="Template">
                            <ButtonGroup>
                                <i-button 
                                    icon="ios-copy"
                                    size="small"
                                    type="ghost"
                                    class="ghost-btn-font"
                                    @click="openTemplateSaver = true">
                                </i-button>
                                <i-button
                                    icon="more"
                                    size="small"
                                    type="ghost"
                                    class="ghost-btn-font"
                                    @click="openTemplateSelector = true">
                                </i-button>
                            </ButtonGroup>
                        </code-editor-header>
                    </code-editor>
                </div>

                <div slot="zone2"
                    class="pc-100-wh">
                    <code-editor class="pc-100-wh"
                        :id="'schema'"
                        language="javascript"
                        :content.sync="schemaEditorContent"
                        @update:content="onSchemaEditorContentChange">
                        <code-editor-header slot="header" title="Schema">
                            <ButtonGroup>
                                <i-button 
                                    icon="ios-copy"
                                    size="small"
                                    type="ghost"
                                    class="ghost-btn-font"
                                    @click="openSchemaSaver = true">
                                </i-button>
                                <i-button
                                    icon="more"
                                    size="small"
                                    type="ghost"
                                    class="ghost-btn-font"
                                    @click="openSchemaSelector = true">
                                </i-button>
                            </ButtonGroup>
                        </code-editor-header>
                    </code-editor>
                </div>

                <div slot="zone3"
                    class="pc-100-wh">
                    <code-editor class="pc-100-wh"
                        :id="'result'"
                        :content.sync="resultEditorContent">
                        <code-editor-header slot="header" title="Code">
                        </code-editor-header>
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

        <o-layout-footer slot="footer">
        </o-layout-footer>
    </o-layout>
</template>

<style>
.ghost-btn-font {
    color: #ffffff;
}
.ghost-btn-font:hover {
    color: #57a3f3;
}
.ghost-btn-font:active {
    color: #2b85e4;
}
</style>

<script>
import OLayout from '@/components/layout/o-layout'
import OLayoutHeader from '@/components/layout/o-layout-header'
import OLayoutFooter from '@/components/layout/o-layout-footer'
import DragResizeZone from '@/components/drag-resize-zone/drag-resize-zone'
import CodeEditor from '@/components/code-editor/code-editor'
import CodeEditorHeader from '@/components/code-editor/code-editor-header'
import TemplateSaver from './template-saver'
import TemplateSelector from './template-selector'
import SchemaSaver from './schema-saver'
import SchemaSelector from './schema-selector'

import store from 'store'
import generator from 'onix-core/generator'
import copyToClipboard from 'util/clipboard.js'

export default {
    name: 'workspace',
    components: {
        'o-layout': OLayout,
        'o-layout-header': OLayoutHeader,
        'o-layout-footer': OLayoutFooter,
        'drag-resize-zone': DragResizeZone,
        'code-editor': CodeEditor,
        'code-editor-header': CodeEditorHeader,
        'template-saver': TemplateSaver,
        'template-selector': TemplateSelector,
        'schema-saver': SchemaSaver,
        'schema-selector': SchemaSelector,
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