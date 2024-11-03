import { createStore } from 'vuex';

export default createStore({
  state: {
    backgroundColor: localStorage.getItem('backgroundColor') || '#ffffff',
    selectedFont: localStorage.getItem('selectedFont') || 'Arial, sans-serif', // Default font
    textColor: localStorage.getItem('textColor') || '#000000', // Default text color
  },
  mutations: {
    setBackgroundColor(state, color) {
      state.backgroundColor = color;
      localStorage.setItem('backgroundColor', color);
    },
    setSelectedFont(state, font) {
      state.selectedFont = font;
      localStorage.setItem('selectedFont', font);
    },
    setTextColor(state, color) {
      state.textColor = color;
      localStorage.setItem('textColor', color);
    },
  },
  actions: {
    updateBackgroundColor({ commit }, color) {
      commit('setBackgroundColor', color);
    },
    updateSelectedFont({ commit }, font) {
      commit('setSelectedFont', font);
    },
    updateTextColor({ commit }, color) {
      commit('setTextColor', color);
    },
  },
});