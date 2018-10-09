<template>
    <div>
        <Loading v-show="loading"></Loading>
        <div class="banner-wrap">
            <el-carousel :interval="4000" type="card" height="250px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <img :src="'../../static/banner-' + item + '.png'">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="container-wrap">
            <el-row :gutter="50">
                <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <div class="card-image-wrap">
                            <img src="../../static/index-tutorial-1-hover.png" class="image">
                        </div>
                        <div class="footer-label">
                            <span>注册账户</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <div class="card-image-wrap">
                            <img src="../../static/index-tutorial-2-hover.png" class="image">
                        </div>
                        <div class="footer-label">
                            <span>选择矿机</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <div class="card-image-wrap">
                            <img src="../../static/index-tutorial-3-hover.png" class="image">
                        </div>
                        <div class="footer-label">
                            <span>开始挖矿</span>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <div class="card-image-wrap">
                            <img src="../../static/index-tutorial-4-hover.png" class="image">
                        </div>
                        <div class="footer-label">
                            <span>坐享收益</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <div class="second-container">
            <div>挖矿从未如此简单   多币种轻松挖</div>
        </div>
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
            this.loading = false;
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
    .el-carousel img {
        height: inherit;
    }
    .banner-wrap {
        height: 300px;
    }
    .container-wrap {
        margin-top: 20px;
    }
    .el-col {
        height: 100%;
    }
    .el-card img {
        width: 100%;
        height: 300px;
    }
    .el-card .footer-label {
        text-align: center;
        padding: 10px;
        color: rgb(89, 166, 243);
    }
    .second-container {
        min-height: 300px;
        background: #fff;
        margin-top: 20px;
        background: url('../../static/pc_bg.png')
    }
    .second-container div {
        color: rgba(255, 255, 255, 0.87);
        margin: auto;
        font-size: 36px;
        line-height: 300px;
        text-align: center;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    .card-image-wrap {
        background: rgb(84, 92, 100);
    }
    .card-image-wrap:hover {
        cursor: pointer;
        background: rgb(89, 166, 243);
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
  
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>