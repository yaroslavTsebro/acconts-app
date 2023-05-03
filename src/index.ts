import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();
const PORT = 5000
const MONGO_URL = "mongodb+srv://typescript:typescript@clusterts.ibyp3ns.mongodb.net/?retryWrites=true&w=majority"

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`);
})

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());