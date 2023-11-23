const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const { dbConnection } = require('./database/config')

// Crear Express App

const app = express();

dbConnection();

app.use(bodyParser.json())

app.use( express.static('public'))

// Rutas

app.use('/api/auth', require('./routes/auth'))

// Escuchar en puerto 4000

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto', process.env.PORT)
})