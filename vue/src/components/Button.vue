<template>
    <div :style="data.style.container" class="w_button_container">
        <button :style="data.style.btn">{{data.context}}</button>
    </div>
</template>

<script>
export default {
    name: 'WButton',
    props: {
        data: {
            type: Object,
            default() {
                
            }
        }
    }
}
</script>

<style>

</style>