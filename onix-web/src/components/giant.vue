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
        <div id="template" class="percent-100-wh">
        </div>
        <i-button shape="circle" icon="more" class="abs-pos z-idx-1 top-0 right-0" v-show="overTmpl" @click="modalTmpl = true">
        </i-button>
      </div>
      <div class="percent-100-h percent-30-w rel-pos" @mouseover="overData = true" @mouseleave="overData = false">
        <div id="data" class="percent-100-wh">
        </div>
        <i-button shape="circle" icon="more" class="abs-pos z-idx-1 top-0 right-0" v-show="overData">
        </i-button>
      </div>
      <div class="percent-100-h percent-30-w">
        <div id="result" class="percent-100-wh"></div>
      </div>
    </div>

    <Modal v-model="modalTmpl" title="Template Setting">
      <i-select v-model="choosenTmpl" filterable>
        <Option v-for="e in tmplNames" :value="e" :key="e">{{ e }}</Option>
      </i-select>
      <div style="width:300px;height:300px;">
        <code-editor :id="'test-ce'" :content.sync="choosenTmpl">
        </code-editor>
      </div>
    </Modal>
  </div>
</template>

<script>
import CodeEditor from './code-editor.vue'

import ace from 'brace'
import store from 'store'
import generator from 'onix-core/generator'
import copyToClipboard from 'util/clipboard.js'

import 'brace/mode/javascript'
import 'brace/mode/plain_text'
import 'brace/theme/tomorrow'

export default {
  name: 'giant',
  components: {
    CodeEditor
  },
  data() {
    return {
      msg: 'nothing',
      templateEditor: null,
      dataEditor: null,
      resultEditor: null,
      overTmpl: false,
      overData: false,
      modalTmpl: false,
      choosenTmpl: '',
      tmplNames: ['go-entity', 'ts-entity', 'higen-object', 'higen-property'],
    }
  },
  computed: {
    resultContent: function() {
      return this.resultEditor ? this.resultEditor.content : ''
    }
  },
  mounted: function() {
    this.templateEditor = this.setupEditor('template', 'plain_text')
    this.dataEditor = this.setupEditor('data', 'javascript')
    this.resultEditor = this.setupEditor('result', 'plain_text')

    this.bindContentProperty(this.templateEditor)
    this.bindContentProperty(this.dataEditor)
    this.bindContentProperty(this.resultEditor)

    this.templateEditor.content = store.get('template') || 'Hello {{ name }}!'
    this.dataEditor.content = store.get('data') || '{"name": "Luke"}'

    this.generate()
  },
  methods: {
    setupEditor: function(id, language) {
      var editor = ace.edit(id)
      editor.setTheme('ace/theme/tomorrow')
      editor.getSession().setMode(`ace/mode/${language}`)
      editor.getSession().on('change', function(e) {
        store.set(id, editor.getValue())
      })
      return editor
    },
    bindContentProperty: function(obj) {
      Object.defineProperty(obj, "content", {
        get: function() { return this.getValue() },
        set: function(v) { this.setValue(v, 1) },
      })
    },
    generate: function() {
      console.log('===== generating! =====')
      var data, result

      try {
        var dataObj = JSON.parse(this.dataEditor.content)
        data = dataObj
      } catch (e) {
        console.log('parse data error: ' + e)
        alert('parse data error: ' + e)
        return
      }

      result = generator(this.templateEditor.content, data)

      console.log('template: ', this.templateEditor.content)
      console.log('data: ', data)
      console.log('result: ', result)

      this.resultEditor.content = result
    },
    copy: function() {
      copyToClipboard(this.resultEditor.content)
    },
  }
}
</script>