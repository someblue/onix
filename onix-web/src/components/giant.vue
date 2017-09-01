<template>
  <div class="flex-column-aligner percent-100-wh">
    <div class="percent-100-w size-100-h vh-center-aligner">
      <div class="h-center-aligner">
        <a href="https://aui.github.io/art-template/docs/syntax.html"
          target="_blank">Template Usage</a>

        <div class="flex-row-aligner">
          <button class="size-100-w size-50-h"
            @click="generate()">
            Generate!
          </button>
          <div class="size-15-w"></div>
          <button class="size-100-w size-50-h"
            @click="copy()">
            Copy
          </button>
        </div>
      </div>
    </div>

    <div class="percent-100-w flex-remain-space flex-row-aligner"
      ref="editorContainer"
      @mousemove="draging"
      @mouseup="endDrag"
      @mouseleave="endDrag">
      <div class="percent-100-h rel-pos"
        ref="editor1"
        :style="editor1WidthStyle"
        @mouseover="overTmpl = true"
        @mouseleave="overTmpl = false">
        <code-editor class="percent-100-wh"
          :id="'template'"
          :content.sync="templateEditorContent"
          @update:content="onTemplateEditorContentChange">
        </code-editor>
        <div class="abs-pos z-idx-1 top-0 right-0 flex-row-aligner">
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

      <div class="percent-100-h gap"
        @mousedown="startDrag($event, 1)">
      </div>

      <div class="percent-100-h rel-pos"
        :style="editor2WidthStyle"
        ref="editor2"
        @mouseover="overSchema = true"
        @mouseleave="overSchema = false">
        <code-editor class="percent-100-wh"
          :id="'schema'"
          language="javascript"
          :content.sync="schemaEditorContent"
          @update:content="onSchemaEditorContentChange">
        </code-editor>
        <div class="abs-pos z-idx-1 top-0 right-0 flex-row-aligner">
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

      <div class="percent-100-h gap"
        @mousedown="startDrag($event, 2)">
      </div>

      <div class="percent-100-h"
        :style="editor3WidthStyle"
        ref="editor3">
        <code-editor class="percent-100-wh"
          :id="'result'"
          :content.sync="resultEditorContent">
        </code-editor>
      </div>
    </div>

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
</template>

<style>
.gap {
  width: 10px;
  background-color: #dddee1;
}
</style>

<script>
import CodeEditor from './code-editor.vue'
import TemplateSaver from './template-saver.vue'
import TemplateSelector from './template-selector.vue'
import SchemaSaver from './schema-saver.vue'
import SchemaSelector from './schema-selector.vue'

import store from 'store'
import lodash from 'lodash'
import generator from 'onix-core/generator'
import copyToClipboard from 'util/clipboard.js'

export default {
  name: 'giant',
  components: {
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

      // editor zone drag line
      isDraging: false,
      dragingGapIdx: 0,
      lastX: 0,
      editorContainerWidth: 0,
      gap1X: 0,
      gap2X: 0,
      gapWidth: 10,
    }
  },
  computed: {
    gapWidthStyle: function() {
      return {
        width: this.gapWidth + 'px',
      }
    },
    editor1WidthStyle: function() {
      return {
        width: this.gap1X + 'px',
      }
    },
    editor2WidthStyle: function() {
      return {
        width: (this.gap2X - (this.gap1X + this.gapWidth)) + 'px',
      }
    },
    editor3WidthStyle: function() {
      return {
        width: (this.editorContainerWidth - (this.gap2X + this.gapWidth)) + 'px',
      }
    },
  },
  mounted: function() {
    this.templateEditorContent = store.get('template') || 'Hello {{ name }}!'
    this.schemaEditorContent = store.get('schema') || '{"name": "Luke"}'

    this.generate()

    this.editorContainerWidth = this.$refs.editorContainer.clientWidth
    this.gap1X = this.editorContainerWidth * 1 / 3;
    this.gap2X = this.editorContainerWidth * 2 / 3;
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

    startDrag: function(e, gapIdx) {
      this.isDraging = true
      this.lastX = e.clientX
      this.dragingGapIdx = gapIdx
    },
    draging: function(e) {
      if (this.dragingGapIdx) {
        var dx = e.clientX - this.lastX
        this.lastX = e.clientX
        if (this.dragingGapIdx === 1) {
          this.gap1X = lodash.clamp(
            this.gap1X + dx,
            0,
            this.gap2X - this.gapWidth)
        }
        if (this.dragingGapIdx === 2) {
          this.gap2X = lodash.clamp(
            this.gap2X + dx,
            this.gap1X + this.gapWidth,
            this.editorContainerWidth - this.gapWidth)
        }
      }
    },
    endDrag: function(e) {
      if (this.isDraging) {
        this.isDraging = false
        this.dragingGapIdx = 0
      }
    },
  }
}
</script>