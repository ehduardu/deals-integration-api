import { mongoose } from '../database';

const DealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  address: {
    type: String,
  },
  value: {
    type: Number,
  }
});

const Deal = mongoose.model('Deal', DealSchema, 'Deals');

export { Deal }
