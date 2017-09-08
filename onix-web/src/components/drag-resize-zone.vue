<template>
    <div class="pc-100-wh flex-row-align"
        :class="{ 'flex-row-align': isHorizon, 'flex-column-align': !isHorizon }"
        ref="zoneContainer"
        @mousemove="draging"
        @mouseup="endDrag"
        @mouseleave="endDrag">

        <div class="pc-100-h rel-pos"
            ref="zone1"
            :style="zone1WidthStyle">
            <slot name="zone1"></slot>
        </div>

        <div class="gap col-resize-cursor"
            :style="gapSizeStyle"
            @mousedown="startDrag($event, 1)">
        </div>

        <div class="pc-100-h rel-pos"
            :style="zone2WidthStyle"
            ref="zone2">
            <slot name="zone2"></slot>
        </div>

        <div class="gap col-resize-cursor"
            :style="gapSizeStyle"
            @mousedown="startDrag($event, 2)">
        </div>

        <div class="pc-100-h"
            :style="zone3WidthStyle"
            ref="zone3">
            <slot name="zone3"></slot>
        </div>

    </div>
</template>

<style>
.gap {
    background-color: #dddee1;
}
</style>

<script>
import lodash from 'lodash'

export default {
    name: 'drag-resize-zone',
    props: {
        isHorizon: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            // zone zone drag line
            isDraging: false,
            dragingGapIdx: 0,
            zoneContainerWidth: 0,
            zoneContainerHeight: 0,
            gapSize: 10,

            gapPos0: 0.33,
            gapPos1: 0.66,
        }
    },
    computed: {
        gapSizeStyle: function() {
            console.log('gap: ', this.zoneContainerHeight);
            if (this.isHorizon) {
                return {
                    width: this.gapSize + 'px',
                    height: this.zoneContainerHeight + 'px',
                }
            } else {
                return {
                    width: this.zoneContainerWidth + 'px',
                    height: this.gapSize + 'px',
                }
            }
        },
        zone1WidthStyle: function() {
            if (this.isHorizon) {
                return {
                    width: (this.gapPos0 * this.zoneContainerWidth) + 'px',
                    height: this.zoneContainerHeight + 'px',
                }
            } else {
                return {
                    width: this.zoneContainerWidth + 'px',
                    height: (this.gapPos0 * this.zoneContainerHeight) + 'px',
                }
            }
        },
        zone2WidthStyle: function() {
            if (this.isHorizon) {
                return {
                    width: ((this.gapPos1 - this.gapPos0) * this.zoneContainerWidth - this.gapSize) + 'px',
                    height: this.zoneContainerHeight + 'px',
                }
            } else {
                return {
                    width: this.zoneContainerWidth + 'px',
                    height: ((this.gapPos1 - this.gapPos0) * this.zoneContainerHeight - this.gapSize) + 'px',
                }
            }
        },
        zone3WidthStyle: function() {
            if (this.isHorizon) {
                return {
                    width: ((1 - this.gapPos1) * this.zoneContainerWidth - this.gapSize) + 'px',
                    height: this.zoneContainerHeight + 'px',
                }
            } else {
                return {
                    width: this.zoneContainerWidth + 'px',
                    height: ((1 - this.gapPos1) * this.zoneContainerHeight - this.gapSize) + 'px',
                }
            }
        },
    },
    mounted: function() {
        window.addEventListener('resize', this.resizing)

        // hack the zone container client height return 0
        // should be replace by some better solution
        setTimeout(() => {
            this.zoneContainerWidth = this.$refs.zoneContainer.clientWidth
            this.zoneContainerHeight = this.$refs.zoneContainer.clientHeight
        }, 1);
    },
    beforeDestroy: function() {
        window.removeEventListener('resize', this.resizing)
    },
    methods: {
        resizing: function() {
            var w = this.$refs.zoneContainer.clientWidth
            var h = this.$refs.zoneContainer.clientHeight
            if (w === this.zoneContainerWidth && h === this.zoneContainerHeight) {
                return
            }
            this.zoneContainerWidth = w
            this.zoneContainerHeight = h
        },
        startDrag: function(e, gapIdx) {
            this.isDraging = true
            this.dragingGapIdx = gapIdx
        },
        draging: function(e) {
            if (this.dragingGapIdx) {

                var offset = this.isHorizon ?
                    e.pageX - this.$refs.zoneContainer.offsetLeft :
                    e.pageY - this.$refs.zoneContainer.offsetTop

                var containerSize = this.isHorizon ?
                    this.zoneContainerWidth :
                    this.zoneContainerHeight

                offset -= this.gapSize / 2; // for middle align mouse on the gap
                if (this.dragingGapIdx === 1) {
                    this.gapPos0 = 1.0 * lodash.clamp(
                        offset,
                        0,
                        this.gapPos1 * containerSize - this.gapSize,
                    ) / containerSize
                }
                if (this.dragingGapIdx === 2) {
                    this.gapPos1 = 1.0 * lodash.clamp(
                        offset,
                        this.gapPos0 * containerSize + this.gapSize,
                        containerSize - this.gapSize,
                    ) / containerSize
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
