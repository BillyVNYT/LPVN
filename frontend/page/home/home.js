import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

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

onAuthStateChanged(auth, async (user) => {
    if(user){
        const uid = user.uid;
        const snapshot = await get(ref(database, 'user/' + uid));
        if(snapshot.exists()){
            const data = snapshot.val();
            document.getElementById("username").innerHTML = "Xin chào, " + data.username;
        }
    } else {
        window.location.href = "/frontend/login&register/index.html";
    }
});

function genRoomId(length = 8){
    const chars = "0123456789";
    let result = "";
    for(let i = 0; i < length; i++){
        result += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }
    return result
}

async function createRoom() {
    const user = auth.currentUser;

    if(!user){
        alert("Chưa đăng nhập");
        return;
    }
    const roomId = genRoomId();

    await set(ref(database, 'rooms/' + roomId), {
        host: user.uid,
        createdAt: Date.now()
    });
    window.location.href = `/frontend/page/room/room.html?room=${roomId}`;
}

async function joinRoom() {
    window.location.href = `/frontend/page/room/inputid.html`;
}

window.createRoom = createRoom;
window.joinRoom = joinRoom;