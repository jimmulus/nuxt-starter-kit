export default async function({store, from}) {
  let initalPageLoad = !from
  if(initalPageLoad) {
    await store.dispatch('account/getAccount')
    await store.dispatch('data/getData')
  }
}
