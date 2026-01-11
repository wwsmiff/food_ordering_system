import Item from '@/models/Item';
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

// app.get('/', (req, res) => { res.send('API is running...'); })

app.get('/items', (req, res) => { res.send("GET works."); })

app.post('/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    const saved = await item.save();
    console.log(req.body.name);
    console.log(req.body.brand);
    console.log(req.body.category);
    console.log(req.body.product_code);
    console.log(req.body.branch_id);
    res.status(200).json(saved);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({errors : error.errors});
    }
    res.status(500).json({message : "Internal server error"});
  }
});

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
