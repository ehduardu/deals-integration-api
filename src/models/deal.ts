import { mongoose } from '../database';

const DealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
  }
});

const Deal = mongoose.model('Deal', DealSchema, 'Deals');

// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log("Database connected!"))
//   .catch(err => console.log(err));

export { Deal }
