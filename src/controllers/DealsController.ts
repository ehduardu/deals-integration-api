import { Request, Response } from 'express';
import axios from 'axios';

import { validateUrl } from '../utils';
import { PipedriveService } from '../services/PipedriveService';


export class Deals {
  async refresh(req: Request, res: Response) {
    const { token_pipedrive, domain_pipedrive, token_bling } = req.query;

    console.log(token_pipedrive, domain_pipedrive)

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
}
