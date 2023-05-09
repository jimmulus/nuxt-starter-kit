export const state = () => ({
  account: {},
  bedrijf: {}
})

export const getters = {
  getAccountData: (state) => {
    return state.account
  },
  getKantoor: (state) => {
    return state.bedrijf
  }
}

export const actions = {
  async getAccount ({ commit }) {
    // const result = await this.$axios.$get('/api/account')

    //Voorbeeld data
    const result = [{
      Account: {
        Naam: 'Boris Test',
        Geslacht: 'M',
        Mobiel: '06 12345678',
        Email: 'btest@4proces.nl',
        Functie: 'Web developer',
      },
      Bedrijf: {
        Naam: '4PROCES',
        Telefoon: '0252 794 001',
        Adres: 'Satellietbaan 41A',
        Postcode: '2181 MG',
        Plaats: 'Hillegom'
      }
    }]

    commit('SET_ACCOUNT', result[0].Account)
    commit('SET_BEDRIJF', result[0].Bedrijf)
  },

  // async updateAccount ({ commit }, { account }) {
  //   const response = await this.$axios.$post('/api/account', account).catch((e) => {
  //     console.log(e.response.data.message)
  //     return this.$notifier.showMessage({ content: e.response.data.message, color: 'error', timeout:2000 })
  //   })
  //   commit("SET_ACCOUNT", response[0]);
  //   this.$notifier.showMessage({ content: `Gegevens opgeslagen ${account.Voornaam}!`, color: 'success', timeout:2000 })
  // }

}

export const mutations = {
  SET_ACCOUNT(state, account) {
    state.account = account
  },
  SET_BEDRIJF(state, bedrijf) {
    state.bedrijf = bedrijf
  },
}
