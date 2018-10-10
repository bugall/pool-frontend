<template>
    <div class="account-wrap">
	    <el-row v-if="this.currentTab === 'register'" class="register">
            <el-col :span="24">
                <el-card class="box-card" :body-style="{padding: '20px 40px'}">
                    <div slot="header" class="clearfix title-wrap">
                        <span>注册</span>
                    </div>
                    <el-form label-position="left" label-width="70px" :model="registerRules" status-icon :rules="registerRules" ref="registerRules">
                        <el-form-item label="账号" prop="username">
                            <el-input type="text" v-model="register.username" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="register.password" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="重复密码" prop="repassword">
                            <el-input type="password" v-model="register.repassword" auto-complete="off"></el-input>
                        </el-form-item>
                        <div class="confirm-btn-wrap">
                            <el-button type="primary" @click="submitForm('registerRules')">注册</el-button>
                        </div>
                   </el-form>
                   <div class="switch-wrap">
                       <a class="link" @click="switchClick" data-type="login">去登陆</a>
                   </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row v-else class="register">
            <el-col :span="24">
                <el-card class="box-card" :body-style="{padding: '20px 40px'}">
                    <div slot="header" class="clearfix title-wrap">
                        <span>登陆</span>
                    </div>
                    <el-form label-position="left" label-width="70px" :model="loginRules" status-icon :rules="loginRules" ref="loginRules">
                        <el-form-item label="账号" prop="username">
                            <el-input type="username" v-model="login.username" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="login.password" auto-complete="off"></el-input>
                        </el-form-item>
                        <div class="confirm-btn-wrap">
                            <el-button type="primary" @click="submitForm('loginRules')">登陆</el-button>
                        </div>
                   </el-form>
                   <div class="switch-wrap">
                       <a class="link" @click="switchClick" data-type="register">去注册</a>
                   </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { fetch_user_token as login, register } from '@/services/CommonService';
    export default {
        data () {
            const checkUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
                const username = this.currentTab === 'login' ? this.login.username : this.register.username;

                setTimeout(() => {
                    if (username.length < 8) {
                        callback(new Error('用户名不能少于8位'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.register.repassword !== '' && this.currentTab === 'register') {
                        this.$refs.registerRules.validateField('repassword');
                    }
                    callback();
                }
            };
            const validateRepassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空'));
                } else if (this.register.repassword !== this.register.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                register: {
                    username: '',
                    password: '',
                    repassword: ''
                },
                login: {
                    username: '',
                    password: ''
                },
                registerRules: {
                    password: [{ validator: validatePassword, trigger: 'blur' }],
                    repassword: [{ validator: validateRepassword, trigger: 'blur' }],
                    username: [{ validator: checkUsername, trigger: 'blur' }]
                },
                loginRules: {
                    password: [{ validator: validatePassword, trigger: 'blur' }],
                    username: [{ validator: checkUsername, trigger: 'blur' }]
                },
                currentTab: 'login'
            };
        },
        methods: {
            submitForm (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // const router = this.$router;
                        // router.push({path: routerMapping[index]});
                        if (this.currentTab === 'login') {
                            login(this.login).then(result => {

                            });
                        } else {
                            register(this.register);
                        }
                    } else {
                        return false;
                    }
                });
            },
            resetForm (formName) {
                this.$refs[formName].resetFields();
            },
            switchClick (type) {
                this.currentTab = type.target.getAttribute('data-type');
                console.log(this.currentTab);
            }
        }
    };
</script>
<style scoped>
    .el-form-item__content {
        margin: 0px;
    }
    .account-wrap {
        width: 100%;
        height: 100%;
        position: relative;
        align-items: center;
        top: 150px;
    }
    .account-wrap .title-wrap {
        text-align: center;
    }
    .account-wrap .confirm-btn-wrap {
        margin: 0px;
        width: 100%;
        text-align: center;
    }
    .account-wrap .register {
        position: absolute;
        left: 0;
        right: 0;
        width: 400px;
        margin: auto;
    }
    .switch-wrap {
        width: 100%;
        text-align: right;
        margin-top: 10px;
    }
    .switch-wrap a {
        text-decoration: none;
        font-size: 14px;
    }
    .switch-wrap a:hover {
        cursor: pointer;
    }
    .el-button {
        width: 100px;
    }
</style>