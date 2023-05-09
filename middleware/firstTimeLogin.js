export default function (context) {

  if (context.$auth.user ) {
    if(context.route.name === 'reset') {
      return
    }
    if(context.$auth.user.FirstTimeLogin === 1) {
        return context.redirect('/reset')
    }
  }
}
