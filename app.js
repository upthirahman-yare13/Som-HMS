// app.js
const firebaseConfig = { 
    apiKey: "AIzaSyB5LuhewiHycIpkMWq-3HUW8yRlsSy4fLA",
    databaseURL: "https://carequeue-manager-default-rtdb.firebaseio.com",
    projectId: "carequeue-manager"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();
