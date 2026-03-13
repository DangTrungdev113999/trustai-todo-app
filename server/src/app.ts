import express from 'express';
import { authRouter } from './routes/auth.js';
import { todosRouter } from './routes/todos.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/todos', todosRouter);

export { app };
