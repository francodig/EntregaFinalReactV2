import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    //apiKey: process.env.APIKEY,
    apiKey: 'AIzaSyAl4Zg2fCLeGMbWKRmVEbvqWfJeB5jRBOM',
    authDomain: 'don-boedo.firebaseapp.com',
    projectId: 'don-boedo',
    storageBucket: 'don-boedo.appspot.com',
    messagingSenderId: '735983299986',
    appId: '1:735983299986:web:26ebc71ede9c42fbb5a54b',
}

const app = firebase.initializeApp(firebaseConfig)

export const getFirestore = () => firebase.firestore(app)
