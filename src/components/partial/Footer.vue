<template>
    <el-row class="footer-wrap">
        <section class="footer">
            <div class="footer-outer">
                <div class="footer-inner">
                    <div class="text-center">
                        @2017 - 2018 Powered by IDAChain &nbsp;<a target='_blank' nofollow
                                                      href="https://github.com/IDAChain/idac-explorer"><span
                            class="fa fa-lg fa-github"></span></a>
                    </div>
                </div>
            </div>
        </section>
    </el-row>
</template>

<script>

</script>
<style scoped>
    .footer-wrap {
        width: 100%;
        height: 60px;
        margin-top: 20px;
    }
    .footer {
        height: 100%;
        width: 0;
    }

    .footer-outer {
        text-align: center;
        position: absolute;
        z-index: auto;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .footer-inner {
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: 4px;
        padding: 8px;
        line-height: 36px;
        color: #ccc;
        border-top: 3px double #eee;
    }
</style>
