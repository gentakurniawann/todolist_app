const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const PORT = 4002

const pegawai = require( './todolist')
app.use('/todolist', pegawai)
app.listen(PORT, () => {
    console.log("server run on port " + PORT)
})