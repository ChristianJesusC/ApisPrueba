const express = require("express");
const cors = require("cors");
const WebSocket = require('ws');

const app = express();
app.use(express.json());
app.use(cors());

const wsClient = new WebSocket('ws://localhost:8080');

wsClient.on('open', () => {
  console.log('Conectado al servidor WebSocket');
});

wsClient.on('error', (error) => {
  console.error('Error en WebSocket:', error);
});

app.post("/copia", (req, res) => {
  const { latidos_por_minuto, temperatura,latitud,longitud} = req.body;
  console.log("--------------------------------------------");
  console.log(`Latidos por Minuto: ${latidos_por_minuto}`);
  console.log(`Temperatura: ${temperatura} °C`);

  if (wsClient.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({ latidos_por_minuto, temperatura});
    wsClient.send(message);
  }

  res.status(200).send("Datos recibidos");
});

app.listen(3001, () => {
  console.clear();
  console.log("Server corriendo en el puerto 3001");
});
