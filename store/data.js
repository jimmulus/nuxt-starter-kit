export const state = () => ({
  list: [],
  headers: []
})

export const getters = {
  getListData: (state) => {
    return state.list
  },
  getHeaderData: (state) => {
    return state.headers
  },
}

export const actions = {
  async getData ({ commit }) {
    // const result = await this.$axios.$get('/api/data')
    const result = [{ headers:  [
      {
        text: 'Naam',
        align: 'start',
        filterable: true,
        value: 'naam',
      },
      { text: 'Bestandsnaam', value: 'bestand' },
      { text: 'Maand', value: 'maand' },
      { text: 'Jaar', value: 'jaar' },
      { text: 'Download', value: 'download',filterable: false, }
    ],
    data:  [
      {
        naam: 'Maand abonnement',
        jaar: 2022,
        maand: 'januari',
        bestand: 'download.pdf',
        download: 'download.pdf'
      },
      {
        naam: 'Maand abonnement',
        jaar: 2022,
        maand: 'februari',
        bestand: 'download.pdf',
        download: 'download.pdf'
      },
      {
        naam: 'Maand abonnement',
        jaar: 2022,
        maand: 'maart',
        bestand: 'download.pdf',
        download: 'download.pdf'
      },
      {
        naam: 'Maand abonnement',
        jaar: 2022,
        maand: 'april',
        bestand: 'download.pdf',
        download: 'download.pdf'
      },
      {
        naam: 'Maand abonnement',
        jaar: 2022,
        maand: 'mei',
        bestand: 'download.pdf',
        download: 'download.pdf'
      },
      {
        naam: 'Maand abonnement',
        jaar: 2022,
        maand: 'juni',
        bestand: 'download.pdf',
        download: 'download.pdf'
      },
      {
        naam: 'Maand abonnement',
        jaar: 2022,
        maand: 'juli',
        bestand: 'download.pdf',
        download: 'download.pdf'
      },
      {
        naam: 'Maand abonnement',
        jaar: 2022,
        maand: 'augustus',
        bestand: 'download.pdf',
        download: 'download.pdf'
      },
    ],
  }]
    commit('SET_DATA', result[0].data)
    commit('SET_HEADERS', result[0].headers)
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
  SET_DATA(state, data) {
    state.list = data
  },
  SET_HEADERS(state, headers) {
    state.headers = headers
  },
}
