var firebase = require('firebase')

/**
 * DESCRIPTION: checks for the config object to be a valid firebase config object
 * config: should be a firebase configuration object. You can find it in the developer console
 */
var checkFirebaseConfig = function(config){
    if (!config) return new Error("a config object should be provided")
    if (!config.apiKey) return new Error("config should have a apiKey attribute")
    if (!config.authDomain) return new Error("config should have a authDomain attribute")
    if (!config.databaseURL) return new Error("config should have a databaseURL attribute")
    if (!config.projectId) return new Error("config should have a projectId attribute")
    if (!config.storageBucket) return new Error("config should have a storageBucket attribute")
    if (!config.messagingSenderId) return new Error("config should have a messagingSenderId attribute")
    return config
}

/**
 * DESCRIPTION: asks the user to send him notifications
 * config: should be a firebase configuration object. You can find it in the developer console
 */
exports.requestPermission = function(config){
    //firebase errors
    var checkForErrors = checkFirebaseConfig(config)
    if (checkForErrors instanceof Error) return checkForErrors

    firebase.initializeApp(config)

    var messaging = firebase.messaging()
    return messaging.requestPermission()
        .then( () => {
            console.log('Have Permission')
            return messaging.getToken()
        })
        .then(token => {
            console.log("Token: ", token)
            return token
        })
        .catch(err => {
            console.log("User didn't provided permission or the app couldn't get the token", err)
            return err
        })
}

/**
 * DESCRIPTION: sets the callback to handle notifications when app is open
 * config: should be a firebase configuration object. You can find it in the developer console
 * onMessage: callback for a message when the app is open. receives a payload object
 */
exports.configAppMessages = function(config, onMessage){
    var checkForErrors = checkFirebaseConfig(config)
    if (checkForErrors instanceof Error) return checkForErrors
    if (!onMessage || typeof onMessage === 'function') return new Error("onMessage parameter should be provided and to be function")

    messaging.onMessage(onMessage)
}

/**
 * DESCRIPTION: handles notifications on the background, uses the data.status attribute to define the body
 * config: should be a firebase configuration object. You can find it in the developer console
 * title: String, the title of the notification
 * icon: String, the url for the icon of the notification
 */
exports.swHandleNotifications = function(config, title, icon){
    var checkForErrors = checkFirebaseConfig(config)
    if (checkForErrors instanceof Error) return checkForErrors

    var messaging = firebase.messaging()
    messaging.setBackgroundMessageHandler(function (payload) {
        var options = {
            body: payload.data.status,
            icon: icon
        }
        return self.registration.showNotification(title, options)
    })
}