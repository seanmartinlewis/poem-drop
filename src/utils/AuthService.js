import Auth0Lock from 'auth0-lock'

 export default class AuthService {
   constructor(clientId, domain) {
     // Configure Auth0
     this.lock = new Auth0Lock(clientId, domain, {})
     // Add callback for lock `authenticated` event
     this.lock.on('authenticated', this._doAuthentication.bind(this))
     // binds login functions to keep this context
     this.login = this.login.bind(this)
   }

   _doAuthentication(authResult){
     // Saves the user token
     this.setToken(authResult.idToken)
     console.log('set token');
     this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.setProfile(profile)
      }
    })
   }

   login() {
     // Call the show method to display the widget.
     this.lock.show()
   }

   loggedIn(){
     // Checks if there is a saved token and it's still valid
     return !!this.getToken()
   }

   setToken(idToken){
     // Saves user token to localStorage
     localStorage.setItem('id_token', idToken)
   }

   getToken(){
     // Retrieves the user token from localStorage
     return localStorage.getItem('id_token')
   }

   setProfile(profile) {
      // Saves profile data to local storage
      localStorage.setItem('profile', JSON.stringify(profile))

    }
    getProfile() {
      // Retrieves the profile data from local storage
      const profile = localStorage.getItem('profile')
      return profile ? JSON.parse(localStorage.profile) : {}
    }

   logout(){
     // Clear user token and profile data from localStorage
     localStorage.removeItem('id_token');
   }
 }
