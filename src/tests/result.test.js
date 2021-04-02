/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';
import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import schema from '../modules';
import { ResultApi } from '../datasource';
import { token } from './constants';

const server = new ApolloServer({
  ...schema,
  dataSources: () => ({
    resultApi: new ResultApi(),
  }),
  context: { token },
});

const { query } = createTestClient(server);

describe('GET RESULTS API', () => {
  test('get all results', async () => {
    const GETALL_RESULTS = gql`
    query GetAllResult{
      getAllResult{
        data {
          originalId
          createdAt
          result
          userId
          questionSet
        }
        message
        status
      }
    }
  `;
    const { data: { getAllResult } } = await query({ query: GETALL_RESULTS });
    expect(getAllResult.status).toBe('success');
  });
});

describe('GET RESULT API', () => {
  test('get result', async () => {
    const GETONE_RESULT = gql`
    query GetOneResult($id: ID!) {
      getOneResult(id: $id){
        data {
          originalId
          createdAt
          result
          questionSet
          userId
        }
        message
        status
      }
    }
  `;
    const { data: { getOneResult } } = await query({ query: GETONE_RESULT, variables: { id: '6064146b99b83c2dd494e503' } });
    expect(getOneResult.status).toBe('success');
  });
});
