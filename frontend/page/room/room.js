import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";
import { getDatabase, ref, get, set, onValue, onDisconnect, remove } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";
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

const params = new URLSearchParams(window.location.search);
const roomId = params.get("room");
const roomRef = ref(database, 'rooms/' + roomId);

document.getElementById("roomId").innerText = "ROOM: " + roomId;
onAuthStateChanged(auth, async (user) => {
    if(!user){
        alert("Chưa đăng nhập");
        return;
    }
    const uid = user.uid;
    const userSnapshot = await get(ref(database, 'user/' + uid));
    const userData = userSnapshot.val();

    const roomSnapshot = await get(roomRef);
    const roomData = roomSnapshot.val();
    if(roomData.host !== uid){
        await set(
            ref(database, 'rooms/' + roomId + '/players/' + uid),
            {
                username: userData.username
            }
        );
    }
    onValue(ref(database, 'rooms/' + roomId + '/players'), (snapshot) => {
            const playersContainer = document.getElementById("playersContainer");
            playersContainer.innerHTML = "";
            const data = snapshot.val();
            for(let uid in data){
                const player = data[uid];
                const div = document.createElement("div");
                div.className = "player-card";
                div.innerText = player.username;
                playersContainer.appendChild(div);
            }
        }
    );

    const playerRef =
        ref(database, 'rooms/' + roomId + '/players/' + uid);
    onDisconnect(playerRef).remove();
    if(roomData.host === uid){
        onDisconnect(roomRef).remove();
    }
});