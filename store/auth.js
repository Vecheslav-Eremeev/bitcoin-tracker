export const state = () => ({
  auth: false,
});

export const getters = {
  getAuth: (state) => state.auth,
};

export const mutations = {
  setAuth(state, data) {
    state.auth = data;
  },
};

export const actions = {
    setAuth(context, payload) {
        context.commit('setAuth', payload)
    }
}