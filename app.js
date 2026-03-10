// 1. Firebase Configuration (Geli xogtaada dhabta ah halkan)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 2. Variables-ka Taariikhda
const maanta = new Date().toISOString().split('T')[0];

// 3. Function-ka soo saaraya Dashboard Stats (Live)
function loadDashboardStats() {
    // Bukaanada Maanta
    db.ref('stats/daily/' + maanta + '/count').on('value', (snap) => {
        document.getElementById('today-patients').innerText = snap.val() || 0;
    });

    // Lacagta Maanta
    db.ref('stats/daily/' + maanta + '/revenue').on('value', (snap) => {
        document.getElementById('today-revenue').innerText = (snap.val() || 0).toFixed(2);
    });

    // Bukaanada hadda sugaya (Queue)
    db.ref('queue').on('value', (snap) => {
        let count = 0;
        snap.forEach(child => {
            child.forEach(patient => {
                if(patient.val().status === "sugaya") count++;
            });
        });
        document.getElementById('waiting-count').innerText = count;
    });
}

// 4. Function-ka soo bandhigaya Liiska ugu dambeeyay (Recent Table)
function loadRecentPatients() {
    const tableBody = document.querySelector('#recent-table tbody');
    db.ref('transactions').limitToLast(10).on('value', (snap) => {
        tableBody.innerHTML = "";
        snap.forEach(child => {
            const data = child.val();
            let row = `<tr>
                <td>${data.name}</td>
                <td>${data.doctor}</td>
                <td>$${data.amount}</td>
                <td><span class="status-badge">${data.date}</span></td>
            </tr>`;
            tableBody.innerHTML = row + tableBody.innerHTML;
        });
    });
}

// 5. System Start
window.onload = () => {
    loadDashboardStats();
    loadRecentPatients();
    document.getElementById('date-now').innerText = "Taariikhda: " + new Date().toDateString();
};
