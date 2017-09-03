<template>
  <div class="percent-100-wh flex-row-aligner"
    ref="zoneContainer"
    @mousemove="draging"
    @mouseup="endDrag"
    @mouseleave="endDrag">

    <div class="percent-100-h rel-pos"
      ref="zone1"
      :style="zone1WidthStyle">
      <slot name="zone1"></slot>
    </div>

    <div class="percent-100-h gap col-resize-cursor"
      @mousedown="startDrag($event, 1)">
    </div>

    <div class="percent-100-h rel-pos"
      :style="zone2WidthStyle"
      ref="zone2">
      <slot name="zone2"></slot>
    </div>

    <div class="percent-100-h gap col-resize-cursor"
      @mousedown="startDrag($event, 2)">
    </div>

    <div class="percent-100-h"
      :style="zone3WidthStyle"
      ref="zone3">
      <slot name="zone3"></slot>
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
import lodash from 'lodash'

export default {
  name: 'drag-resize-zone',
  data() {
    return {
      // zone zone drag line
      isDraging: false,
      dragingGapIdx: 0,
      lastX: 0,
      zoneContainerWidth: 0,
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
    zone1WidthStyle: function() {
      return {
        width: this.gap1X + 'px',
      }
    },
    zone2WidthStyle: function() {
      return {
        width: (this.gap2X - (this.gap1X + this.gapWidth)) + 'px',
      }
    },
    zone3WidthStyle: function() {
      return {
        width: (this.zoneContainerWidth - (this.gap2X + this.gapWidth)) + 'px',
      }
    },
  },
  mounted: function() {
    this.zoneContainerWidth = this.$refs.zoneContainer.clientWidth
    this.gap1X = this.zoneContainerWidth * 1 / 3;
    this.gap2X = this.zoneContainerWidth * 2 / 3;
  },
  methods: {
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
            this.zoneContainerWidth - this.gapWidth)
        }
      }
    },
    endDrag: function(e) {
      if (this.isDraging) {
        this.isDraging = false
        this.dragingGapIdx = 0
      }
    },
  },
}
</script>
