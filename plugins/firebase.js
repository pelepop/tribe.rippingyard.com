import firebase from 'firebase/app'
require('firebase/firestore')
require('firebase/auth')
require('firebase/storage')

if (!firebase.apps.length) {
  let args
  if (process.env.NODE_ENV === 'development') {
    args = {
      apiKey: 'AIzaSyAHgPMZvD4z6nJqxAyidWO5hO26XvJhhfk',
      authDomain: 'rippingyard-dev.firebaseapp.com',
      databaseURL: 'https://rippingyard-dev.firebaseio.com',
      projectId: 'rippingyard-dev',
      storageBucket: 'gs://rippingyard-dev.appspot.com',
      messagingSenderId: '105888186327',
      appId: '1:105888186327:web:9841ea77e8f39e86'
    }
  } else {
    args = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DB_URL,
      projectId: process.env.PRODUCT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.SENDER_ID,
      appId: process.env.APP_ID
    }
  }
  firebase.initializeApp(args)
}

export default firebase
export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
export const timestamp = firebase.firestore.Timestamp
