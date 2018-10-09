import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    keywords: '',
    userInfo: {}
};

const mutations = {
    setKeywords (state, payload) {
        state.keywords = payload.keywords;
    },
    setUserInfo (state, info) {
        state.userInfo = info;
    }
};

const actions = {
    setKeywords ({commit}, payload) {
        commit('setKeywords', payload);
    }
};

const getters = {
    keywords: state => state.keywords,
    loading: state => state.loading,
    userInfo: state => state.userInfo
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});
