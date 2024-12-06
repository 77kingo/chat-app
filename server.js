const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase-admin/firestore');

// Firebase Admin SDK setup
const serviceAccount = require('./path/to/serviceAccountKey.json');
initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://your-database-name.firebaseio.com'
});
const db = getFirestore();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', async (socket) => {
    console.log('New client connected');

    // Load previous messages
    const messagesSnapshot = await getDocs(collection(db, 'messages'));
    messagesSnapshot.forEach((doc) => {
        socket.emit('chat message', doc.data());
    });

    socket.on('chat message', async (data) => {
        io.emit('chat message', data);
        await addDoc(collection(db, 'messages'), data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
