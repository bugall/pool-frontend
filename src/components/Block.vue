<template>
    <div class="container">
        <Loading v-show="loading"></Loading>
        <div class="panel panel-default" v-if="block&&block.block_id" v-show="!loading">
            <div class="panel-heading">
                <span class="fa fa-chain"></span>&nbsp;{{$t('block.title')}}
            </div>
            <div class="panel-body no-padding">
                <ul class="block-summary">
                    <li>{{$t('block.id')}}：{{block.block_id}}</li>
                    <li>{{$t('block.timestamp')}}：{{new Date(block.timestamp+'Z').format('yyyy-MM-dd hh:mm:ss')}}</li>
                    <li>{{$t('block.witness')}}：
                        <router-link :to="{path:'/account/'+account_name}">
                            {{account_name}}
                        </router-link>
                    </li>
                    <li>{{$t('block.previous')}}：{{block.previous}}</li>
                    <li>{{$t('block.transactions')}}：{{block.transactions.length}}</li>
                </ul>
                <!--翻页-->
                <div class="pager" v-if="block&&block.block_id">
                    <button @click="goPrev" class="btn btn-default pull-left">
                        <span class="fa fa-angle-left"></span>
                    </button>
                    <button @click="goNext" class="btn btn-default pull-right">
                        <span class="fa fa-angle-right"></span>
                    </button>
                </div>
                <div class="table-responsive" v-for="(transaction,i) in block.transactions">
                    <Operation v-if="block" v-for="(operation,index) in transaction.operations" :key="index" :id="index"
                               :operation="operation" :txid="transaction.transaction_ids"></Operation>
                </div>
            </div>
        </div>


        <!--区块json-->
        <json v-if="block&&block.block_id" :json="block" v-show="!loading"></json>
        <div v-else v-show="!loading">
            <h4 class="page-header">{{$t('block.title')}}</h4>
            <p class="null-tip">{{$t('block.empty')}}</p>
        </div>


    </div>
</template>

<script>
    import { Apis } from 'idacjs-ws';
    import { mapActions, mapGetters } from 'vuex';
    import { fetch_account, fetch_block } from '@/services/CommonService';
    import JSONS from './partial/JSON.vue';
    import Operation from './partial/Operation.vue';
    import crypto from 'crypto';

    export default {
        data () {
            return {
                loading: true,
                block: null,
                account_name: null
            };
        },
        methods: {
            ...mapActions({
                setKeywords: 'setKeywords'
            }),

            fetch_block () {
                let self = this;
                this.block = null;
                this.account_name = null;
                fetch_block(this.$route.params.block_height).then(function (resp) {
                    self.block = resp.body;
                    for (const i in self.block.transactions) {
                        const transaction = self.block.transactions[i];
                        const tr_buffer = Buffer(JSON.stringify(transaction));
                        const tx_id = crypto.createHash('sha256').update(tr_buffer).digest('hex').substr(0, 40);
                        self.block.transactions[i].transaction_ids = tx_id;
                    }
                    self.loading = false;
                    if (self.block) {
                        Apis.instance().db_api().exec('get_objects', [[self.block.witness]]).then((res) => {
                            fetch_account(res[0].witness_account).then(function (res) {
                                self.account_name = res.body.account ? res.body.account.name : '';
                            }).catch(ex => {
                                console.error(ex);
                            });
                        });
                    }
                }, function () {
                    self.block = {error: this.$t('block.error')};
                    self.loading = false;
                });
            },

            goNext () {
                this.loading = true;
                this.setKeywords({keywords: parseInt(this.$route.params.block_height) + 1});
            },

            goPrev () {
                this.loading = true;
                this.setKeywords({keywords: parseInt(this.$route.params.block_height) - 1});
            }

        },
        computed: {
            ...mapGetters({
                keywords: 'keywords'
            })
        },
        watch: {
            keywords () {
                this.loading = true;
                this.fetch_block();
            }
        },
        components: {
            json: JSONS,
            Operation: Operation
        },
        mounted () {
            if (this.$route.params.block_height !== this.keywords) {
                this.setKeywords({keywords: this.$route.params.block_height});
            }
            this.fetch_block();
        }
    };
</script>

<style scoped>
    .block-summary {
        margin-top: 15px;
    }

    .pager {
        padding-right: 15px;
        padding-left: 15px;
    }
</style>
