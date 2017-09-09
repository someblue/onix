<template>
    <div class="menu-h menu-bg menu-font menu-padding pc-100-w v-center-align h-space-between-align">
        <div class="title-font flex-1 flex-row-align">
            {{ title }}
        </div>

        <div class="flex-1 h-center-align">
            <slot name="center"></slot>
        </div>

        <div class="flex-1 row-reverse-align flex-row-reverse-align">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style scoped>
.menu-h {
    height: 60px;
}

.menu-bg {
    background-color: #495060;
}

.menu-font {
    color: #fff;
}

.menu-padding {
    padding-left: 20px;
    padding-right: 20px;
}

.title-font {
    font-size: 28px;
    font-weight: bold;
}
</style>

<script>
export default {
    name: 'o-layout-header',
    props: {
        title: {
            type: String,
            default: null,
        },
    },
    data() {
        return {

        }
    }
}
</script>
