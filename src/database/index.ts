import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}`;

try {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
  console.error(error);
}


mongoose.Promise = global.Promise;

export { mongoose }