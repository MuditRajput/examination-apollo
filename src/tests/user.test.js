/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';
import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import schema from '../modules';
import { UserApi } from '../datasource';

const server = new ApolloServer({
  ...schema,
  dataSources: () => ({
    userApi: new UserApi(),
  }),
});

const { mutate } = createTestClient(server);

describe('LOGIN API', () => {
  test('Login User', async () => {
    const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
      loginUser(payload: { email: $email, password: $password }) {
        message
        status
        data {
          token
        }
      }
    }
  `;
    const { data: { loginUser } } = await mutate({
      mutation: LOGIN_USER,
      variables: {
        email: 'head.trainer@successive.tech',
        password: 'Qwerty@1',
      },
    });
    expect(loginUser.status).toBe('success');
  });
});
