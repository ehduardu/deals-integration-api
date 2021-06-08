import { Router } from 'express';

import { Deals } from '../controllers/DealsController';


const router = Router();
const deals = new Deals();

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Pipedrive integration OK'
  });
});

router.post('/deals/store', deals.store);
router.get('/deals', deals.index);

export { router }
