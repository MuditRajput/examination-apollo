import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configurations';

class UserApi extends RESTDataSource {
  constructor() {
    super();
    this.baseUrl = `${config.serviceUrl}/user`;
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token);
  }

  async loginUser(payload) {
    const { email, password } = payload;
    try {
      const response = await this.post(`${this.baseUrl}/login`, { email, password });
      return response;
    } catch (err) {
      const { extensions: { response: { body } = {} } = {} } = err;
      return body;
    }
  }

  async getMe() {
    const response = await this.get(`${this.baseUrl}/me`);
    return response;
  }
}

export default UserApi;
