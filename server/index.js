import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';

import path from 'path';
import colors from 'colors/safe';

import webpackConfig from '../build/webpack.dev.conf';
import webpack from 'webpack';
import figlet from 'figlet';
import config from '../config';

let app = express();
let compiler = webpack(webpackConfig);

let devMiddleware = null;

let hotMiddleware = null;

if (app.get('env') === 'development') {
    devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
    });

    hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: console.log,
        heartbeat: 2000
    });

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({action: 'reload'});
            cb();
        });
    });
    app.use(logger('dev'));
    app.use(devMiddleware);
    app.use(hotMiddleware);

    var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
    app.use(staticPath, express.static('./static'));
} else {
    app.use(logger('combined'));
    app.use(express.static('./dist'));
}

app.use(require('connect-history-api-fallback')({
    index: '/',
    rewrites: [
        {
            from: '/api/*',
            to: function (options) {
                return options.parsedUrl.href;
            }
        }
    ]
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});

/**
 * 启动web服务
 */
let serverStarted = false;

let port = process.env.NODE_ENV === 'production' ? 80 : 3000;
let startServer = function () {
    if (serverStarted) {
        return;
    }
    serverStarted = true;
    app.set('port', port);
    let server = http.createServer(app);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', () => {
        devMiddleware && devMiddleware.waitUntilValid(() => {
            var uri = `http://localhost:${port}`;
            console.log('> Listening at ' + uri + '\n');
        });
    });
    figlet('IDAC-EXPLORER', 'Standard', function (err, text) {
        if (err) {
            console.error(err);
        }
        console.log(colors.rainbow('\n=*=*=*=*=*=*=*=*=*==*=*=IDAChain区块浏览器已启动=*=*=*==*=*=*=*=*=*=*=\n'));
        console.log(colors.cyan(`${(text || '').split('\n').map(function (line) {
            return `${line}`;
        }).join('\n')}`));
        console.log(colors.rainbow('=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=**=*=*=*=*=*=*=\n'));
    });
};
startServer();

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

process.stdin.resume();

function exitHandler (reason, err) {
    if (err) console.log(err.stack);
    console.log('程序退出:', reason);
    process.exit();
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, 'exit'));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, 'SIGINT'));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, 'uncaughtException'));
