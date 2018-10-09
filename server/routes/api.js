import express from 'express';
import IDAChainService from '../services/IDAChainService';
import LevelDBService from '../services/LevelDBService';
import HoldrankService from '../services/HoldrankService';
import jdenticon from 'jdenticon';
import crypto from 'crypto';
import IPFSService from '../services/IPFSService';

let router = express.Router();

/**
 * 区块查询
 */
router.get('/block/:block_height', function (req, res) {
    IDAChainService.fetch_block(req.params.block_height).then((block) => {
        res.send(block);
    }).catch((ex) => {
        res.send({});
    });
});

/**
 * 资产列表
 */
router.get('/assets', function (req, res) {
    IDAChainService.fetch_assets().then((assets) => {
        res.send(assets);
    }).catch(ex => {
        res.send([]);
    });
});

/**
 * 资产查询
 */
router.get('/asset/:asset_name', function (req, res) {
    IDAChainService.fetch_asset(req.params.asset_name).then((asset) => {
        res.send(asset);
    }).catch(ex => {
        res.send({});
    });
});

/**
 * 交易记录查询
 */
router.get('/transaction/:tx_id', function (req, res) {
    LevelDBService.get(req.params.tx_id.toLowerCase()).then((transaction) => {
        res.send(JSON.parse(transaction));
    }).catch(() => {
        res.send({});
    });
});

/**
 * 账户查询
 */
router.get('/account/:account_id_or_name', function (req, res) {
    IDAChainService.fetch_full_account(req.params.account_id_or_name).then((account) => {
        res.send(account.length > 0 ? account[0][1] : {});
    }).catch(() => {
        res.send({});
    });
});

/**
 * 账户余额查询
 */
router.get('/account_balance/:account_id_or_name', function (req, res) {
    IDAChainService.fetch_account_balance(req.params.account_id_or_name).then((balances) => {
        res.send(balances);
    }).catch(() => {
        res.send({});
    });
});

router.get('/header/:account_name', function (req, res) {
    var hash = crypto.createHash('sha256').update(req.params.account_name, 'utf8').digest('hex');
    var size = Number(req.query.size || '80');
    let png = jdenticon.toPng(hash, size);
    res.set('content-type', 'image/png');
    res.write(png);
    res.end();
});

/**
 * 产品信息查询
 */
router.get('/product/:product_id', function (req, res) {
    IDAChainService.fetch_product(req.params.product_id).then((product) => {
        res.send(JSON.stringify(product));
    }).catch(() => {
        res.send({});
    });
});

/**
 * 持仓
 */
router.get('/holdrank/:typeid', function (req, res) {
    try {
        res.send(JSON.stringify(HoldrankService.get_rank(req.params.typeid)));
    } catch (err) {
        res.send({});
    }
});

/**
 * 交易记录查询
 */
router.get('/ipfs/:hash', function (req, res) {
    IPFSService.download(req.params.hash, ['/ip4/139.196.138.193/tcp/5001', '/ip4/106.14.194.229/tcp/5001']).then((result) => {
        res.send(result);
    }).catch(() => {
        res.send('');
    });
});

module.exports = router;
