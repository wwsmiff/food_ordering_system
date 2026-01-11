import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MonogDB connection error: ", err));

app.get('/', (req, res) => { res.send('API is running...'); })

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
