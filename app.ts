import express, { Application } from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';

import userRoutes from './routes/userRoute';
import complaintCategoryRoute from './routes/complaintCategoryRoute';
import authRoute from './routes/authRoute';
import complaintRoute from './routes/complaintRoute';
import { errorHandler } from './middlewares/errorMiddleware';

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.use('/admin', complaintRoute);
app.use('/users', userRoutes);
app.use('/complaintCategory', complaintCategoryRoute);
app.use('/auth', authRoute);

mongoose.connect('mongodb://localhost:27017/mydatabase');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});