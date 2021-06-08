import { Request, Response } from 'express';
import axios from 'axios';

import { validateUrl, isValidDate } from '../utils';
import { PipedriveService } from '../services/PipedriveService';
import { Deal } from '../models/deal';

export class Deals {
  async store(req: Request, res: Response) {
    const { token_pipedrive, domain_pipedrive, token_bling } = req.body;

    if (!token_pipedrive) {
      return res.status(400).json({
        message: 'Informe o token de API do Pipedrive'
      })
    }

    if (!domain_pipedrive) {
      return res.status(400).json({
        message: 'Informe o domínio do pipedrive'
      })
    }

    if (!token_bling) {
      return res.status(400).json({
        message: 'Informe o token de API do Bling'
      })
    }

    const baseUrl = validateUrl(domain_pipedrive.toString());

    const pipedrive = axios.create({
      baseURL: `${baseUrl}/api/v1`,
    });

    const pipedriveService = new PipedriveService();

    await pipedriveService.runDeals(pipedrive, token_pipedrive.toString(), token_bling.toString())

    return res.status(200).json({
      message: 'Pedidos enviados para o Bling'
    });

  }


  async index(req: Request, res: Response) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        message: 'Informe a data para consulta no formato (AAAA-MM-DD)'
      });
    }

    if (!isValidDate(date.toString())) {
      return res.status(400).json({
        message: 'Informe a data para consulta no formato (AAAA-MM-DD)'
      });
    }

    const deals = await Deal.find({ date });

    if (deals.length > 0) {
      const totalValue = deals.reduce((a: any, b: any) => ({ value: a.value + b.value }));
      return res.status(200).json({
        message: 'Registros encontrados',
        date,
        total: totalValue,
        deals,
      });
    } else {
      return res.status(404).json({
        message: 'Não foram encontrados registros pra essa data',
        date,
        deals,
      });
    }


  }
}
