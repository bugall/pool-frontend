<template>
    <div class="container">
        About us
    </div>
</template>

<script>
    import filters from '../filters';
    import { mapActions } from 'vuex';

    export default {
        data () {
            return {
                loading: true
            };
        },
        filters,
        computed: { },

        mounted () {
        },

        destroyed () {
        },

        watch: { },
        methods: {
            ...mapActions({
                setKeywords: 'setKeywords'
            })
        },
        components: { }
    };
</script>

<style scoped>