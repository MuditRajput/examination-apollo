/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';
import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import schema from '../modules';
import { ExaminationApi, QuestionApi } from '../datasource';
import { token } from './constants';

const server = new ApolloServer({
  ...schema,
  dataSources: () => ({
    examinationApi: new ExaminationApi(),
    questionApi: new QuestionApi(),
  }),
  context: { token },
});

const { query, mutate } = createTestClient(server);

describe('GET EXAMINATION API', () => {
  test('get all trainees', async () => {
    const GETALL_EXAMINATION = gql`
    query GetAllExamination{
    getAllExamination{
      status
      message
      data{
        subject
        description
        maximumMarks
        originalId
        time
        maxAttempts
      }
      write
    }
  }
  `;
    const { data: { getAllExamination } } = await query({ query: GETALL_EXAMINATION });
    expect(getAllExamination.status).toBe('success');
  });
});

describe('POST EXAMINATION API', () => {
  test('create new examination', async () => {
    const CREATE_EXAMINATION = gql`
    mutation CreateTrainee($subject: String!, $description: String, $maxAttempts: String! $time: String!) {
    createExamination(subject: $subject, description: $description, maxAttempts: $maxAttempts time: $time){
      status
      message
      data{
        subject
        description
        originalId
        time
        maxAttempts
      }
    }
  }
  `;
    const { data: { createExamination } } = await mutate({
      mutation: CREATE_EXAMINATION,
      variables: {
        subject: 'Physics',
        description: 'testing',
        maxAttempts: '4',
        time: '60',
      },
    });
    expect(createExamination.status).toBe('success');
  });
});

describe('PUT EXAMINATION API', () => {
  test('update existing examination', async () => {
    const UPDATE_EXAMINATION = gql`
    mutation UpdateExamination($originalId: ID!, $subject: String!, $description: String, $maxAttempts: String! $time: String!) {
    updateExamination(payload: {originalId: $originalId, dataToUpdate: {subject: $subject, description: $description, maxAttempts: $maxAttempts time: $time } }) {
      data {
        subject
        originalId
      }
      status
      message
    }
  }
  `;
    const { data: { updateExamination } } = await mutate({
      mutation: UPDATE_EXAMINATION,
      variables: {
        originalId: '6066eb259622b71a645134ac',
        subject: 'Chemistry',
        maxAttempts: '8',
        time: '7',
      },
    });
    expect(updateExamination.status).toBe('success');
  });
});

describe('DELETE EXAMINATION API', () => {
  test('should throw bad request', async () => {
    const DELETE_EXAMINATION = gql`
    mutation DeleteExamination($id: ID!) {
    deleteExamination(id: $id){
      status
      message
    }
  }
  `;
    const { data: { deleteExamination } } = await mutate({
      mutation: DELETE_EXAMINATION,
      variables: {
        id: '6064895eecac7409e8bdc738',
      },
    });
    expect(deleteExamination.status).toBe('400');
  });
});
