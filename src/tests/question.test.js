/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';
import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import schema from '../modules';
import { QuestionApi } from '../datasource';
import { token } from './constants';

const server = new ApolloServer({
  ...schema,
  dataSources: () => ({
    questionApi: new QuestionApi(),
  }),
  context: { token },
});

const { query, mutate } = createTestClient(server);

describe('GET QUESTION API', () => {
  test('get all questions', async () => {
    const GETALL_QUESTIONS = gql`
    query GetAllQuestions($id: ID!, $timeLimit: Int, $submitted: String) {
    getAllQuestions(id:$id, timeLimit: $timeLimit, submitted: $submitted){
      data{
        question
        options
        correctOption
        marks
        optionType
        originalId
      }
      timeLeft
      numberOfAttempts
      status
      message
    }
  }
  `;
    const { data: { getAllQuestions } } = await query({
      query: GETALL_QUESTIONS,
      variables: {
        id: '605adbb8983e192358194334',
        submitted: 'true',
      },
    });
    expect(getAllQuestions.status).toBe('success');
  });
});

describe('POST QUESTION API', () => {
  test('add new question', async () => {
    const ADD_QUESTIONS = gql`
    mutation CreateQuestions($originalId: String!, $questionList: [questionInput]!) {
      createQuestions(payload:{originalId: $originalId, questionList: $questionList}){
        data {
          originalId
          question
          options
          marks
        }
        status
        message
      }
    }
  `;
    const { data: { createQuestions } } = await mutate({
      mutation: ADD_QUESTIONS,
      variables: {
        originalId: '6066eb259622b71a645134ac',
        questionList: [
          {
            options: [
              '9',
              '3',
              '4',
            ],
            correctOption: [
              '4',
            ],
            question: 'question 88',
            marks: '1',
          },
        ],
      },
    });
    expect(createQuestions.status).toBe('success');
  });
  test('required data not given throw error', async () => {
    const ADD_QUESTIONS = gql`
    mutation CreateQuestions($originalId: String!, $questionList: [questionInput]!) {
      createQuestions(payload:{originalId: $originalId, questionList: $questionList}){
        data {
          originalId
          question
          options
          marks
        }
        status
        message
      }
    }
  `;
    const data = await mutate({
      mutation: ADD_QUESTIONS,
      variables: {
        originalId: '6066eb259622b71a645134a',
        questionList: [
          {
            options: [
              '9',
              '3',
              '4',
            ],
            correctOption: [
              '4',
            ],
            marks: '1',
          },
        ],
      },
    });
    expect(data.errors.length).toBe(1);
  });
});

describe('PUT QUESTION API', () => {
  test('update existing question', async () => {
    const UPDATE_QUESTIONS = gql`
    mutation UpdateQuestions($originalId: ID!, $questionInput: questionInput!) {
    updateQuestions(originalId: $originalId, dataToUpdate: $questionInput){
      status
      data{
        question
        originalId
      }
      message
    }
  }
  `;
    const { data: { updateQuestions } } = await mutate({
      mutation: UPDATE_QUESTIONS,
      variables: {
        originalId: '605afbb63a6c6121482b6975',
        questionInput: {
          marks: '2',
          question: 'question 89',
        },
      },
    });
    expect(updateQuestions.status).toBe('success');
  });
  test('should throw bad request error', async () => {
    const UPDATE_QUESTIONS = gql`
    mutation UpdateQuestions($originalId: ID!, $questionInput: questionInput!) {
    updateQuestions(originalId: $originalId, dataToUpdate: $questionInput){
      status
      data{
        question
        originalId
      }
      message
    }
  }
  `;
    const { data: { updateQuestions } } = await mutate({
      mutation: UPDATE_QUESTIONS,
      variables: {
        originalId: '605afbb63a6c6121482b69',
        questionInput: {
          marks: '2',
          question: 'question 89',
        },
      },
    });
    expect(updateQuestions.status).toBe('400');
  });
});

describe('DELETE QUESTION API', () => {
  test('should throw bad request', async () => {
    const DELETE_QUESTIONS = gql`
    mutation DeleteQuestions($originalId: ID!) {
    deleteQuestions(id: $originalId) {
      status
      message
    }
  }
  `;
    const { data: { deleteQuestions } } = await mutate({
      mutation: DELETE_QUESTIONS,
      variables: {
        originalId: '6064895eecac7409e8bdc738',
      },
    });
    expect(deleteQuestions.status).toBe('400');
  });
});
