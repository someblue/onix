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
      <div class="percent-100-h percent-30-w">
        <div id="template" class="percent-100-wh"></div>
      </div>
      <div class="percent-100-h percent-30-w">
        <div id="data" class="percent-100-wh"></div>
      </div>
      <div class="percent-100-h percent-30-w">
        <div id="result" class="percent-100-wh"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ace from 'brace'
import store from 'store'
import generator from 'onix-core/generator'
import copyToClipboard from 'util/clipboard.js'

import 'brace/mode/javascript'
import 'brace/mode/plain_text'
import 'brace/theme/tomorrow'

export default {
  name: 'giant',
  data() {
    return {
      msg: 'nothing',
      templateEditor: null,
      dataEditor: null,
      resultEditor: null,
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