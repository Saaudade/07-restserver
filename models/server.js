const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

    //Conectar a base de datos
    this.connectDB();

    // Middlewares
    this.middleware();

    //Rutas de mi aplicación
    this.routes();
  }

  async connectDB () {
    await dbConnection();
  }

  middleware() {
    //CORS 
    this.app.use(cors());

    //Lectura y Parseo del body
    this.app.use(express.json());

    //Directorio público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto: ', this.port);
    });
  }

}

module.exports = Server;