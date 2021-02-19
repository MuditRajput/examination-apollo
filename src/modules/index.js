import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import { userQuery, userMutation } from './user';
import { traineeMutation, traineeQuery, traineeSubscription } from './trainee';
import { examinationQuery, examinationMutation } from './examination';

const dirname = path.resolve();

const typesArray = fileLoader(path.join(dirname, './**/*.graphql'));

const typeDefs = mergeTypes(typesArray, { all: true });

export default {
  resolvers: {
    Query: {
      ...traineeQuery,
      ...userQuery,
      ...examinationQuery
    },
    Mutation: {
      ...userMutation,
      ...traineeMutation,
      ...examinationMutation
    },
    Subscription: traineeSubscription,
  },
  typeDefs,
};
