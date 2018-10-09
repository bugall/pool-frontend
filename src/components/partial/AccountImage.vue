<template>
</template>
<script>
    import jdenticon from 'jdenticon';
    import sha256 from 'js-sha256';

    const IMAGE_MAP = {
        idac: '',
        dona: '',
        BDB: '',
        PPS: '',
        LVCOIN: '',
        LUCIA: '',
    };

    export default {
        props: {
            size: {
                type: Number,
                default: 30
            },
            account: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                imgShow: false,
                imgSrc: ''
            };
        },
        computed: {
            hash: function () {
                return this.account ? sha256(this.account) : '';
            }
        },
        watch: {
            account () {
                this.drawCanvas();
            },
            size () {
                this.drawCanvas();
            }
        },
        methods: {
            drawCanvas () {
                if (IMAGE_MAP[this.account]) {
                    this.imgShow = true;
                    this.imgSrc = IMAGE_MAP[this.account];
                } else {
                    this.imgShow = false;
                    if (this.account) {
                        jdenticon.update(this.$refs.canvas, this.hash, 0);
                    } else {
                        ctx.fillRect(0, 0, size, size);
                        ctx.clearRect(0 + 1, 0 + 1, size - 2, size - 2);
                        ctx.font = `${size}px sans-serif`;
                        ctx.fillText('?', size / 4, size - size / 6);
                    }
                }
            }
        },
        mounted () {
            this.drawCanvas();
        }
    };
</script>
<style scoped>
    .account-image {
        vertical-align: middle;
    }
</style>
