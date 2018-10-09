<template>
    <div class="load-box">
        <div class="loading">
            <img src="/static/loading.gif"/>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {};
        }
    };
</script>

<style scoped>
    .load-box {
        min-height: 250px;
        position: relative;
    }

    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -12.5px;
        margin-left: -12.5px;
        width: 25px;
        height: 25px;
        z-index: 999;
    }
</style>
