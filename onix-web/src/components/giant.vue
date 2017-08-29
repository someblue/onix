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

    <div class="percent-100-w flex-remain-space h-space-between-aligner">
      <div class="percent-100-h percent-30-w rel-pos"
        @mouseover="overTmpl = true"
        @mouseleave="overTmpl = false">
        <code-editor class="percent-100-wh"
          :id="'template'"
          :content.sync="templateEditorContent">
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
      <div class="percent-100-h percent-30-w rel-pos"
        @mouseover="overData = true"
        @mouseleave="overData = false">
        <code-editor class="percent-100-wh"
          :id="'data'"
          language="javascript"
          :content.sync="dataEditorContent">
        </code-editor>
        <i-button shape="circle"
          icon="more"
          class="abs-pos z-idx-1 top-0 right-0"
          v-show="overData">
        </i-button>
      </div>
      <div class="percent-100-h percent-30-w">
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

  </div>
</template>

<script>
import CodeEditor from './code-editor.vue'
import TemplateSaver from './template-saver.vue'
import TemplateSelector from './template-selector.vue'

import store from 'store'
import generator from 'onix-core/generator'
import copyToClipboard from 'util/clipboard.js'

export default {
  name: 'giant',
  components: {
    CodeEditor,
    TemplateSaver,
    TemplateSelector,
  },
  data() {
    return {
      templateEditorContent: '',
      dataEditorContent: '',
      resultEditorContent: '',
      overTmpl: false,
      overData: false,
      tmplName: '',
      openTemplateSelector: false,
      openTemplateSaver: false,
    }
  },
  mounted: function() {
    this.templateEditorContent = store.get('template') || 'Hello {{ name }}!'
    this.dataEditorContent = store.get('data') || '{"name": "Luke"}'

    this.generate()
  },
  methods: {
    generate: function() {
      console.log('===== generating! =====')
      var data, result

      try {
        var dataObj = JSON.parse(this.dataEditorContent)
        data = dataObj
      } catch (e) {
        console.log('parse data error: ' + e)
        alert('parse data error: ' + e)
        return
      }

      result = generator(this.templateEditorContent, data)

      console.log('template: ', this.templateEditorContent)
      console.log('data: ', data)
      console.log('result: ', result)

      this.resultEditorContent = result
    },
    copy: function() {
      copyToClipboard(this.resultEditorContent)
    },
    onSelectTemplate: function(e) {
      console.log('on tmpl select: ', e)
      this.tmplName = e.name
      this.templateEditorContent = e.content
    }
  }
}
</script>