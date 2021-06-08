import { AxiosInstance } from 'axios';
import { parse } from 'js2xmlparser';

import { BlingDriveService } from '../services/BlingService';
import { Deal } from '../models/deal';


export class PipedriveService {
  async runDeals(pipedrive: AxiosInstance, tokenPipedrive: string, tokenBling: string) {
    const products = await pipedrive.get('/products', {
      params: { api_token: tokenPipedrive }
    });

    const blingService = new BlingDriveService();

    let start = 0;
    let moreItems = false;

    do {
      const result = await pipedrive.get('/deals', {
        params: { api_token: tokenPipedrive, status: 'won', start }
      });

      result.data.data.forEach(async (deal: any) => {
        const product = products.data.data[Math.floor(Math.random() * products.data.data.length)];
        const clientObj = {
          nome: deal.org_id?.name,
          endereco: deal.org_id?.address,
        };
        const item = {
          codigo: product.code,
          descricao: product.name,
          qtde: 1,
          vlr_unit: deal.value,
        };

        const orderObj = {
          cliente: clientObj,
          itens: [{ item, }],
          numero: deal.id
        }

        const orderXML = parse('pedido', orderObj)
        console.log(orderXML);

        try {
          await blingService.sendOrder(orderXML, tokenBling);

          await Deal.create({
            name: clientObj.nome,
            date: new Date(),
            address: clientObj.endereco || '',
            value: deal.value,
          });
        } catch (error) {
          console.error(error);
        }

      });

      const pagination = result.data?.additional_data?.pagination;

      moreItems = pagination.more_items_in_collection;
      start = pagination.next_start;

    } while (moreItems);

  }
}