import { RESTDataSource } from 'apollo-datasource-rest';
import { ApolloError } from 'apollo-server-express';
import config from '../config/configurations';

class ResultApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.serviceUrl}/results`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getAll() {
    try {
      const response = await this.get('');
      return response;
    } catch (err) {
      const { extensions: { response: { body } = {} } = {} } = err;
      return body;
    }
  }

  async getOne(id) {
    try {
      const response = await this.get(`/${id}`);
      return response;
    } catch (err) {
      const { extensions: { response: { body } = {} } = {} } = err;
      return body;
    }
  }
}

export default ResultApi;
