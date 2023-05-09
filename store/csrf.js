export const state = () => ({
  token: null,
})

export const actions = {
  async getCSRF({
    commit
  }) {
    try {
      const response = await this.$axios.get('/api/csrf')
      this.$axios.defaults.headers.common['x-csrf-token'] = response.data.data.csrfToken
      commit('SET_CSRFTOKEN', response.data.data.csrfToken)
    } catch (e) {
      console.log(e)
    }
  }

}

export const mutations = {
  SET_CSRFTOKEN(state, data) {
    state.token = data
  }
}
