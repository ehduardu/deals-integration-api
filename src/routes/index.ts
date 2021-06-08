import { Router } from 'express';

import { Deals } from '../controllers/DealsController';
import { mongoose } from '../database';


const router = Router();
const deals = new Deals();

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Pipedrive integration OK'
  });
});

router.get('/deals/refresh', deals.refresh)

export { router }
