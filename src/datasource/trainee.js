import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configurations';

class TraineeApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.serviceUrl}/trainee`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getAll(payload) {
    try {
      const response = await this.get('', payload);
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

  async deleteTrainee(id) {
    try {
      const response = await this.delete(`/${id}`);
      return response;
    } catch (err) {
      const { extensions: { response: { body } = {} } = {} } = err;
      return body;
    }
  }

  async getOneTrainee(id) {
    try {
      const response = await this.get(`/${id}`);
      return response;
    } catch (err) {
      const { extensions: { response: { body } = {} } = {} } = err;
      return body;
    }
  }
}

export default TraineeApi;
