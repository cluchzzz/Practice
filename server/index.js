import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose"
import router from './router/index.js'
import errorMiddleware from "./middlewares/error-middleware.js";
import bodyParser from "body-parser";
import {fileURLToPath} from "url";
import path from "path";

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: [process.env.CLIENT_URL],
}))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()