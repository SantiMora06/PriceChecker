const app = require('./app');
const withDB = require('./db');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Crea el servidor HTTP
const server = http.createServer(app);
const io = socketIo(server); // Inicializa Socket.io con el servidor HTTP

// Entregar archivos estáticos si fuera necesario
app.use(express.static('public'));

// Manejar conexiones de socket
io.on('connection', (socket) => {
  console.log('A user connected');

  // Manejar eventos personalizados
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('message', (data) => {
    console.log('Message received:', data);
    // Enviar un mensaje a todos los clientes
    io.emit('message', data);
  });
});

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT;

// ℹ️ Connects to the database
withDB(() => {
  // ℹ️ If connection was successful, start listening for requests
  server.listen(PORT, () => { // Cambia `app.listen` por `server.listen`
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
