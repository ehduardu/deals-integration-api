import axios from 'axios';


export class BlingDriveService {

  async sendOrder(orderXML: string, token: string) {
    const bling = axios.create({
      baseURL: 'https://bling.com.br/Api/v2',
    });

    try {
      await bling.post('/pedido/json/', null, {
        params: {
          apikey: token,
          xml: orderXML
        }
      });

      console.info('Pedido enviado com sucesso');
    } catch (error) {
      console.error(error);
    }
  }
}