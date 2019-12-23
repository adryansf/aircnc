const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

//Database//
require('./database');
//=======//

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

//Real-time//
io.on('connection', socket=>{
    const {user_id}=socket.handshake.query;

    connectedUsers[user_id]=socket.id;
});

//Middlewares//
app.use((req,res,next)=>{
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')))
app.use(routes);
//===========//

server.listen(3333);