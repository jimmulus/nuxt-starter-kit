export const actions = {
  async nuxtServerInit({
    state
  }, context) {
    if (state.auth.loggedIn == false) {
      if (context.route.path !== '/login')
        context.$cookies.set('redirect', context.route.path, {
          path: '/',
          maxAge: 60 * 60
        })
      this.$auth.$storage.removeCookie(this.$config.SID)
    }
  }
}
