<template>
    <el-row>
        <el-col :span="4">
            <div class="menu-wrap">
                <h3 class="heading">管理中心</h3>
                <ul>
                    <li
                        @click="menuClick"
                        data-path="/manage/dashboard"
                        data-menu="dashboard"
                        :class="this.currentMenu === 'dashboard' ? 'selected' : ''"
                    >概览</li>
                    <li
                        @click="menuClick"
                        data-path="/manage/wallet"
                        data-menu="wallet"
                        :class="this.currentMenu === 'wallet' ? 'selected' : ''"
                    >钱包管理</li>
                    <li>矿机管理</li>
                    <li
                        @click="menuClick"
                        data-path="/manage/person"
                        data-menu="person"
                        :class="this.currentMenu === 'person' ? 'selected' : ''"
                    >账号管理</li>
                </ul>
            </div>
        </el-col>
        <el-col :span="1"><div style="height: 1px"></div></el-col>
        <el-col :span="19">
            <div class="manage-container">
                <router-view></router-view>
            </div>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        data () {
            return {
                currentMenu: 'dashboard'
            };
        },
        methods: {
            menuClick (event) {
                const router = this.$router;
                this.currentMenu = event.target.getAttribute('data-menu');
                router.push({
                    path: event.target.getAttribute('data-path')
                });
            }
        }
    };
</script>
<style scoped>
    .menu-wrap {
        margin-bottom: 15px;
        list-style: none;
        background-color: #fff;
        border: 1px solid #d1d5da;
        border-radius: 3px;
    }
    .menu-wrap ul {
       padding: 0px;
       margin: 0px;
    }
    .menu-wrap ul li {
        list-style-type:none;
        position: relative;
        display: block;
        padding: 8px 10px;
        border-bottom: 1px solid #e1e4e8;
        font-size: 14px;
        font-weight: 400;
        line-height: 2;
        cursor: pointer;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    }
    .menu-wrap ul a {
        font-size: 14px;
        font-weight: 400;
        line-height: 2;
        text-decoration: none;
        color: black;
    }
    .menu-wrap ul li:hover {
        background: #f3f5f8;
        border-left: 2px solid rgb(255, 208, 75);
    }
    .selected {
        background: #f3f5f8;
        border-left: 2px solid rgb(255, 208, 75); 
    }
    .menu-wrap .heading {
        display: block;
        padding: 8px 10px;
        margin-top: 0;
        margin-bottom: 0;
        font-size: 13px;
        font-weight: 600;
        line-height: 20px;
        color: #586069;
        background-color: #f3f5f8;
        border-bottom: 1px solid #e1e4e8;
    }
    .manage-container {
        background: #fff;
        width: 100%;
        min-height: 500px;
        padding: 20px 30px;
        box-sizing: border-box;
    }
</style>