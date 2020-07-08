import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

import firebase from 'firebase'
import 'firebase/firestore'



import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGE_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
} from 'react-native-dotenv'

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};

const Firebase = firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

// db.settings({
//     timestampsInSnapshots: true
// })

export default Firebase