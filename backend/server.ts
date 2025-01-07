import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import campaignRoute from './routes/campaignRoute'
import authenticationRoute from './routes/authenticationRoute'
import activityRoute from './routes/activityRoute'
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI as string, { dbName: process.env.DB_NAME })
  .then(() => console.log("db has been connected"))
  .catch((error) => console.log("error connecting: " + error));

// Middleware
app.use(cors());
app.use(express.json());

app.use("/auth", authenticationRoute)
app.use("/campaigns", campaignRoute)
app.use("/activity-log", activityRoute)

app.get("/", (req: Request, res: Response) => {
  res.json({ message: 'reached backend' });
});

app.listen(process.env.PORT, () => {
  console.log("server started at: " + process.env.PORT);
});
