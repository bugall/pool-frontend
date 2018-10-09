<template>
    <el-row class="header-wrap">
        <el-col :span="1"></el-col>
        <el-col :span="4">
            <div class="brand">
                <img src="../../../static/logo-idac.png"/>
            </div>
        </el-col>
        <el-col :span="18">
            <div class="nav">
                <el-menu :default-active="this.activeIndex"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                >
                    <el-menu-item index="0" class="">首页</el-menu-item>
                    <el-menu-item index="1" class="">创新区</el-menu-item>
                    <el-menu-item index="2" class="">Pow排行榜</el-menu-item>
                    <el-menu-item index="3" class="">热门矿机</el-menu-item>
                    <el-menu-item index="4" class="">关于我们</el-menu-item>
                    <template v-if="!userInfo.id">
                        <el-menu-item index="5" class="nav-menu-item-right">登录</el-menu-item>
                        <el-menu-item index="6" class="nav-menu-item-right">注册</el-menu-item>
                    </template>
                    <template v-else>
                        <el-submenu index="7" popper-class="popuper" class="nav-menu-item-right">
                            <template slot="title">{{userInfo.username}}</template>
                            <el-menu-item index="2-2">个人中心</el-menu-item>
                            <el-menu-item index="2-3">退出</el-menu-item>
                        </el-submenu>
                    </template>
                </el-menu>
            </div>
        </el-col>
        <el-col :span="1"></el-col>
    </el-row>
</template>

<script>
    import { get_user_info } from '@/services/CommonService';
    import { mapGetters } from 'vuex';

    const routerMapping = {
        '0': '/',
        '4': '/aboutus',
        '5': '/login',
        '6': '/login',
        '2-2': '/manage'
    };
    export default {
        data () {
            return {
                search: '',
                flagImg: {
                    'zh': require('../../../static/language-dropdown/img/CN.png'),
                    'en': require('../../../static/language-dropdown/img/US.png')
                },
                activeIndex: '0'
            };
        },
        created () {
            get_user_info().then(result => {
                this.$store.commit('setUserInfo', result.body.data);
            });
        },
        computed: {
            ...mapGetters({
                userInfo: 'userInfo'
            })
        },
        watch: {
            'keywords' () {
                if (this.keywords !== this.search) {
                    this.search = this.keywords;
                }
            }
        },
        methods: {
            handleSelect (index) {
                const router = this.$router;
                router.push({path: routerMapping[index]});
                this.activeIndex = index;
            },
            eventChanged () {
                this.search = this.search.replace(/(^\s*)|(\s*$)/g, '');
                this.setKeywords({keywords: this.search});
            },
            switchLanguage (locale) {
                this._i18n.locale = locale;
            },
            clearInput () {
                this.setKeywords({keywords: ''});
            }
        }
    };
</script>

<style scoped>
    .header-wrap {
        width: 100%;
        height: 60px;
        background: rgb(84, 92, 100);
        margin: auto;
        position: fixed;
        z-index: 100;
        top: 0px;
    }
    .header-wrap .el-col {
        height: 100%;
    }
    .header-wrap .brand img {
        width: 70px;
        margin-top: 10px;
    }

    .nav-menu-item-right {
        float: right !important;
    }
    .el-menu-item {
        text-align: center;
    }
    

</style>
<style>
    .popuper {
        margin-left: -20px;
    }
    .popuper .el-menu--popup {
        min-width: 140px !important;
    }
</style>
