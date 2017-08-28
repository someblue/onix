<template>
  <div class="flex-column-aligner percent-100-wh">
    <div class="percent-100-w size-100-h vh-center-aligner">
      <div class="h-center-aligner">
        <a href="https://aui.github.io/art-template/docs/syntax.html" target="_blank">Template Usage</a>

        <div class="flex-row-aligner">
          <button class="size-100-w size-50-h" @click="generate()">
            Generate!
          </button>
          <div class="size-15-w"></div>
          <button class="size-100-w size-50-h" @click="copy()">
            Copy
          </button>
        </div>
      </div>
    </div>

    <div class="percent-100-w flex-remain-space h-space-between-aligner">
      <div class="percent-100-h percent-30-w rel-pos" @mouseover="overTmpl = true" @mouseleave="overTmpl = false">
        <code-editor class="percent-100-wh" :id="'template'" :content.sync="templateEditorContent">
        </code-editor>
        <i-button shape="circle" icon="more" class="abs-pos z-idx-1 top-0 right-0" v-show="overTmpl" @click="modalTmpl = true">
        </i-button>
      </div>
      <div class="percent-100-h percent-30-w rel-pos" @mouseover="overData = true" @mouseleave="overData = false">
        <code-editor class="percent-100-wh" :id="'data'" language="javascript" :content.sync="dataEditorContent">
        </code-editor>
        <i-button shape="circle" icon="more" class="abs-pos z-idx-1 top-0 right-0" v-show="overData">
        </i-button>
      </div>
      <div class="percent-100-h percent-30-w">
        <code-editor class="percent-100-wh" :id="'result'" :content.sync="resultEditorContent">
        </code-editor>
      </div>
    </div>

    <Modal v-model="modalTmpl" title="Template Setting" class-name="v-center-aligner" :styles="{top: '0px'}" width="80" @on-ok="onChooseTmpl">
      <i-select v-model="choosenTmpl" filterable autofocus>
        <Option v-for="e in tmplNames" :value="e" :key="e">{{ e }}</Option>
      </i-select>
      <div class="percent-100-wh vh-60-h">
        <code-editor :id="'test-ce'" :content.sync="choosenTmpl">
        </code-editor>
      </div>
    </Modal>
  </div>
</template>

<script>
import CodeEditor from './code-editor.vue'

import store from 'store'
import generator from 'onix-core/generator'
import copyToClipboard from 'util/clipboard.js'

export default {
  name: 'giant',
  components: {
    CodeEditor
  },
  data() {
    return {
      templateEditorContent: '',
      dataEditorContent: '',
      resultEditorContent: '',
      overTmpl: false,
      overData: false,
      modalTmpl: false,
      choosenTmpl: '',
      tmplNames: ['go-entity', 'ts-entity', 'higen-object', 'higen-property'],
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
    onChooseTmpl: function() {
      console.log('on choose tmpl')
    }
  }
}
</script>