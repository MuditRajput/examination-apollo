/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';
import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import schema from '../modules';
import { TraineeApi } from '../datasource';

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTdWNjZXNzaXZlIFRlY2hub2xvZ2llcyIsImF1ZCI6Ind3dy5zdWNjZXNzaXZlLmluIiwic3ViIjoiTGVhcm4gYW5kIEltcGxlbWVudCIsImVtYWlsIjoiaGVhZC50cmFpbmVyQHN1Y2Nlc3NpdmUudGVjaCIsImlhdCI6MTYxNzE2NTEyMCwiZXhwIjoxNjQ4NzIyNzIwfQ.YE_cQ7ZgHB_pgD0CZ9prfWfTDrAN6Upk0b45Ns2UMds';

const server = new ApolloServer({
  ...schema,
  dataSources: () => ({
    traineeApi: new TraineeApi(),
  }),
  context: ({ req }) => {
    if (req) {
      return {
        token,
      };
    }
    return {};
  },
});

const { query } = createTestClient(server);

describe('query', () => {
  test('should thow authorization error', async () => {
    const GETALL_TRAINEES = gql`
    query GetAllTrainees($skip: Int, $limit: Int, $sortBy: String, $sortOrder: String ) {
      getAllTrainees(options: { skip: $skip, limit: $limit, sortBy: $sortBy, sortOrder: $sortOrder }) {
        message
        status
        data {
          totalCount
          UsersList {
            originalId
            name
            email
            role
            createdAt
          }
        }
      }
    }
  `;
    const { data: { getAllTrainees } } = await query({ query: GETALL_TRAINEES });
    expect(getAllTrainees.status).toBe('403');
  });
});
