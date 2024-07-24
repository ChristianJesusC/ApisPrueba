const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");

  ws.on("message", (message) => {
    console.log("--------------------------------------------");
    console.log(`Mensaje recibido: ${message}`);
    
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});

server.listen(8080, () => {
  console.clear();
  console.log("Servidor WebSocket corriendo en el puerto 8080");
});
