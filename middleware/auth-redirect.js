export default function (context) {

  if (!context.$auth.loggedIn ) {
    const arr = ['vergeten' , 'login', 'register', 'form', 'reset-token', 'canvas']
    if(arr.includes(context.route.name)) {
      return
    }
        return context.redirect('/login')
  }
}
