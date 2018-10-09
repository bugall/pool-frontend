<template>
    <div class="container">
        <div class="heading">
            <div class="title">钱包详情</div>
            <div style="float: right">
                <el-button size="small" type="success">新增钱包</el-button>
            </div>
        </div>
        <div class="form">
            <ul>
                <li>
                    <div class="label">账号</div>
                    <div><el-input size="small" v-model="account" placeholder="请输入内容"></el-input></div>
                </li>

                <li>
                    <div class="label">手机号</div>
                    <div><el-input size="small" v-model="account" placeholder="手机号"></el-input></div>
                </li>

                <li>
                    <div class="label">邮箱</div>
                    <div><el-input size="small" v-model="account" placeholder="手机号"></el-input></div>
                </li>
                <li>
                    <div class="label">真实姓名</div>
                    <div><el-input size="small" v-model="account" placeholder="手机号"></el-input></div>
                </li>
                <li class="confirm">
                    <el-button type="primary">确认</el-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {};
        },
        methods: {
        }
    };
</script>
<style scoped>
    .heading {
        padding-bottom: 8px;
        margin-bottom: 16px;
        border-bottom: 1px #e1e4e8 solid;
        font-weight: 400;
        height: 35px;
    }
    .heading .title {
        float: left;
        height: 40px;
        line-height: 40px;
    }
    .container ul {
        padding: 0px;
        margin: 0px;
    }
    .container ul li {
        list-style-type: none;
        margin-top: 15px;
    }
    .container ul li .label {
        font-size: 14px;
        color: #7d7d7d;
        margin-bottom: 9px;
        font-weight: 600;
    }
    .container ul .confirm {
        margin-top: 30px;
        text-align: center;
    }
    .container ul .confirm button {
        width: 100px;
    }
    .container ul {
        width: 300px;
    }
</style>