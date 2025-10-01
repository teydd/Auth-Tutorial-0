const express = require ("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()
const auth = require("./routes/authRoute")

PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/auth",auth)

mongoose.connect(process.env.Test).then(()=>{
    console.log("Db connected")
    app.listen(PORT, ()=>{
        console.log("Server running on port ", PORT)
    })
}).catch(()=>{
    console.log("Error connecting to DB")
})