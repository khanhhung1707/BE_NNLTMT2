import express from 'express'
import cors from 'cors'
import authorRouter from './routes/authorRoutes.js';
import postRouter from './routes/postRoutes.js';


const app = express();

app.use(cors())
app.use(express.json());

app.use(authorRouter)
app.use(postRouter)

app.listen(8080)