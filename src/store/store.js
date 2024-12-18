import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      token : null
    }
  },
  getters: {
    isLogin(state) {
      return state.token==null ? false : true;
    }
  },
  mutations: {
    setToken(state, _token) {
      state.token = _token;
    }
  },
  plugins: [
    createPersistedState({
      paths: ["token"]
    })
  ]
})

export default store;