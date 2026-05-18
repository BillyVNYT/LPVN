import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAOfC0waM7giFEq2WeDmqUgHNPbFXLkR_8",
    authDomain: "lpvn-7f306.firebaseapp.com",
    databaseURL: "https://lpvn-7f306-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lpvn-7f306",
    storageBucket: "lpvn-7f306.firebasestorage.app",
    messagingSenderId: "517915458556",
    appId: "1:517915458556:web:1764bf12ecabb65e569079",
    measurementId: "G-DNL08ELNNT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);                    
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);    
    const hashArray = Array.from(new Uint8Array(hashBuffer));              
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');

    document.querySelectorAll('.tab')[0].classList.add('active');
    document.querySelectorAll('.tab')[1].classList.remove('active');
}

function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');

    document.querySelectorAll('.tab')[0].classList.remove('active');
    document.querySelectorAll('.tab')[1].classList.add('active');
}

async function register(){

    let name = document.getElementById("nameregister").value;
    let email = document.getElementById("emailregister").value;
    let pass = document.getElementById("passregister").value;

    let userId = await sha256(name + email + pass);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const uid = userCredential.user.uid;
        await set(ref(database, 'user/' + uid), {
            username: name,
            useremail: email,
            password: pass
        });
        showLogin()
    } catch(error) {
        console.log(error);
        alert(error.message);
    }
}

async function login() {
    let email = document.getElementById("emaillogin").value;
    let pass = document.getElementById("passlogin").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const user = userCredential.user;
        window.location.href = "/frontend/page/home/home.html";
    } catch(error) {
        console.log(error);
        alert(error.message);
    }
}

window.showLogin = showLogin;
window.showRegister = showRegister;
window.register = register;
window.login = login;