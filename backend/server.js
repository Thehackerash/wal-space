import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ConnDB } from './config/db.js';
//import router from './routes/index.routes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000'],
}));

//app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

// app.use('/api', router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}! 🚀`);
    ConnDB();
});