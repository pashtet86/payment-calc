import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencies: [],
  },

  getters: {
    currentCourse: state => state.currencies.find(a => a.cc === 'USD'),
  },

  mutations: {
    SET_CURRENCIES(state, data) {
      state.currencies = data.data;
    },
  },

  actions: {
    async FETCH_CURRENCIES({ commit }) {
      try {
        const data = await api.main.getCurrencies('exchange?json');
        commit('SET_CURRENCIES', { data });
      } catch (error) {
        // await logError(error);
      }
    },
  },
});
