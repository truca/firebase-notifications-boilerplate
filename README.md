INSTRUCTIONS

To use this package, you have to follow this steps:

0.- Create a firebase project and get your config

1.- Ask permission to the user with requestPermission, that will return a promise with the token or an error

2.- configure a notification handler in case a notification arrives when the app is open

Example:

var fnb = require('firebase-notifications-boilerplate')

'''
var config = {
  apiKey: ###,
  authDomain: ###,
  databaseURL: ###,
  projectId: ###,
  storageBucket: ###,
  messagingSenderId: ###,
}

var result = fnb.requestPermission(config)
result.then(function(token){
  console.log("Tokenu", token)
  document.getElementById('container').innerHTML = token
})

fnb.configAppMessages(config, function(payload){ console.log(payload) })
'''


3.- setup your service worker to handle notifications. Just copy this to your service worker (changing the config for your own from firebase, of course)

'''
importScripts('https://www.gstatic.com/firebasejs/4.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.2.0/firebase-messaging.js')

var config = {
  apiKey: ###,
  authDomain: ###,
  databaseURL: ###,
  projectId: ###,
  storageBucket: ###,
  messagingSenderId: ###,
}
firebase.initializeApp(config);

var swHandleNotifications = function(title, icon){
  var messaging = firebase.messaging()
  messaging.setBackgroundMessageHandler(function (payload) {
      var options = {
          body: payload.data.status,
          icon: icon
      }
      return self.registration.showNotification(title, options)
  })
}

swHandleNotifications('Noti-Test', 'icon.png')
'''

And that's it! You're ready
