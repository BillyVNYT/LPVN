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

async function joinRoom() {
    const roomId = document.getElementById("roomInput").value.toUpperCase().trim();
    if(roomId === ""){
        alert("Vui lòng nhập ID phòng");
        return;
    }
    const snapshot = await get(ref(database, 'rooms/' + roomId));
    if(snapshot.exists()){
        window.location.href = `/frontend/page/room/room.html?room=${roomId}`;
    } else {
        alert("Phòng không tồn tại!");
    }
}

window.joinRoom = joinRoom;