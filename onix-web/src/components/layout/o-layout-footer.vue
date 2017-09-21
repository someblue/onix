<template>
    <div class="ft-h pc-100-w ft-bg ft-font ft-padding v-center-align h-space-between-align of-hide">
        <div>
            <slot name="left"></slot>
        </div>
        <div>
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style scoped>
.ft-h {
    height: 20px;
}

.ft-bg {
    background-color: #495060;
}

.ft-font {
    color: #ffffff;
}

.ft-padding {
    padding-left: 10px;
    padding-right: 10px;
}
</style>

<script>
export default {
    name: 'o-layout-footer',
    data() {
        return {

        }
    }
}
</script>

