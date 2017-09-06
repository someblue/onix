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
            zoneContainerWidth: 0,
            gapWidth: 10,

            gapPos0: 0.33,
            gapPos1: 0.66,
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
                width: (this.gapPos0 * this.zoneContainerWidth) + 'px',
            }
        },
        zone2WidthStyle: function() {
            return {
                width: ((this.gapPos1 - this.gapPos0) * this.zoneContainerWidth - this.gapWidth) + 'px',
            }
        },
        zone3WidthStyle: function() {
            return {
                width: ((1 - this.gapPos1) * this.zoneContainerWidth - this.gapWidth) + 'px',
            }
        },
    },
    mounted: function() {
        this.zoneContainerWidth = this.$refs.zoneContainer.clientWidth
        window.addEventListener('resize', this.resizing)
    },
    beforeDestroy: function() {
        window.removeEventListener('resize', this.resizing)
    },
    methods: {
        resizing: function() {
            var w = this.$refs.zoneContainer.clientWidth
            if (w === this.zoneContainerWidth) {
                return
            }
            this.zoneContainerWidth = w
        },
        startDrag: function(e, gapIdx) {
            this.isDraging = true
            this.dragingGapIdx = gapIdx
        },
        draging: function(e) {
            if (this.dragingGapIdx) {
                var offsetX = e.pageX - this.$refs.zoneContainer.offsetLeft
                offsetX -= this.gapWidth / 2; // for middle align mouse on the gap
                if (this.dragingGapIdx === 1) {
                    this.gapPos0 = 1.0 * lodash.clamp(
                        offsetX,
                        0,
                        this.gapPos1 * this.zoneContainerWidth - this.gapWidth,
                    ) / this.zoneContainerWidth
                }
                if (this.dragingGapIdx === 2) {
                    this.gapPos1 = 1.0 * lodash.clamp(
                        offsetX,
                        this.gapPos0 * this.zoneContainerWidth + this.gapWidth,
                        this.zoneContainerWidth - this.gapWidth,
                    ) / this.zoneContainerWidth
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
