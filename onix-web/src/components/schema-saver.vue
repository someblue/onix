<template>
  <Modal :value="value"
    @input="onModalValue"
    title="Schema Saver"
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
import schemasModel from '@/model/schemas.model.js'

export default {
  name: 'schema-saver',
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
      schemasModel.setSchema(this.tmplName ? this.tmplName : 'unnamed', this.content)
    },
  },
}
</script>
