<template>
  <div class="flex-column-align pc-100-wh">
    <!-- layout header -->
    <div>
        <slot name="header"></slot>
    </div>
    <!-- body -->
    <div class="flex-remain-space">
        <slot name="body"></slot>
    </div>

    <!-- footer -->
    <div>
        <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
    name: 'o-layout',
    data() {
        return {

        }
    },
}
</script>
