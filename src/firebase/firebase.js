import 'firebase/database';
import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DB_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.FB_APP_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const expensesSubscription = database.ref('expenses').on('value', (snapshot) => {
  const expenses = [];
  snapshot.forEach((childSnapshot) => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val()
    })
  })

  console.log('expenses', expenses);
}, (e) => {
  console.error("error: ", e);
});

const removeExpensesSubscription = database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

const changeExpensesSubscription = database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

const addExpensesSubscription = database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});