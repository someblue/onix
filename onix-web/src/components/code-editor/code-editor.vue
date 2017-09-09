<template>
    <div class="pc-100-wh flex-column-align">
        <slot name="header"></slot>
        <div :id="id" class="flex-1"></div>
        <slot name="footer"></slot>
    </div>
</template>

<script>
import ace from 'brace'
import 'brace/mode/javascript'
import 'brace/mode/plain_text'
import 'brace/theme/tomorrow'
import 'brace/theme/clouds_midnight'
import 'brace/theme/idle_fingers'
import 'brace/theme/merbivore_soft'
import 'brace/theme/monokai'
import 'brace/theme/pastel_on_dark'
import 'brace/theme/tomorrow_night'
import 'brace/theme/tomorrow_night_eighties'

// TODO: add readonly option
export default {
    name: 'code-editor',
    props: {
        id: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            default: '',
        },
        language: {
            type: String,
            default: 'plain_text',
        },
    },
    data() {
        return {
            editor: null,
            currentContent: this.content,
        }
    },
    watch: {
        content: function(val) {
            this.setCurrentContent(val)
        },
    },
    mounted: function() {
        this.editor = this.setupEditor(this.id, this.language)
        this.bindContentProperty(this.editor)
    },
    methods: {
        setCurrentContent: function(val) {
            if (val === this.currentContent) {
                return
            }
            this.currentContent = val
            this.editor.setValue(val, 1)
        },
        setupEditor: function(id, language) {
            var editor = ace.edit(id)
            editor.setTheme('ace/theme/tomorrow')
            editor.getSession().setMode(`ace/mode/${language}`)
            editor.setOptions({
                maxLines: Infinity
            });
            editor.getSession().on('change', (e) => {
                this.currentContent = this.editor.getValue()
                this.$emit('update:content', this.currentContent)
            })
            return editor
        },
        bindContentProperty: function(obj) {
            Object.defineProperty(obj, 'content', {
                get: function() { return this.getValue() },
                set: function(v) { this.setValue(v, 1) },
            })
        },
    },
}
</script>
