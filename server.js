const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const admin = require('firebase-admin');
const serviceAccount = require('./config/chat-app-f6f7a-firebase-adminsdk-me45e-988b9438d8.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', async (socket) => {
    console.log('New client connected');

    const messagesSnapshot = await db.collection('messages').get();
    messagesSnapshot.forEach((doc) => {
        socket.emit('chat message', doc.data());
    });

    socket.on('chat message', async (data) => {
        io.emit('chat message', data);
        await db.collection('messages').add(data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
