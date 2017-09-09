<template>
    <o-layout>
        <o-layout-header slot="header" title="Onix">
            <div slot="center">
                Center
            </div>
            <div slot="right">
                Right
            </div>
        </o-layout-header>

        <div slot="body">
            nothing to say.
        </div>

        <o-layout-footer slot="footer">
            <div slot="left">
                Left
            </div>
            <div slot="right">
                Right
            </div>
        </o-layout-footer>
    </o-layout>
</template>

<script>
import OLayoutComp from './o-layout'
import OLayoutHeaderComp from './o-layout-header'
import OLayoutFooterComp from './o-layout-footer'

export default {
    name: 'demo',
    components: {
        'o-layout': OLayoutComp,
        'o-layout-header': OLayoutHeaderComp,
        'o-layout-footer': OLayoutFooterComp,
    },
    data() {
        return {

        }
    },
}
</script>
