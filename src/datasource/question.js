import { RESTDataSource } from 'apollo-datasource-rest';
import { ApolloError } from 'apollo-server-express';
import config from '../config/configurations';

class QuestionApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${config.serviceUrl}/question`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async getAll(id) {
    try {
      const response = await this.get(`${id}`);
      if (response.write) {
        return response;
      }
      const { message, data, status} = response;
      const modifiedData = data.map((question) => {
        delete question.correctOption
        return question
      })
      return { message, data: modifiedData, status };
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

  async deleteAllQuestions(id) {
    try {
      const response = await this.delete(`delete/${id}`);
      return response;
    } catch (err) {
      const { extensions: { response: { body } = {} } = {} } = err;
      return body;
    }
  }

  async deleteQuestions(id) {
    try {
      const response = await this.delete(`/${id}`);
      return response;
    } catch (err) {
      const { extensions: { response: { body } = {} } = {} } = err;
      return body;
    }
  }

  async submitQuestions(payload) {
    try {
      const response = await this.post('/submit', payload);
      return response.data;
    } catch (err) {
      const { extensions: { response: { body: { message = 'Something went Wrong', status = '500' } = {} } = {} } = {} } = err;
      throw new ApolloError(message, status);
    }
  }
}

export default QuestionApi;
