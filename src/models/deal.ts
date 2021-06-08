import { mongoose } from '../database';

const DealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String
  },
  address: {
    type: String,
  },
  value: {
    type: Number,
  },
  created_at: {
    type: Date
  }
});

const Deal = mongoose.model('Deal', DealSchema, 'Deals');

export { Deal }
