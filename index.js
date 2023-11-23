const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const { dbConnection } = require('./database/config')
const cors = require('cors')

// Crear Express App

const app = express();

dbConnection();

app.use(cors())

app.use( express.static('public'))

app.use ( express.json() )

// Rutas

app.use('/api/auth', require('./routes/auth'))
app.use('/api/task', require('./routes/task'))

// Escuchar en puerto 4000

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto', process.env.PORT)
})