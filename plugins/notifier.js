export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage ({ content = '', color = 'success', timeout = -1}) {
      store.commit('snackbar/showMessage', { content, color, timeout })
    }
  })
}
