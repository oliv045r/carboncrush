import { createStore } from 'vuex';

export default createStore({
  state: {
    backgroundColor: localStorage.getItem('backgroundColor') || '#ffffff',
  },
  mutations: {
    setBackgroundColor(state, color) {
      state.backgroundColor = color;
      localStorage.setItem('backgroundColor', color);
    },
  },
  actions: {
    updateBackgroundColor({ commit }, color) {
      commit('setBackgroundColor', color);
    },
  },
});