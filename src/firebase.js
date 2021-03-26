import firebase from "firebase";
import { ref, onUnmounted } from "vue";

const config = {
    apiKey: "AIzaSyDXnstn0ZwN25JfTgQlyd52_s2fu2jENTE",
    authDomain: "sampleapp-2fa2a.firebaseapp.com",
    databaseURL: "https://sampleapp-2fa2a.firebaseio.com",
    projectId: "sampleapp-2fa2a",
    storageBucket: "sampleapp-2fa2a.appspot.com",
    messagingSenderId: "90001060592",
    appId: "1:90001060592:web:0618b4200ae26a371c4835"
  };

const firebaseApp = firebase.initializeApp(config);

//connect to firebase db
const db = firebaseApp.firestore();
const usersCollection = db.collection("users");

export const createUser = user => {
    return usersCollection.add(user);
}

export const getUser = async id => {
    const user = await usersCollection.doc(id).get();
    return user.exists ? user.data() : null;
}

export const updateUser = (id, user) => {
    return usersCollection.doc(id).update(user);
}

export const deleteUser = id => {
    return usersCollection.doc(id).delete();
}


//return ref to array of users from DB
export const useLoadUsers = () => {
    const users = ref([]);
    //listen onto usersCollection (reacts when changes in collection are made)
    usersCollection.onSnapshot(snapshot => {
        users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}))
    });
    onUnmounted(close);
    return users;
}