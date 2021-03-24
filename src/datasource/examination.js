import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configurations';

class ExaminationApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.serviceUrl}/exam`;
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

  async create(payload) {
    try {
      const response = await this.post('', payload);
      return response;
    } catch (err) {
      const { extensions: { response: { body } = {} } = {} } = err;
      return body;
    }
  }

  async update(payload) {
    try {
      const response = await this.put('', payload);
      return response;
    } catch (err) {
      const { extensions: { response: { body } = {} } = {} } = err;
      return body;
    }
  }

  async deleteExam(id) {
    try {
      const response = await this.delete(`/${id}`);
      return response;
    } catch (err) {
      const { extensions: { response: { body } = {} } = {} } = err;
      return body;
    }
  }
}

export default ExaminationApi;
