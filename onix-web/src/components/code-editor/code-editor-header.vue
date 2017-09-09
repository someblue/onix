<template>
    <div class="pc-100-w comp h-space-between-align v-center-align">
        <div class="title-font">
            {{ title }}
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.comp {
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #5F6573;
    color: #ffffff;
}

.title-font {
    font-size: 18px;
    font-weight: bold;
}
</style>

<script>
export default {
    name: 'code-editor-header',
    props: {
        title: {
            type: String,
        }
    },
    data() {
        return {

        }
    }
}
</script>
