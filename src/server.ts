// src/server.ts
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import auditsRouter from './routes/audit';
import branchesRouter from './routes/branches';
import itemsRouter from './routes/items';
import storesRouter from './routes/stores';
import variantsRouter from './routes/variants';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));

app.get("/health", (req, res) => {res.status(200).json("Server is running.")});
app.use('/api', itemsRouter);
app.use('/api', variantsRouter);
app.use('/api', storesRouter);
app.use('/api', branchesRouter);
app.use('/api', auditsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
