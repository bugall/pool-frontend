<template>
    <div id="app">
        <v-header></v-header>
        <el-row>
            <el-col class="main-container" :span="20" :offset="2">
                <router-view></router-view>
            </el-col>
        </el-row>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import './global.css';
    import index from './components/Index';
    import header from './components/partial/Header.vue';
    import footer from './components/partial/Footer.vue';
    import { fetch_user_info } from '@/services/CommonService';
    import { mapGetters } from 'vuex';

    export default {
        name: 'app',
        computed: {
            ...mapGetters({
                keywords: 'keywords'
            })
        },
        watch: {
            keywords () {
                this.keywordsChanged();
            }
        },
        methods: {
            keywordsChanged () {
                if (!this.keywords) {
                    if (this.$route.name !== 'Holdrank') {
                        this.$router.push('/');
                    }
                } else if (/^\d+$/.test(this.keywords)) { // block
                    this.$router.push(`/block/${this.keywords}`);
                } else if (this.keywords.length === 40) { // transaction
                    this.$router.push(`/transaction/${this.keywords}`);
                } else if (/^1.3.\d+$/.test(this.keywords) || (this.keywords.charCodeAt(0) <= 'Z'.charCodeAt(0) && this.keywords.charCodeAt(0) >= 'A'.charCodeAt(0))) { // account
                    this.$router.push(`/asset/${this.keywords}`);
                } else { // account
                    this.$router.push(`/account/${this.keywords}`);
                }
            }
        },
        components: {
            vHeader: header,
            vFooter: footer,
            index
        },
        mounted () {
            const userInfo = this.$store.state.userInfo;
            if (!userInfo.id) {
                fetch_user_info().then(info => {
                    console.log(info);
                });
            }
        }
    };
</script>

<style scoped>
    #seg {
        margin: 20px 10px;
    }
    .main-container {
        max-width: 1280px;
        margin-top: 80px;
    }

    .router-link-active {
        border-color: #3c4463 !important;
        background: #3c4463 !important;;
        color: #fff !important;;
    }
</style>
