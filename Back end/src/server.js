const express = require('express')
const dotenv = require('dotenv')
const body_parser = require('body-parser')
const connectDB = require('./database/connection')
const cors = require('cors')
const routes = require('./routes/index')
dotenv.config({path: 'src/.env'})

const app = express()
const PORT = process.env.PORT || 8080

app.use(body_parser.json())
connectDB()
app.use(cors());
routes(app);

app.listen(PORT, () =>{
    console.log(`Server is running in http://localhost:${PORT}`)
})