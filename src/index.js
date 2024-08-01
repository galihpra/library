import express from 'express';
import mysql from 'mysql2';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import loanRoutes from './routes/loanRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', userRoutes);

app.use('/books', bookRoutes);

app.use('/loans', loanRoutes);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_library'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

global.db = db;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
