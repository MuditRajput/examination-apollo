/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';
import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import schema from '../modules';
import { TraineeApi } from '../datasource';
import { token } from './constants';

const server = new ApolloServer({
  ...schema,
  dataSources: () => ({
    traineeApi: new TraineeApi(),
  }),
  context: { token },
});

const { query, mutate } = createTestClient(server);

describe('GET TRAINEES API', () => {
  test('get all trainees', async () => {
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
    expect(getAllTrainees.status).toBe('success');
  });
});

describe('GET TRAINEE API', () => {
  test('get trainee profile', async () => {
    const GET_ONE = gql`
    query GetOneTrainee($id: ID!) {
      getOneTrainee(id: $id) {
        status
        message
        data {
          name
          originalId
          email
          createdAt
        }
      }
    }
  `;
    const { data: { getOneTrainee } } = await query({ query: GET_ONE, variables: { id: '601bc410535fb24138b22809' } });
    expect(getOneTrainee.status).toBe('success');
  });
});

describe('POST TRAINEE API', () => {
  test('create new trainee', async () => {
    const CREATE_TRAINEE = gql`
    mutation CreateTrainee($email: String!, $name: String!, $password: String!) {
      createTrainee(user: { email: $email, name: $name, password: $password }) {
        message
        status
      }
    }
  `;
    const { data: { createTrainee } } = await mutate({
      mutation: CREATE_TRAINEE,
      variables: {
        email: 'trainee.2@successive.tech',
        password: 'Qwerty@1',
        name: 'Trainee 2',
      },
    });
    expect(createTrainee.status).toBe('success');
  });
});

describe('PUT TRAINEE API', () => {
  test('update existing trainee', async () => {
    const UPDATE_TRAINEE = gql`
    mutation UpdateTrainee($id: ID!, $name: String!, $email: String!) {
      updateTrainee(id: $id, dataToUpdate: { name: $name, email: $email }) {
        message
        status
      }
    }
  `;
    const { data: { updateTrainee } } = await mutate({
      mutation: UPDATE_TRAINEE,
      variables: {
        id: '6064895eecac7409e8bdc73b',
        name: 'trainee 99',
        email: 'trainee99@successive.tech',
      },
    });
    expect(updateTrainee.status).toBe('success');
  });
});

describe('DELETE TRAINEE API', () => {
  test('delete existing trainee', async () => {
    const DELETE_TRAINEE = gql`
    mutation DeleteTrainee($id: ID!) {
      deleteTrainee(id: $id) {
        message
        status
      }
    }
  `;
    const { data: { deleteTrainee } } = await mutate({
      mutation: DELETE_TRAINEE,
      variables: {
        id: '6064895eecac7409e8bdc738',
      },
    });
    expect(deleteTrainee.status).toBe('400');
  });
});
