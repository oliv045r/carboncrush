import { createStore } from 'vuex';

export default createStore({
  state: {
    backgroundColor: localStorage.getItem('backgroundColor') || '#ffffff',
    selectedFont: localStorage.getItem('selectedFont') || 'Arial, sans-serif', // Default font
    textColor: localStorage.getItem('textColor') || '#000000', // Default text color
    showNextButton: false,
goForwardFont() {
      this.currentFontIndex = (this.currentFontIndex + 1) % this.fonts.length;
      this.updateSelectedFont(this.fonts[this.currentFontIndex].font);
    }
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
      commit('setSelectedFont', font);
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
  },
});