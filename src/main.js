/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZZszoynUbNDs0DCLubiVe8hEHW0-NTZs",
  authDomain: "nivel-92a82.firebaseapp.com",
  projectId: "nivel-92a82",
  storageBucket: "nivel-92a82.appspot.com",
  messagingSenderId: "1079872560631",
  appId: "1:1079872560631:web:5a18029f2d9e4f24cd22f2",
  measurementId: "G-8Z7TP6TFNL"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

registerPlugins(app)

app.use(VueAxios, axios)

app.mount('#app')
