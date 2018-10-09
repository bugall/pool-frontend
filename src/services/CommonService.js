import Vue from 'vue';

// const baseURL = location.host;
const baseURL = 'localhost:7001';

export const get_user_info = (options) => {
    const token = localStorage.getItem('token');
    Vue.http.headers.common['Authorization'] = `Bearer ${token}`;

    return Vue.http.get(`//${baseURL}/api/v1/account/info`, options, {
        responseType: 'json'
    });
};
// 获取用户token
export const fetch_user_token = (options) => {
    return Vue.http.post(`//${baseURL}/api/v1/passport/token`, options, {
        responseType: 'json'
    }).then(result => {
        // 存储token
        localStorage.setItem('token', result.body.data.access_token);
    });
};
// 注册新用户
export const register = (options) => {
    options.code = 123456;
    localStorage.setItem('account', 'bugall');
    return Vue.http.post(`//${baseURL}/api/v1/account/register`, options, {
        responseType: 'json'
    }).then(result => {
        // 存储token
        localStorage.setItem('token', result.body.data.access_token);
    });
};

export const fetch_block = (block_height) => {
    return Vue.http.get(`//${baseURL}/api/block/${block_height}`, {
        responseType: 'json'
    });
};

export const fetch_transaction = (tx_id) => {
    return Vue.http.get(`//${baseURL}/api/transaction/${tx_id}`, {
        responseType: 'json'
    });
};

export const fetch_account = (id_or_name) => {
    return Vue.http.get(`//${baseURL}/api/account/${id_or_name}`, {
        responseType: 'json'
    });
};

export const fetch_account_balance = (id_or_name) => {
    return Vue.http.get(`//${baseURL}/api/account_balance/${id_or_name}`, {
        responseType: 'json'
    });
};

export const fetch_product = (product_id) => {
    return Vue.http.get(`//${baseURL}/api/product/${product_id}`, {
        responseType: 'json'
    });
};

export const get_rank = (typeid) => {
    return Vue.http.get(`//${baseURL}/api/holdrank/${typeid}`, {
        responseType: 'json'
    });
};

let fallbackStore = {};
export const set_item = (key, val) => {
    try {
        localStorage.setItem(key, val);
    } catch (ex) {
        console.log('fallback to memory store');
        fallbackStore[key] = val;
    }
};

export const get_item = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (ex) {
        return fallbackStore[key];
    }
};
