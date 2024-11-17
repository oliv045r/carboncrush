// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    backgroundColor: localStorage.getItem('backgroundColor') || '#ffffff',
    selectedFont: localStorage.getItem('selectedFont'), // Default font
    textColor: localStorage.getItem('textColor') || '#000000', // Default text color
    showNextButton: false,
  },
  mutations: {
    setBackgroundColor(state, color) {
      state.backgroundColor = color;
      localStorage.setItem('backgroundColor', color);
    },
    setSelectedFont(state, font) {
      state.selectedFont = font;
      localStorage.setItem('selectedFont', font);  // Gem skrifttypen i localStorage
    },
    setTextColor(state, color) {
      state.textColor = color;
      localStorage.setItem('textColor', color);
    },
    setShowNextButton(state, value) {
      state.showNextButton = value;
    },
    resetShowNextButton(state) {
      state.showNextButton = false;
    },
  },
  actions: {
    updateBackgroundColor({ commit }, color) {
      commit('setBackgroundColor', color);
    },
    updateSelectedFont({ commit }, font) {
      commit('setSelectedFont', font);  // Opdater skrifttypen i Vuex
    },
    updateTextColor({ commit }, color) {
      commit('setTextColor', color);
    },
    updateShowNextButton({ commit }, value) {
      commit('setShowNextButton', value);
    },
    resetShowNextButton({ commit }) {
      commit('resetShowNextButton');
    },
  },
  getters: {
    showNextButton: (state) => state.showNextButton,
    selectedFont: (state) => state.selectedFont, // Hent skrifttypen fra Vuex
  },
});
